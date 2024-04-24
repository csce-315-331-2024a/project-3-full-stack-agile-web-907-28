import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TTSButton from '@/components/text_to_speech/textToSpeechComponent';

describe('TTSButton', () => {
  it('renders with "Enable Text to Speech" when ttsEnabled is false', () => {
    const { getByText } = render(<TTSButton ttsEnabled={false} />);
    expect(getByText('Enable Text to Speech')).toBeInTheDocument();
  });

  it('renders with "Disable Text to Speech" when ttsEnabled is true', () => {
    const { getByText } = render(<TTSButton ttsEnabled={true} />);
    expect(getByText('Disable Text to Speech')).toBeInTheDocument();
  });

  it('does not speak when mouseover event occurs on an image with empty alt attribute', () => {
    const { getByAltText } = render(
      <div>
        <TTSButton ttsEnabled={true} />
        <img src="image.jpg" alt="" />
      </div>
    );
    fireEvent.mouseOver(getByAltText(''));
  });
});
