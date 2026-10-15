#!/usr/bin/env bash
# Publishes the HelioUSACH group site on the helio VM (https://helio.fisica.usach.cl/).
#
# The site is built by GitHub Actions, never on the server (no Node there):
# pushing a tag vYYYY.MM.DD makes CI attach site-<tag>.tar.gz (the built dist/)
# to a GitHub release. This script downloads that file, checks it, backs up
# the live folder and swaps the new files in. Same idea as the Clima Espacial
# portal's deploy.sh (tag on GitHub -> one command on the server).
#
# Usage (on helio):
#   sudo publish-helio-site v2026.10.15            # publish a tagged release
#   sudo publish-helio-site --from /tmp/helio-dist  # publish a dist/ copied by hand
#   sudo publish-helio-site --restore               # list backups
#   sudo publish-helio-site --restore <backup.tar.gz>
#
# Only the static root is touched. nginx, the /clima-espacial/ portal and
# certbot's /.well-known/ are left alone.
set -euo pipefail

REPO="HelioUSACH/heliousach.github.io"
WEBROOT="${WEBROOT:-/var/www/helio}"
BACKUPS="${BACKUPS:-/var/backups/helio-site}"
KEEP=15
PUBLIC_URL="${PUBLIC_URL:-https://helio.fisica.usach.cl}"

die() { echo "ERROR: $*" >&2; exit 1; }
case "${1:-}" in "" | -h | --help) sed -n '2,17p' "$0"; exit 0 ;; esac
[[ $EUID -eq 0 ]] || die "run with sudo"
[[ -d $WEBROOT ]] || die "$WEBROOT does not exist"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

backup() {
    install -d -m 750 "$BACKUPS"
    local f="$BACKUPS/helio-$(date +%Y%m%d-%H%M%S).tar.gz"
    tar -czf "$f" -C "$WEBROOT" .
    echo "==> Backup of the current site: $f"
    # keep the newest $KEEP backups
    ls -1t "$BACKUPS"/helio-*.tar.gz 2>/dev/null | tail -n +$((KEEP + 1)) | xargs -r rm -f
}

install_tree() {  # $1 = folder holding the new site; $2 = "nocheck" for backups
    local src="$1"
    [[ ${2:-} == nocheck || ( -f $src/index.html && -f $src/en/index.html ) ]] \
        || die "$src does not look like the built site (index.html, en/index.html missing)"
    local owner; owner="$(stat -c %U:%G "$WEBROOT")"
    backup
    echo "==> Installing into $WEBROOT (owner $owner)"
    rsync -rlt --delete --chown="$owner" --chmod=D755,F644 \
        --exclude='/.well-known/' \
        "$src/" "$WEBROOT/"
}

check() {
    echo "==> Checking $PUBLIC_URL/"
    curl -fsS -o /dev/null "$PUBLIC_URL/" && curl -fsS -o /dev/null "$PUBLIC_URL/en/" \
        || die "site does not answer: restore with  sudo publish-helio-site --restore"
    curl -fsS "$PUBLIC_URL/build-info.txt" 2>/dev/null || true
    echo "Done."
}

case "${1:-}" in
    --from)
        SRC="${2:?--from needs a folder (a copy of dist/)}"
        [[ -d $SRC ]] || die "$SRC is not a folder"
        install_tree "$SRC"
        check ;;
    --restore)
        if [[ -z ${2:-} ]]; then
            echo "Backups (newest first):"; ls -1t "$BACKUPS"/helio-*.tar.gz 2>/dev/null || echo "  (none)"
            echo "Restore one with:  sudo publish-helio-site --restore <file>"; exit 0
        fi
        [[ -f $2 ]] || die "$2 not found"
        mkdir "$WORK/site"; tar -xzf "$2" -C "$WORK/site"
        install_tree "$WORK/site" nocheck
        check ;;
    v*)
        TAG="$1"
        BASE="${RELEASES:-https://github.com/$REPO/releases/download}/$TAG"
        echo "==> Downloading $TAG"
        curl -fsSL -o "$WORK/site-$TAG.tar.gz" "$BASE/site-$TAG.tar.gz" \
            || die "no build for $TAG on GitHub (did the 'Deploy' workflow finish for that tag?)"
        curl -fsSL -o "$WORK/site-$TAG.tar.gz.sha256" "$BASE/site-$TAG.tar.gz.sha256"
        (cd "$WORK" && sha256sum -c --quiet "site-$TAG.tar.gz.sha256") || die "checksum mismatch"
        mkdir "$WORK/site"; tar -xzf "$WORK/site-$TAG.tar.gz" -C "$WORK/site"
        install_tree "$WORK/site"
        check ;;
    *)
        die "unknown argument '$1' (use a tag like v2026.10.15, --from <dir> or --restore)" ;;
esac
