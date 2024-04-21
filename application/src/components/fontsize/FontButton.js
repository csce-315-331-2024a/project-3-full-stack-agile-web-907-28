import { useState } from 'react';

const FontSizeButton = () => {
  const [fontSize, setFontSize] = useState('text-base');
  const [isLarge, setIsLarge] = useState(false);

  const toggleFontSize = () => {
    if (isLarge) {
      setFontSize('text-base');
    } else {
      setFontSize('text-lg');
    }
    setIsLarge(!isLarge);
  };

  return (
    <div>
      <button
        onClick={toggleFontSize}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isLarge ? 'Decrease Font Size' : 'Increase Font Size'}
      </button>
    </div>
  );
};

export default FontSizeButton;
