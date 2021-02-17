const fs = require('fs');
const { join } = require('path');

const locales = ['fi', 'en'];
const jsonFiles = ['content.json'];

const { rootPath } = require('./consts');

const exists = async (path) => {
  try {
    await fs.promises.access(path);
  } catch (e) {
    return false;
  }
};

const contentDir = join(rootPath, '_content');
const mediaDir = join(rootPath, '_media');
const main = async () => {
  // Create required folders and files
  if (!(await exists(contentDir))) {
    await fs.promises.mkdir(contentDir, { recursive: true });
  }
  if (!(await exists(mediaDir))) {
    await fs.promises.mkdir(mediaDir, { recursive: true });
  }
  for (const locale of locales) {
    const localeDir = join(contentDir, locale);
    if (!(await exists(localeDir))) {
      await fs.promises.mkdir(localeDir, { recursive: true });
    }
    for (const jsonFile of jsonFiles) {
      const f = join(localeDir, jsonFile);
      // Create file if not exist
      if (!(await exists(f))) {
        await fs.promises.writeFile(f, '{}', {
          encoding: 'utf8',
          recursive: true,
        });
      }
      // If file is invalid (cant be parsed)
      // Create file
      const content = await fs.promises.readFile(f, 'utf8');
      try {
        JSON.parse(content);
      } catch (e) {
        await fs.promises.writeFile(f, '{}', {
          encoding: 'utf8',
          recursive: true,
        });
      }
    }
  }
};

main();
