import { NextApiRequest, NextApiResponse } from 'next';
import { join, extname } from 'path';
import fs from 'fs';
import { HttpError } from '../../../lib/http-error';
import { Fields, Files, IncomingForm, File } from 'formidable';
import { isArray, map } from 'lodash';
import { nanoid } from 'nanoid';
import { authorize } from '../../../lib/api/authorize';
import { rootPath } from '../../../consts';
export const basePath = join(rootPath, '_media');

export const mime = {
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
};

export const allowedTypes = map(mime, (value) => value);

const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
  // parse form with a Promise wrapper
  const data: { fields: Fields; files: Files } = await new Promise(
    (resolve, reject) => {
      const form = new IncomingForm();
      form.maxFileSize = 20 * 1024 * 1024;
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    }
  );

  if (isArray(data)) {
    throw new HttpError('Only single file upload is supported', 400);
  }

  const file = data.files.file as File;

  if (!allowedTypes.includes(file.type)) {
    throw new HttpError('Filetype not allowed', 400);
  }

  // read file from the temporary path
  const contents = await fs.promises.readFile(file.path, {
    encoding: 'binary',
  });

  // contents is a string with the content of uploaded file, so you can read it or store
  const fileName = `${nanoid()}${extname(file.name)}`;
  await fs.promises.writeFile(join(basePath, fileName), contents, 'binary');
  res.json({ file: fileName, url: `/api/images/${fileName}` });
  return res.end();
};

const listImages = async (req: NextApiRequest, res: NextApiResponse) => {
  const files = await fs.promises.readdir(basePath);
  res.json({ files: files.map((f) => ({ url: `/api/images/${f}`, file: f })) });
  return res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await authorize(req);
    if (req.method === 'POST') {
      return uploadImage(req, res);
    }
    if (req.method === 'GET') {
      return listImages(req, res);
    }
    throw new HttpError('Method not allowed', 405);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
    return res.end();
  }
}
