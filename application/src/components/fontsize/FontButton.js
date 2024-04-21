import { useState } from 'react';

const FontSizeButton = () => {
  const [fontSize, setFontSize] = useState('text-base');

  const increaseFontSize = () => {
    setFontSize('text-lg');
  };

  const decreaseFontSize = () => {
    setFontSize('text-sm');
  };

  return (
    <div>
      <button
        onClick={increaseFontSize}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      >
        Increase Font Size
      </button>
      <button
        onClick={decreaseFontSize}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Decrease Font Size
      </button>

    </div>
  );
};
export default FontSizeButton;