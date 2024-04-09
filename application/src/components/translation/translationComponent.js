// components/GoogleTranslate.js

import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    // Check if the script is already present
    if (!document.querySelector('#google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;

      script.onload = () => {
        const googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
        };
        window.googleTranslateElementInit = googleTranslateElementInit;
      };

      document.body.appendChild(script);
    }

    // Cleanup function
    return () => {
      const script = document.querySelector('#google-translate-script');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="google_translate_element"></div>
  );
};

export default React.memo(GoogleTranslate);
