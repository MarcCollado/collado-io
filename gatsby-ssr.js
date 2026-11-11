import * as React from 'react';

export { wrapPageElement } from './src/components/wrapPage';

// gatsby develop only: applies the dark-mode toggle's stored choice before
// the first paint. It must run right after the color-scheme meta tag
const restoreColorScheme = `
try {
  var scheme = localStorage.getItem('color-scheme');
  if (scheme) document.querySelector('meta[name="color-scheme"]').content = scheme;
} catch (e) {}
`;

export const onRenderBody = ({ setHeadComponents }) => {
  const head = [
    // Tells the browser both schemes are supported before the CSS loads, so a
    // dark-mode visitor doesn't get a white flash
    <meta key="color-scheme" name="color-scheme" content="light dark" />,
  ];
  if (process.env.NODE_ENV === 'development') {
    head.push(
      <script
        key="restore-color-scheme"
        dangerouslySetInnerHTML={{ __html: restoreColorScheme }}
      />,
    );
  }
  setHeadComponents(head);
};
