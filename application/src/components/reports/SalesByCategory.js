import {Card, CardHeader} from "@nextui-org/react";


/**
 * Pie chart showing categories' contributions to total sales.
 * @param props Props passed to Card.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SalesByCategory({...props}) {
  return (
    <Card {...props}>
      <CardHeader>
        <p className="text-xl font-semibold">Sales By Category</p>
      </CardHeader>

    </Card>
  )
}