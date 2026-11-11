import * as React from 'react';

const systemScheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// The stored choice pins a scheme through the color-scheme meta tag (see
// style.css); without one the page follows the OS
const applyScheme = (stored) => {
  document.querySelector('meta[name="color-scheme"]').content =
    stored || 'light dark';
};

// gatsby develop only: production follows the OS, with no toggle
const DarkMode = () => {
  const [scheme, setScheme] = React.useState(null);

  React.useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () =>
      setScheme(localStorage.getItem('color-scheme') || systemScheme());
    sync();
    // The OS can change scheme at any time
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  const toggle = (next) => {
    // Back on the OS's scheme means the override is undone, not pinned
    if (next === systemScheme()) {
      localStorage.removeItem('color-scheme');
      applyScheme(null);
    } else {
      localStorage.setItem('color-scheme', next);
      applyScheme(next);
    }
    setScheme(next);
  };

  if (process.env.NODE_ENV !== 'development') return null;
  if (scheme === null) return null;

  return (
    <label>
      <span className="visually-hidden">Dark mode</span>
      <input
        type="checkbox"
        onChange={(e) => toggle(e.target.checked ? 'dark' : 'light')}
        checked={scheme === 'dark'}
      />
    </label>
  );
};

export default DarkMode;
