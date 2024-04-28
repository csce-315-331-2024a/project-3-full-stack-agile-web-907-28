import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListPagination from '../../../src/components/utils/ListPagination';

/**
 * @jest-environment jsdom
 */
describe('ListPagination', () => {
  test('calculates total pages correctly and responds to page changes', () => {
    const numItems = 100;
    const itemsPerPage = 10;
    const setStartIndexMock = jest.fn();

    const { getByText } = render(
      <ListPagination
        numItems={numItems}
        itemsPerPage={itemsPerPage}
        setStartIndex={setStartIndexMock}
      />
    );

    // Check if total pages calculated correctly
    const totalPages = Math.ceil(numItems / itemsPerPage);
    expect(getByText(totalPages.toString())).toBeInTheDocument();

   
    fireEvent.click(getByText("2")); // Example: Click on page 2

    // Check if setStartIndex was called correctly when changing to page 2
    const expectedStartIndexForPage2 = (2 - 1) * itemsPerPage;
    expect(setStartIndexMock).toHaveBeenCalledWith(expectedStartIndexForPage2);
  });
});