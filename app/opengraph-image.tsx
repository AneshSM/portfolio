import { renderSocialImage, socialImageSize } from './_og/social-image';

export { alt } from './_og/social-image';
export const size = socialImageSize;
export const contentType = 'image/png';

export default function Image() {
  return renderSocialImage();
}
