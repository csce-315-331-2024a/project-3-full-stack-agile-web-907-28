import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ObjectArraySortButton from '../../../src/components/utils/ObjectArraySortButton';
import { SortProperties } from '@/react-hooks/useSortedArray';

/**
 * @jest-environment jsdom
 */
describe('ObjectArraySortButton', () => {
    const mockCompareFn = () => {};
  
    test.each([
      ['asc', 'desc'],
      ['desc', 'asc'],
    ])('toggles sort order from %s to %s on click', (initialOrder, expectedOrder) => {
      const mockSortProps = new SortProperties(mockCompareFn, 'testKey', initialOrder);
      const mockOnSortPropsChange = jest.fn();
  
      render(
        <ObjectArraySortButton
          sortKey={{ key: 'testKey', compareFn: mockCompareFn }}
          sortProps={mockSortProps}
          onSortPropsChange={mockOnSortPropsChange}
          type="plain"
        >
          Test Button
        </ObjectArraySortButton>
      );
  
      fireEvent.click(screen.getByRole('button', { name: 'Test Button' }));
      expect(mockOnSortPropsChange).toHaveBeenCalledWith(expect.objectContaining({ key: 'testKey', order: expectedOrder }));
    });
  
    test('changes sort key when a different key is clicked', () => {
      const initialSortProps = new SortProperties(mockCompareFn, 'initialKey', 'asc');
      const newSortKey = { key: 'newKey', compareFn: mockCompareFn };
      const mockOnSortPropsChange = jest.fn();
  
      render(
        <ObjectArraySortButton
          sortKey={newSortKey}
          sortProps={initialSortProps}
          onSortPropsChange={mockOnSortPropsChange}
          type="plain"
        >
          Test Button
        </ObjectArraySortButton>
      );
  
      fireEvent.click(screen.getByRole('button', { name: 'Test Button' }));
      expect(mockOnSortPropsChange).toHaveBeenCalledWith(newSortKey);
    });
  
    test.each([
      ['az', 'asc', 'FaArrowDownAZ'],
      ['az', 'desc', 'FaArrowUpZA'],
      ['19', 'asc', 'FaArrowDown19'],
      ['19', 'desc', 'FaArrowUp91'],
      ['plain', 'asc', 'FaArrowDown'],
      ['plain', 'desc', 'FaArrowUp'],
      ['none', 'asc', ''],
    ])('renders correct icon for type %s and order %s', (type, order, expectedIconName) => {
      const sortProps = new SortProperties(mockCompareFn, 'testKey', order);
      render(
        <ObjectArraySortButton
          sortKey={{ key: 'testKey', compareFn: mockCompareFn }}
          sortProps={sortProps}
          onSortPropsChange={() => {}}
          type={type}
        >
          Test Button
        </ObjectArraySortButton>
      );
  
      if (expectedIconName) {
        expect(screen.getByTestId(expectedIconName)).toBeInTheDocument();
      } else {
        // For 'none' type, no icon should be rendered
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
      }
    });
  
    // Additional test for the default case where the arrow is transparent
    test('renders transparent arrow for unsupported type', () => {
        render(
            <ObjectArraySortButton
              sortKey={{ key: 'testKey', compareFn: mockCompareFn }}
              sortProps={new SortProperties(mockCompareFn, 'testKey', 'asc')}
              onSortPropsChange={() => {}}
              type="unsupported"
            >
              Test Button
            </ObjectArraySortButton>
          );
  
      // Assuming the implementation uses a transparent icon or no icon for unsupported types
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });