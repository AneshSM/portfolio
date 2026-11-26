import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { siteDescription, siteName, siteRole } from '../site-metadata';

// The social card (OG and Twitter) in the look of the GitHub profile README
// banner: warm paper gradient, dark ink text, a sketched git graph and
// hand-lettered labels in Patrick Hand. Colours are the banner's light
// variant. Rendered at build time: no request-time APIs. Fonts (OFL, licences
// beside them in assets/fonts) are ttf, as next/og needs; the three together
// keep the image under next/og's 500 KB bundle limit.

export const socialImageSize = { width: 1200, height: 630 };
export const alt = `${siteName}, ${siteRole}. ${siteDescription}`;

const palette = {
  paperFrom: '#f5f2eb',
  paperTo: '#ebe6dc',
  name: '#141414',
  subtitle: '#2e2e2e',
  body: '#4a4744',
  stroke: '#1c1c1c',
  trunk: '#8f897f',
  branch: '#3d3b38',
  commit: '#f5f2eb',
  label: '#3f3c39',
};

const commits: [number, number][] = [
  [40, 250],
  [130, 250],
  [210, 150],
  [300, 150],
  [210, 350],
  [300, 350],
  [390, 250],
];

// Hand-lettered labels from the banner's first set, beside their branches.
const labels = [
  { text: 'frontend', left: 200, top: 92 },
  { text: 'backend', left: 205, top: 368 },
  { text: 'shipped', left: 355, top: 290 },
  { text: 'idea', left: 20, top: 200 },
];

export async function renderSocialImage() {
  const readFont = (file: string) =>
    readFile(path.join(process.cwd(), 'assets/fonts', file));
  const [bold, semiBold, hand] = await Promise.all([
    readFont('Geist-Bold.ttf'),
    readFont('Geist-SemiBold.ttf'),
    readFont('PatrickHand-Regular.ttf'),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 72px',
        fontFamily: 'Geist',
        backgroundImage: `linear-gradient(135deg, ${palette.paperFrom}, ${palette.paperTo})`,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', width: 640 }}>
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: palette.name,
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          {siteName}
        </div>
        <svg width="420" height="16" viewBox="0 0 420 16">
          <path
            d="M2 10 C 90 4, 200 14, 300 8 S 400 6, 418 9"
            stroke={palette.stroke}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            marginTop: 20,
            fontSize: 34,
            fontWeight: 700,
            color: palette.subtitle,
          }}
        >
          {siteRole}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 28,
            fontWeight: 600,
            color: palette.body,
            lineHeight: 1.4,
          }}
        >
          {siteDescription}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          position: 'relative',
          width: 430,
          height: 400,
        }}
      >
        <svg width="430" height="400" viewBox="0 0 430 400">
          <path
            d="M10 250 L 420 250"
            stroke={palette.trunk}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M130 250 C 160 250, 170 150, 210 150 L 300 150 C 340 150, 350 250, 390 250"
            stroke={palette.stroke}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M130 250 C 160 250, 170 350, 210 350 L 300 350 C 340 350, 350 250, 390 250"
            stroke={palette.branch}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {commits.map(([cx, cy]) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="11"
              fill={palette.commit}
              stroke={palette.stroke}
              strokeWidth="3"
            />
          ))}
          <circle cx="390" cy="250" r="15" fill={palette.name} />
          <circle cx="390" cy="250" r="6" fill={palette.commit} />
        </svg>
        {labels.map(({ text, left, top }) => (
          <div
            key={text}
            style={{
              position: 'absolute',
              left,
              top,
              fontFamily: 'Patrick Hand',
              fontSize: 30,
              color: palette.label,
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>,
    {
      ...socialImageSize,
      fonts: [
        { name: 'Geist', data: bold, style: 'normal', weight: 700 },
        { name: 'Geist', data: semiBold, style: 'normal', weight: 600 },
        { name: 'Patrick Hand', data: hand, style: 'normal', weight: 400 },
      ],
    },
  );
}
