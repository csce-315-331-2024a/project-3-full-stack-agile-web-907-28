import {Card, CardHeader} from "@nextui-org/react";


/**
 * Summary of inventory items that aren't being used and may require liquidation.
 * @param props Props passed to Card.
 * @returns {JSX.Element}
 * @constructor
 */
export default function ExcessReport({...props}) {
  return (
    <Card {...props}>
      <CardHeader>
        <p className="text-xl font-semibold">Excess Inventory</p>
      </CardHeader>

    </Card>
  )
}
