# Guía de contenido — sitio Heliofísica USACH

Esta guía es para quien actualiza el contenido del sitio (noticias, equipo, publicaciones). **No hace falta tocar HTML ni código.** Todo el contenido está en archivos de texto dentro de `src/content/` y `src/data/`.

Hay dos formas de editar:

1. **Con formularios (recomendado): Pages CMS.** Entra a <https://app.pagescms.org>, inicia sesión con GitHub y abre el repositorio `heliousach/heliousach.github.io`. Verás secciones *Noticias* y *Equipo* con formularios y subida de imágenes. Al guardar, el sitio se publica solo en unos minutos.
2. **Directamente en GitHub.** En <https://github.com/heliousach/heliousach.github.io>, navega a la carpeta, usa *Add file → Create new file* (o el lápiz para editar) y confirma con *Commit changes*.

Si algo está mal escrito (falta un campo, una fecha inválida, una imagen que no existe), **el sitio no se publica** y GitHub muestra el error en la pestaña *Actions*. La versión anterior sigue en línea, así que no se rompe nada.

---

## 1. Publicar una noticia

Crea un archivo en `src/content/news/es/` con el nombre `AAAA-MM-DD-palabras-clave.md` (sin tildes, espacios ni mayúsculas). Ejemplo: `2026-10-15-nueva-publicacion-jgr.md`.

```markdown
---
title: Título de la noticia
date: 2026-10-15
summary: Una o dos oraciones que aparecen en la tarjeta de la noticia y como resumen.
image: /images/news/2026-10-15-foto.jpg
imageAlt: Descripción breve de la foto (para personas que no pueden verla)
link: https://enlace-a-la-nota-de-prensa-o-al-articulo
---

Texto de la noticia. Se escribe en Markdown:

- **negrita** con dos asteriscos, *cursiva* con uno
- listas con guion
- enlaces así: [texto del enlace](https://ejemplo.cl)
```

- `image`, `imageAlt` y `link` son **opcionales**. Sin imagen, la tarjeta muestra el logo del grupo.
- Las fotos van en `public/images/news/` (en Pages CMS, súbelas a la carpeta `news`). En `image:` se escribe la ruta **sin** `public` (como en el ejemplo). Formato recomendado: JPG horizontal, 1600 px de ancho, menos de 500 KB.
- Para dejar una noticia como borrador (no visible), agrega `draft: true`.
- **Versión en inglés (opcional):** crea un archivo con **el mismo nombre** en `src/content/news/en/`. Si no existe, el sitio en inglés muestra la noticia en español con la etiqueta "In Spanish".
- Las 3 noticias más recientes aparecen automáticamente en la página de inicio.

## 2. Agregar o actualizar una persona

Cada persona es un archivo en `src/content/team/`, por ejemplo `src/content/team/camila-pena-cifuentes.md`. Para agregar a alguien, copia el archivo de una persona del mismo grupo y cambia los datos:

```markdown
---
name: "Nombre Apellido"
group: estudiantes
order: 40
role: "Ingeniería Física, USACH"
role_en: "Physics Engineering, USACH"
topic: "Tema de tesis o investigación"
topic_en: "Thesis or research topic"
photo: "/images/team/nombre-apellido.jpg"
---
```

- `group` debe ser uno de: `investigadores`, `postdoc`, `estudiantes`, `colaboradores`, `ex-miembros`.
- `order`: número para ordenar dentro del grupo (menor = primero).
- Cuando alguien se titula: cambia `group` a `ex-miembros` y agrega `year: 2026`.
- **Fotos:** en `public/images/team/`, vertical (proporción 3:4), mínimo 600×800 px. Sin foto se muestran las iniciales; si salen mal, agrega `initials: AB`.
- Los campos terminados en `_en` son la versión en inglés. Si faltan, se usa el texto en español.
- Opcionales: `affiliation`, `bio` (solo investigadores), `year`, `links` (`site`, `scholar`, `orcid`, `github`).

## 3. Publicaciones

Archivo `src/data/publications.yaml`. Copia una entrada existente y cámbiala:

```yaml
- id: pub-2026-apellido-revista        # único, sin espacios
  year: 2026
  authors: "Apellido, A., **Pinto, V.A.**, et al."   # **negrita** = integrantes del grupo
  title: "Título del artículo"
  journal: "JGR: Space Physics"
  doi: "https://doi.org/10.xxxx/xxxxx"
```

Artículos aceptados sin DOI todavía: omite `doi` y agrega `inPress: true`. Las 5 más recientes aparecen en inicio.

## 4. Proyectos y líneas de investigación

- `src/data/projects.yaml`: proyectos activos. Los que tienen `featured: 1, 2, 3…` aparecen en la página de inicio con imagen. **Los proyectos en evaluación no se publican nunca.**
- `src/data/research-lines.yaml`: las cuatro líneas de investigación (`summary` = texto corto para inicio, `description` = texto completo).

## 5. Configuración general

`src/data/site.yaml`: correo de contacto, redes sociales, afiliaciones (USACH, Departamento de Física, CIRAS), financiamiento, imagen y texto de portada, y el texto de la convocatoria para estudiantes.

---

## Reglas de contenido

- Todo dato publicado (cargos, fechas, roles en proyectos) debe poder verificarse con un documento. Ante la duda, preguntar a Victor.
- No publicar proyectos en evaluación, números internos de proyectos ni datos personales.
- Fotos: solo con permiso de las personas que aparecen y con crédito cuando no son propias.
- Escribir fechas en formato `AAAA-MM-DD`.

## ¿Quién mantiene qué?

- **Noticias y fotos:** Valeria (medios).
- **Equipo, proyectos, publicaciones:** Victor o quien él designe.
- **Código y diseño:** ver `README.md`.
