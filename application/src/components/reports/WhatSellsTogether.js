import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import {useContext, useEffect, useState} from "react";
import {useApiFetch} from "@/react-hooks/useApiFetch";
import {DateRangeContext} from "@/contexts/DateRangeContext";
import ListPagination from "@/components/utils/ListPagination";


/**
 * Summary of common menu item couplings.
 * @param props Props passed to Card.
 * @returns {JSX.Element}
 * @constructor
 */
export default function WhatSellsTogether({...props}) {
  const [dateRange, setDateRange] = useContext(DateRangeContext);
  const [fetchUrl, setFetchUrl] = useState("");
  const [whatSellsTogether, refreshWhatSellsTogether] = useApiFetch(fetchUrl, []);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const sd = dateRange.start.toDate().toISOString().slice(0, 10);
    const ed = dateRange.end.toDate().toISOString().slice(0, 10);
    setFetchUrl(`/api/reports/getSalesPairs?startDate=${sd}&endDate=${ed}`);
  }, [dateRange]);

  useEffect(() => {
    setStartIndex(0);
  }, [whatSellsTogether]);

  return (
    <Card {...props}>
      <CardHeader>
        <p className="text-xl font-semibold">What Sells Together</p>
      </CardHeader>
      <CardBody>
        <Table>
          <TableHeader>
            <TableColumn>Item 1</TableColumn>
            <TableColumn>Item 2</TableColumn>
            <TableColumn>Frequency</TableColumn>
          </TableHeader>
          <TableBody>
            {
              whatSellsTogether.slice(startIndex, startIndex + 5).map((item) => (
                <TableRow>
                  <TableCell>{item.item1_name}</TableCell>
                  <TableCell>{item.item2_name}</TableCell>
                  <TableCell>{item.frequency}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <ListPagination numItems={whatSellsTogether.length} itemsPerPage={5} setStartIndex={setStartIndex} />
      </CardBody>
    </Card>
  )
}
