import { NextApiRequest, NextApiResponse } from 'next';
import { safeCompare } from '../../lib/safe-compare';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (safeCompare(req.query.apikey as string, process.env.PREVIEW_API_KEY)) {
    res.setPreviewData({});
  }
  res.redirect('/').end();
}
