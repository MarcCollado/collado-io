const fs = require('fs');
const path = require('path');

// Open Graph size: 1.91:1, shown large by X, LinkedIn, Slack and others
const WIDTH = 1200;
const HEIGHT = 630;

/**
 * Title size in px: long titles step down so they stay within three lines.
 * @param {string} title
 * @returns {number}
 */
const titleFontSize = (title) => {
  if (title.length <= 40) return 72;
  if (title.length <= 70) return 60;
  return 50;
};

const h = (type, style, children) => ({ type, props: { style, children } });

/**
 * The card layout as satori elements: title on top, name and site at the
 * bottom, the brand green down the left edge.
 */
const cardTree = ({ title, author, host, avatar }) =>
  h(
    'div',
    { display: 'flex', width: WIDTH, height: HEIGHT, background: '#ffffff' },
    [
      h('div', { width: 24, height: '100%', background: '#19e597' }),
      h(
        'div',
        {
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
        },
        [
          h(
            'div',
            {
              display: 'flex',
              color: '#1a202c',
              fontSize: titleFontSize(title),
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
            },
            title,
          ),
          h('div', { display: 'flex', alignItems: 'center', gap: 24 }, [
            {
              type: 'img',
              props: {
                src: avatar,
                width: 88,
                height: 88,
                style: { borderRadius: 44 },
              },
            },
            h('div', { display: 'flex', flexDirection: 'column' }, [
              h(
                'div',
                { color: '#1a202c', fontSize: 32, fontWeight: 600 },
                author,
              ),
              h(
                'div',
                { color: '#737373', fontSize: 28, fontWeight: 400 },
                host,
              ),
            ]),
          ]),
        ],
      ),
    ],
  );

/**
 * Inter (OFL) from @fontsource: text becomes vector paths in the SVG, so the
 * card renders the same on any machine, whatever fonts it has installed.
 */
const loadFonts = () => {
  const dir = path.join(
    path.dirname(require.resolve('@fontsource/inter/package.json')),
    'files',
  );
  return [400, 600, 700].flatMap((weight) =>
    ['latin', 'latin-ext'].map((subset) => ({
      name: 'Inter',
      weight,
      style: 'normal',
      data: fs.readFileSync(
        path.join(dir, `inter-${subset}-${weight}-normal.woff`),
      ),
    })),
  );
};

/** The avatar as a data URI, at 2x the size it's drawn. */
const avatarDataUri = async (file) => {
  const sharp = require('sharp');
  const png = await sharp(file).resize(176, 176).png().toBuffer();
  return `data:image/png;base64,${png.toString('base64')}`;
};

/**
 * Renders a post's social card to PNG.
 * @returns {Promise<Buffer>}
 */
const renderSocialCard = async ({ title, author, host, avatar, fonts }) => {
  // satori is ESM-only; sharp is loaded here so tests don't need it
  const { default: satori } = await import('satori');
  const sharp = require('sharp');
  const svg = await satori(cardTree({ title, author, host, avatar }), {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  });
  return sharp(Buffer.from(svg)).png({ palette: true }).toBuffer();
};

module.exports = {
  HEIGHT,
  WIDTH,
  avatarDataUri,
  cardTree,
  loadFonts,
  renderSocialCard,
  titleFontSize,
};
