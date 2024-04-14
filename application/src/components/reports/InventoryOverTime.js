import {Card, CardHeader} from "@nextui-org/react";


/**
 * Line chart showing inventory quantities over time.
 * @param props Props passed to Card.
 * @returns {JSX.Element}
 * @constructor
 */
export default function InventoryOverTime({...props}) {
  return (
    <Card {...props}>
      <CardHeader>
        <p className="text-xl font-semibold">Inventory Over Time</p>
      </CardHeader>
      
    </Card>
  )
}