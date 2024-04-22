import React from 'react';
import MenuInfo from './MenuInfo';
import MenuContext from "@/contexts/MenuContext";
import CartContext from "@/contexts/CartContext";
import {useContext, useEffect, useState} from "react";
import 'keen-slider/keen-slider.min.css'
import KeenSlider from 'keen-slider'
import { useKeenSlider } from "keen-slider/react"


const Carousel = () => {
  const {menuItems} = useContext(MenuContext);
  const {addItemToCart} = useContext(CartContext);
  const [sliderRef] = useKeenSlider()

  return (
    <div ref={sliderRef}>
      {menuItems.slice(0, 3).map((item) => (
        <div key={item.id} >
          <MenuInfo
            id={item.id}
            name={item.name}
            price={item.price}
            category={item.category}
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;

