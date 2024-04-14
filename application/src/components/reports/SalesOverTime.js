import {Card, CardBody, CardHeader, Image} from "@nextui-org/react";


/**
 * Line chart showing sales per menu item and/or category over time.
 * @param props Props passed to Card.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SalesOverTime({...props}) {
  return (
    <Card {...props}>
      <CardHeader>
        <p className="text-xl font-semibold">Sales Over Time</p>
      </CardHeader>

    </Card>
  )
}
