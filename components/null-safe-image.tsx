import Image, { ImageProps } from 'next/image';
import { imageLoader } from '../lib/image-loader';

type NullSafeImageProps = ImageProps;

export const NullSafeImage = ({ src, ...props }: NullSafeImageProps) => {
  return <>{src && <Image src={src} {...props} loader={imageLoader} />}</>;
};
