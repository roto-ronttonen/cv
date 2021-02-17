import { join } from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { HttpError } from '../../../../lib/http-error';
import fs from 'fs';
import { authorize } from '../../../../lib/api/authorize';
const updateContent = async (req: NextApiRequest, res: NextApiResponse) => {
  const language = req.query.lang as string;
  const contentType = req.query['content-type'] as string;

  const filePath = join(
    process.cwd(),
    '_content',
    language,
    contentType + '.json'
  );
  await fs.promises.writeFile(filePath, JSON.stringify(req.body), 'utf8');
  res.json(req.body);
  return res.end();
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await authorize(req);
    if (req.method === 'PUT') {
      return updateContent(req, res);
    }
    throw new HttpError('Method not allowed', 405);
  } catch (e) {
    res.status(e.status || 500).json({ message: e.message });
    return res.end();
  }
}
