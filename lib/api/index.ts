import { join } from 'path';

import fs from 'fs';
import { isPlainObject, mapValues } from 'lodash';

import { rootPath } from '../../consts';

const getContentDir = () => join(rootPath, '_content');

const getJsonContent = async (path: string) => {
  return JSON.parse(await fs.promises.readFile(path, 'utf8'));
};

export const makeDirsIfNotExist = async (path: string) => {
  try {
    await fs.promises.access(path);
  } catch (e) {
    await fs.promises.mkdir(path, { recursive: true });
  }
};

export const makeJsonFileIfNotExistOrCorrupt = async (path: string) => {
  try {
    await fs.promises.access(path);
  } catch (e) {
    await fs.promises.writeFile(path, '{}', 'utf8');
  }
  try {
    JSON.parse(await fs.promises.readFile(path, 'utf8'));
  } catch (e) {
    await fs.promises.writeFile(path, '{}', 'utf8');
  }
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
  const dirPath = join(getContentDir(), locale);
  const path = join(dirPath, contentName + '.json');
  // Make dirs if not exist
  await makeDirsIfNotExist(dirPath);
  // Make file if not exist
  await makeJsonFileIfNotExistOrCorrupt(path);
  const content = await getJsonContent(path);

  if (!!defaultContent) {
    return fillDefaultsRecursive(content, defaultContent);
  }
  return content;
};
