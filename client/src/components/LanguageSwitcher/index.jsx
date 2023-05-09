import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import cx from 'classnames';

const availableLangs = {
  en: 'en',
  ru: 'ru',
};

function LanguageSwitcher({ className }) {
  const [lang, setLang] = useState(availableLangs.en);

  const setRuLang = useCallback(() => {
    setLang(availableLangs.ru);
  });

  const setEnLang = useCallback(() => {
    setLang(availableLangs.en);
  });

  return (
    <div className={`d-flex ${className}`}>
      <button
        className={cx(
          'btn',
          'btn-outline-secondary',
          { 'text-white': lang === availableLangs.en },
        )}
        type="button"
        onClick={setEnLang}
      >
        En
      </button>
      <button
        className={cx(
          'btn',
          'btn-outline-secondary',
          { 'text-white': lang === availableLangs.ru },
        )}
        type="button"
        onClick={setRuLang}
      >
        Rus
      </button>
    </div>
  );
}

LanguageSwitcher.propTypes = {
  className: propTypes.string,
};

LanguageSwitcher.defaultProps = {
  className: '',
};

export default LanguageSwitcher;
