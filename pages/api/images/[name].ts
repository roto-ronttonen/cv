import { NextApiRequest, NextApiResponse } from 'next';
import { join, extname, normalize } from 'path';
import { basePath, mime } from '.';
import fs from 'fs';
import { HttpError } from '../../../lib/http-error';
import { authorize } from '../../../lib/api/authorize';

const createPath = (req: NextApiRequest) =>
  join(
    basePath,
    // Disallow path traversal
    normalize(req.query.name as string).replace(/^(\.\.(\/|\\|$))+/g, '')
  );

const deleteImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const path = createPath(req);

  await fs.promises.unlink(path);
  res.json({ message: 'Ok' });
  return res.end();
};

const getImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const path = createPath(req);

  const type = mime[extname(path).slice(1)] || 'text/plain';
  const stat = await fs.promises.stat(path);

  res.writeHead(200, {
    'Content-Length': stat.size,
    'Content-Type': type,
  });

  const readStream = fs.createReadStream(path);
  readStream.pipe(res);
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      return getImage(req, res);
    }
    if (req.method === 'DELETE') {
      await authorize(req);
      return deleteImage(req, res);
    }
    throw new HttpError('Method not allowed', 405);
  } catch (e) {
    res.status(e.status).json({ message: e.message });
    return res.end();
  }
}
