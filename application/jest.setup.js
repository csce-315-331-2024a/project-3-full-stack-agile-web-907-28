const fetch = require('node-fetch');
// jest.setup.js
import '@testing-library/jest-dom';

global.fetch = fetch;
