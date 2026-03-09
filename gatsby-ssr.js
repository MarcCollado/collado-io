import * as React from 'react';

// In development, persist the manual dark mode toggle choice via localStorage.
// In production, dark mode is handled purely by CSS @media (prefers-color-scheme: dark).
const ThemeScript = () => {
  const script = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark');
    }
  } catch (e) {}
})();
`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

export const onRenderBody = ({ setPreBodyComponents }) => {
  if (process.env.NODE_ENV === 'development') {
    setPreBodyComponents([<ThemeScript key="theme-script" />]);
  }
};
