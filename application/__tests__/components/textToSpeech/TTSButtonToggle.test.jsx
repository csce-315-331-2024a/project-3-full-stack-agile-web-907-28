import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TTSButton from '@/components/text_to_speech/textToSpeechComponent';

// Mock SpeechSynthesisUtterance
window.SpeechSynthesisUtterance = jest.fn(() => ({
  text: '',
  lang: '',
  volume: 1,
  rate: 1,
  pitch: 1,
  onend: null,
  onstart: null,
}));

window.speechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn()
};

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

  it('speaks the alt text when mouseover event occurs on an image with non-empty alt attribute', () => {
    const { getByAltText } = render(
      <div>
        <TTSButton ttsEnabled={true} />
        <img src="image.jpg" alt="This is an image" />
      </div>
    );
    fireEvent.mouseOver(getByAltText('This is an image'));
  });

  it('speaks the text content when mouseover event occurs on supported elements', () => {
    const { getByText } = render(
      <div>
        <TTSButton ttsEnabled={true} />
        <p>Paragraph</p>
      </div>
    );
    fireEvent.mouseOver(getByText('Paragraph'));
  });

  it('speaks the text content of button when mouseover event occurs on a button', () => {
    const { getByText } = render(
      <div>
        <TTSButton ttsEnabled={true} />
        <button>Click me</button>
      </div>
    );
    fireEvent.mouseOver(getByText('Click me'));
  });

  it('speaks the text content of span when mouseover event occurs on a span', () => {
    const { getByText } = render(
      <div>
        <TTSButton ttsEnabled={true} />
        <span>span</span>
      </div>
    );
    fireEvent.mouseOver(getByText('span'));
  });

  it('speaks the text content of h1 when mouseover event occurs on a h1', () => {
    const { getByText } = render(
      <div>
        <TTSButton ttsEnabled={true} />
        <h1>h1</h1>
      </div>
    );
    fireEvent.mouseOver(getByText('h1'));
  });

  it('speaks the text content of h2 when mouseover event occurs on a h2', () => {
    const { getByText } = render(
      <div>
        <TTSButton ttsEnabled={true} />
        <h2>h2</h2>
      </div>
    );
    fireEvent.mouseOver(getByText('h2'));
  });

  it('speaks the text content of h3 when mouseover event occurs on a h3', () => {
    const { getByText } = render(
      <div>
        <TTSButton ttsEnabled={true} />
        <h3>h3</h3>
      </div>
    );
    fireEvent.mouseOver(getByText('h3'));
  });

  it('speaks the text content of h4 when mouseover event occurs on a h4', () => {
    const { getByText } = render(
      <div>
        <TTSButton ttsEnabled={true} />
        <h4>h4</h4>
      </div>
    );
    fireEvent.mouseOver(getByText('h4'));
  });

  it('speaks the text content of h5 when mouseover event occurs on a h5', () => {
    const { getByText } = render(
      <div>
        <TTSButton ttsEnabled={true} />
        <h5>h5</h5>
      </div>
    );
    fireEvent.mouseOver(getByText('h5'));
  });

  it('speaks the text content of h6 when mouseover event occurs on a h6', () => {
    const { getByText } = render(
      <div>
        <TTSButton ttsEnabled={true} />
        <h6>h6</h6>
      </div>
    );
    fireEvent.mouseOver(getByText('h6'));
  });

  it('speaks the text content of div when mouseover event occurs on a div', () => {
    const { getByText } = render(
      <div>
        <TTSButton ttsEnabled={true} />
        <div>div</div>
      </div>
    );
    fireEvent.mouseOver(getByText('div'));
  });

  it('speaks the text content of td when mouseover event occurs on a td', () => {
    const { getByText } = render(
      <div>
        <TTSButton ttsEnabled={true} />
        <td>td</td>
      </div>
    );
    fireEvent.mouseOver(getByText('td'));
  });

  it('speaks the text content of th when mouseover event occurs on a th', () => {
    const { getByText } = render(
      <div>
        <TTSButton ttsEnabled={true} />
        <th>th</th>
      </div>
    );
    fireEvent.mouseOver(getByText('th'));
  });

});
