import {
    Card,
    CardBody,
    CardFooter,
    Image
} from "@nextui-org/react";
import Burger from "../../../public/burger.jpg";
import Basket from "../../../public/basket.png";
import ChickenSandwich from "../../../public/chicken_sandwich.jpg";
import Fries from "../../../public/fries.jpg";
import Coke from "../../../public/coke.jpg";
import Sprite from "../../../public/sprite.jpg";
import GrilledCheese from "../../../public/grilled_cheese.jpg";
import ChoclateShake from "../../../public/shake.jpg";
import IceCream from "../../../public/ice_cream.jpg";
import Suace from "../../../public/sauce.png";
import OnionRings from "../../../public/onion_rings.jpg";


export default function MenuItem({ id, name, price, category, onPress = () => {} }) {
    let imageSrc;

    // Set the image source based on the category or id
    // TODO: for the love of all that is holy, put this in the DB
    if (category == 0) {
        imageSrc = Burger.src;
    } else if (category == 1) {
        imageSrc = Basket.src;
    } else if (category == 4) {
        imageSrc = ChickenSandwich.src;
    } else if (category == 2) {
        imageSrc = Fries.src;
    } else if (id == 10) {
        imageSrc = Coke.src;
    } else if (id == 11) {
        imageSrc = Sprite.src;
    } else if (id == 9) {
        imageSrc = GrilledCheese.src;
    } else if (id == 14) {
        imageSrc = ChoclateShake.src;
    } else if (id == 15) {
        imageSrc = IceCream.src;
    } else if (category == 3) {
        imageSrc = Suace.src;
    } else if (category == 9) {
        imageSrc = OnionRings.src;
    }

    console.log(id);

    return (
      <Card key={id} isPressable onPress={onPress}>
          <Image
            alt={name}
            className="object-cover"
            isZoomed
            src={imageSrc}
          />
          <CardFooter className="justify-between">
              <b>{name}</b>
              <p>{price}</p>
          </CardFooter>
      </Card>
    )
}
