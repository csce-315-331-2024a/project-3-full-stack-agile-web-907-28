import {
    Card,
    CardBody,
    CardFooter,
    Image
} from "@nextui-org/react";

/**
 * This component is a menu item that displays the name, price, and image of the item.
 * @param {Object} id - The id of the item.
 * @param {Object} name - The name of the item.
 * @param {Object} price - The price of the item.
 * @param {string} imageSrc - The file to use as a thumbnail.
 * @param {Object} category - The category of the item.
 * @param {Object} args - The rest of the arguments.
 * @returns {JSX.Element} - The menu item component.
 */
export default function MenuItem({ id, name, price, imageSrc, category, ...args }) {

    return (
      <Card key={id} {...args}>
          <Image
            alt={name}
            className="object-cover"
            isZoomed
            src={imageSrc}
          />
          <CardFooter className="justify-between">
              <b>{name}</b>
              <p>${price}</p>
          </CardFooter>
      </Card>
    )
}