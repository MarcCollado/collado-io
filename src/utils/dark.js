import * as React from 'react';
import { ThemeToggler } from 'gatsby-plugin-dark-mode';

const DarkMode = () => (
  <ThemeToggler>
    {({ theme, toggleTheme }) =>
      process.env.NODE_ENV === 'development' ? (
        <label>
          {/* Dark mode toggle */}
          <input
            type="checkbox"
            onChange={(e) => toggleTheme(e.target.checked ? 'dark' : 'light')}
            checked={theme === 'dark'}
          />
        </label>
      ) : (
        <></>
      )
    }
  </ThemeToggler>
);
export default DarkMode;
