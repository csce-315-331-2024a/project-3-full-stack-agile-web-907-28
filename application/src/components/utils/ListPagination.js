import {
  Pagination,
} from '@nextui-org/react';


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
