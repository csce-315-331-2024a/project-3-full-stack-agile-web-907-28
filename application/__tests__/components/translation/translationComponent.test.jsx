import React from 'react';
import { render, waitFor } from '@testing-library/react';
import GoogleTranslate from '../../../src/components/translation/translationComponent';

// Enhance the mock to ensure it returns a more complete mock of a script element
const originalCreateElement = document.createElement.bind(document);
document.createElement = jest.fn((tagName) => {
  if (tagName === 'script') {
    // Create a real script element to ensure it's of the correct type
    const scriptElement = originalCreateElement('script');
    // Mock any specific properties or methods if necessary
    scriptElement.onload = jest.fn();
    return scriptElement;
  }
  return originalCreateElement(tagName);
});

describe('GoogleTranslate', () => {
  beforeEach(() => {
    // Reset mocks and document state before each test if necessary
    document.createElement.mockClear();
    const existingScript = document.querySelector('#google-translate-script');
    if (existingScript) {
      document.body.removeChild(existingScript);
    }
  });

  it('should attempt to load the Google Translate script', async () => {
    render(<GoogleTranslate />);

    await waitFor(() => {
      // Check if a script tag is created
      expect(document.createElement).toHaveBeenCalledWith('script');
    });

    const script = document.querySelector('#google-translate-script');
    expect(script).toBeTruthy();
    expect(script.src).toContain('//translate.google.com/translate_a/element.js');
  });

  it('should not append the script if it already exists', async () => {
    // Simulate existing script
    const existingScript = originalCreateElement('script');
    existingScript.id = 'google-translate-script';
    document.body.appendChild(existingScript);

    render(<GoogleTranslate />);

    await waitFor(() => {
      // Since the script already exists, createElement should not be called again for a script
      expect(document.createElement).not.toHaveBeenCalledWith('script');
    });
  });
});