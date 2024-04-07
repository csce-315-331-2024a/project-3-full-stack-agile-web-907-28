import React, { useState, useEffect } from 'react';
import { Table, Pagination, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';


export default function MultiPageList({ numItems, itemsPerPage, setStartIndex }) {
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
