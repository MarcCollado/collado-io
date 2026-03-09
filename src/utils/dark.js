import * as React from 'react';

const DarkMode = () => {
  const [theme, setTheme] = React.useState(null);

  React.useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setTheme(stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const toggleTheme = (newTheme) => {
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark', newTheme === 'dark');
    setTheme(newTheme);
  };

  if (process.env.NODE_ENV !== 'development') return null;
  if (theme === null) return null;

  return (
    <label>
      {/* Dark mode toggle */}
      <input
        type="checkbox"
        onChange={(e) => toggleTheme(e.target.checked ? 'dark' : 'light')}
        checked={theme === 'dark'}
      />
    </label>
  );
};

export default DarkMode;
