import { join } from 'path';

import fs from 'fs';
import { isPlainObject, mapValues } from 'lodash';

const rootPath = process.env.CONTENT_ABS_PATH ?? process.cwd();

const readFileAsync = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
//
const getContentDir = () => join(rootPath, '_content');

const getJsonContent = async (path: string) => {
  return JSON.parse(await readFileAsync(path));
};

type GenericObject = { [key: string]: any };
const fillDefaultsRecursive = (
  content: GenericObject,
  defaultContent: GenericObject
) => {
  return {
    ...content,
    ...mapValues(defaultContent, (value, key) => {
      if (isPlainObject(value)) {
        return fillDefaultsRecursive(content?.[key] ?? {}, value);
      }
      return content[key] ?? value;
    }),
  };
};

export const getContent = async <T extends GenericObject>(
  locale: string,
  contentName: string,
  defaultContent?: T
): Promise<T> => {
  const path = join(getContentDir(), locale, contentName + '.json');
  const content = await getJsonContent(path);

  if (!!defaultContent) {
    return fillDefaultsRecursive(content, defaultContent);
  }
  return content;
};
