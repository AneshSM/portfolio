import { alt as socialAlt, renderSocialImage } from './_og/social-image';

export const alt = socialAlt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return renderSocialImage();
}
