const fs = require('fs');
const { join } = require('path');

const locales = ['fi', 'en'];
const jsonFiles = ['content.json'];

const exists = async (path) => {
  try {
    await fs.promises.access(path);
  } catch (e) {
    return false;
  }
};

const contentDir = join(process.cwd(), '_content');

const main = async () => {
  // Create required folders and files
  for (const locale of locales) {
    const localeDir = join(contentDir, locale);
    if (!exists(localeDir)) {
      await fs.promises.mkdir(localeDir);
    }
    for (const jsonFile of jsonFiles) {
      const f = join(localeDir, jsonFile);
      // Create file if not exist
      if (!exists(f)) {
        await fs.promises.writeFile(join(localeDir, jsonFile), '{}', 'utf8');
      }
      // If file is invalid (cant be parsed)
      // Create file
      const content = await fs.promises.readFile(f, 'utf8');
      try {
        JSON.parse(content);
      } catch (e) {
        await fs.promises.writeFile(join(localeDir, jsonFile), '{}', 'utf8');
      }
    }
  }
};

main();
