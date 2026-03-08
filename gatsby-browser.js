// import React from 'react';

import './src/styles/normalize.css';
import './src/styles/style.css';
import 'prismjs/themes/prism.css';

// Workaround for Gatsby Head API bug: the client-side renderer wraps Head output
// in <svg>, causing <title> to be created as SVGTitleElement (wrong namespace).
// The browser doesn't recognize SVGTitleElement as the page title, so it shows the URL.
// This observer catches the title element and sets document.title from its text content.
export const onClientEntry = () => {
  const observer = new MutationObserver(() => {
    const titleEl = document.querySelector('head title[data-gatsby-head]');
    if (titleEl && titleEl.textContent && document.title !== titleEl.textContent) {
      observer.disconnect();
      document.title = titleEl.textContent;
      observer.observe(document.head, { childList: true, subtree: true });
    }
  });
  observer.observe(document.head, { childList: true, subtree: true });
};

// TODO: wrap all pages with Layout instead of importing 1by1
// import Layout from './src/components/layout';

// export function wrapPageElement({ element, props }) {
//   return <Layout {...props}>{element}</Layout>;
// }
