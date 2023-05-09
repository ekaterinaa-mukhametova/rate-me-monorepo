import React, { useCallback, useState } from 'react';
import cx from 'classnames';
import SunSVG from '../../svg/SunSVG';
import MoonSVG from '../../svg/MoonSVG';

const availableThemes = {
  light: 'light',
  dark: 'dark',
};

function ThemeSwitcher() {
  const [theme, setTheme] = useState(availableThemes.light);

  const setLightTheme = useCallback(() => {
    setTheme(availableThemes.light);
  });

  const setDarkTheme = useCallback(() => {
    setTheme(availableThemes.dark);
  });
  return (
    <div className="d-flex">
      <button
        className={cx(
          'btn',
          'btn-outline-secondary',
          'bg-white',
          { 'border-4': theme === availableThemes.light },
        )}
        type="button"
        onClick={setLightTheme}
      >
        <SunSVG />
      </button>
      <button
        className={cx(
          'btn',
          'btn-outline-secondary',
          'bg-black',
          { 'border-4': theme === availableThemes.dark },
        )}
        type="button"
        onClick={setDarkTheme}
      >
        <MoonSVG />
      </button>
    </div>
  );
}

export default ThemeSwitcher;
