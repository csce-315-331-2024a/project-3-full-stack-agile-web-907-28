import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  Image, Avatar, Badge
} from "@nextui-org/react";
import NextLink from "next/link";
import { UserManager } from "@/components/onboarding/UserManager";
import WeatherComponent from "@/components/weather/weather";
import App from "@/components/accessibility/dropdown";
import {useContext} from "react";
import CartContext from "@/contexts/CartContext";
import {FaCartShopping} from "react-icons/fa6";
import TTSButton from "../text_to_speech/textToSpeechComponent";
import React, { useState, useEffect } from 'react';





/**
 * This component is the site header that contains the Rev logo and user management.
 * @returns {JSX.Element} - The site header component.
 */
export default function SiteHeader() {
  const {cartItems, openCart} = useContext(CartContext);

  const [ttsEnabled, setTTSEnabled] = useState(false);
  const toggleTTS = () => {
    setTTSEnabled(prevState => !prevState);
  };

 


  return (
    <div>
      <Navbar className="red" maxWidth="xl" position="sticky" isBlurred="false">
        {/* Rev's logo in top left corner */}
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <li>
            <NavbarBrand className="gap-3 max-w-fit">
              <NextLink className="flex justify-start items-center gap-1" href="/">
                <Image
                  fill="none"
                  height={100}
                  width={180}
                  alt="Rev's Logo"
                  src="/logo_transparent.png"
                />
              </NextLink>
            </NavbarBrand>
          </li>
        </NavbarContent>
        <NavbarContent justify="center">
          <li>
            <WeatherComponent />
          </li>
        </NavbarContent>
        <NavbarContent justify="end">
          <li>
          <TTSButton ttsEnabled={ttsEnabled} onToggle={toggleTTS} />
          </li>
          <li>
            <App />
          </li>
          {cartItems.length > 0 ? (
            <li>
                <Avatar
                  as="button"
                  aria-label="Open cart"
                  isBordered
                  showFallback
                  fallback={<FaCartShopping className="text-2xl" />}
                  onClick={openCart}
                />
            </li>
          ) : (
            <li></li>
          )}
          <li>
            <UserManager />
          </li>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
