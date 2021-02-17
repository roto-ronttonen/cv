## ENV

- PREVIEW_API_KEY=locallocalsecret
- CONTENT_ABS_PATH=/home/ronttonen/cv-content

## Content abs path

Content abs path is needed to avoid rewriting content that should persist build.
If content is stored in project directory it cant get overwritten by git / docker
Node should have read write access in content directory
