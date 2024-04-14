import {
  Pagination,
} from '@nextui-org/react';

/**
 * This component is a pagination component for a list. It uses the nextui-org library for the pagination.
 * @param {number} numItems - The number of items in the list.
 * @param {number} itemsPerPage - The number of items per page.
 * @param {function} setStartIndex - The function to set the start index.
 * @returns {JSX.Element} - The pagination component.
 */
export default function ListPagination({ numItems, itemsPerPage, setStartIndex }) {
  const totalPages = Math.ceil(numItems / itemsPerPage);

  return (
    <center>
      <Pagination
        total={totalPages}
        initialPage={1}
        onChange={(page) => setStartIndex((page - 1) * itemsPerPage)}
      />
    </center>
  )
}
