import {Card, CardHeader} from "@nextui-org/react";


/**
 * Summary of inventory items that are running low & require restock.
 * @param props Props passed to Card.
 * @returns {JSX.Element}
 * @constructor
 */
export default function RestockReport({...props}) {
  return (
    <Card {...props}>
      <CardHeader>
        <p className="text-xl font-semibold">Restock Report</p>
      </CardHeader>

    </Card>
  )
}
