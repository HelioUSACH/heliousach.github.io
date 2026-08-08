#!/usr/bin/env python3
"""Post-build: inline CSS into all HTML files and remove external _astro/ links.

Fixes GitHub Pages _astro/ 404 issue where CSS files are not served.
Usage: python3 scripts/inline-css.py (run from project root)
"""
import glob
import os
import re
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
CSS_PATH = os.path.join(PROJECT_DIR, 'src', 'styles', 'global.css')
DIST_DIR = os.path.join(PROJECT_DIR, 'dist')

def main():
    if not os.path.isfile(CSS_PATH):
        print(f"ERROR: CSS not found: {CSS_PATH}", file=sys.stderr)
        sys.exit(1)

    if not os.path.isdir(DIST_DIR):
        print(f"ERROR: dist/ not found: {DIST_DIR}", file=sys.stderr)
        sys.exit(1)

    with open(CSS_PATH, 'r', encoding='utf-8') as f:
        css_content = f.read()

    css_size = len(css_content)
    html_files = glob.glob(os.path.join(DIST_DIR, '**', '*.html'), recursive=True)

    count = 0
    for html_path in html_files:
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Remove external CSS links to _astro/
        content = re.sub(r'\s*<link[^>]*href="[^"]*_astro/[^"]*\.css"[^>]*>', '', content)

        # Inject CSS before </head>
        style_block = f'\n<style>\n{css_content}\n</style>\n'
        if '</head>' in content:
            content = content.replace('</head>', style_block + '</head>')
            count += 1

        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(content)

    print(f"Injected CSS ({css_size}b) into {count} HTML files in {DIST_DIR}")

if __name__ == '__main__':
    main()