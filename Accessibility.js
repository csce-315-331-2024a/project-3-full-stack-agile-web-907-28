import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function App() {
  const [language, setLanguage] = useState("English");
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isBiggerText, setIsBiggerText] = useState(false);

  // Function to toggle high contrast mode
  const toggleHighContrast = () => {
    setIsHighContrast((prev) => !prev);
  };

  // Function to toggle bigger text
  const toggleBiggerText = () => {
    setIsBiggerText((prev) => !prev);
  };

  // Function to handle language change
  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  return (
    <Dropdown
      showArrow
      radius="sm"
      classNames={{
        base: "before:bg-default-200",
        content: "p-0 border-small border-divider bg-background",
      }}
    >
      <DropdownTrigger>
        <Button variant="ghost" disableRipple>
          Accessibility
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Accessibility Menu"
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="Accessibility Options">
          <DropdownItem
            key="translate"
            onClick={() => handleLanguageChange("Spanish")}
          >
            Translate to {language === "English" ? "Spanish" : "English"}
          </DropdownItem>
          <DropdownItem key="contrast" onClick={toggleHighContrast}>
            {isHighContrast ? "Disable" : "Enable"} High Contrast
          </DropdownItem>
          <DropdownItem key="textSize" onClick={toggleBiggerText}>
            {isBiggerText ? "Decrease" : "Increase"} Text Size
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
