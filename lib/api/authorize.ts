import { NextApiRequest } from 'next';
import { HttpError } from '../http-error';

export const authorize = async (req: NextApiRequest) => {
  if (!req.preview) {
    throw new HttpError('Not allowed', 401);
  }
};
