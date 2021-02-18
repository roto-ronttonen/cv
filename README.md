## ENV

- PREVIEW_API_KEY=locallocalsecret
- CONTENT_ABS_PATH=/home/ronttonen/cv-content

## Content abs path

Content abs path is needed to avoid rewriting content that should persist between builds.
If not set will use project folder
Node should have read write access in content directory

## IMPORTANT

If using with a ci / cd (i don't think it should be, except for dev). The page content is kinda buggy.
Meaning that the content will be stale at first (build phase unable to populate correct data). When revalidation kicks in, the content will update as it should
If hosting in containers (ex kubernetes). You should create persistent volumes for CONTENT_ABS_PATH
Also to avoid stale content, you might need to build the image after \_content folder is populated. If using a vps this can all be avoided
