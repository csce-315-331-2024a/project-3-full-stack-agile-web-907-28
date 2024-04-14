import {Card, CardHeader} from "@nextui-org/react";


/**
 * Summary of common menu item couplings.
 * @param props Props passed to Card.
 * @returns {JSX.Element}
 * @constructor
 */
export default function WhatSellsTogether({...props}) {
  return (
    <Card {...props}>
      <CardHeader>
        <p className="text-xl font-semibold">What Sells Together</p>
      </CardHeader>

    </Card>
  )
}
