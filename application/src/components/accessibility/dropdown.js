import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button } from '@nextui-org/react';
import { useState } from 'react';
import GoogleTranslate from "@/components/translation/translationComponent"

/**
 * This is a dropdown menu for accessibility settings.
 * @returns {Dropdown}
 */
export default function App() {
  const [textSize, setTextSize] = useState("normal");
  const [colorContrast, setColorContrast] = useState("normal");

  return (
    <Dropdown
      arrow="small"
      radius="sm"
      className="p-0 border-small border-divider bg-background"
    >
      <DropdownTrigger>
        <Button ghost>Accessibility</Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        className="p-3"
      >
        <DropdownSection aria-label="Preferences" showDivider>
      <DropdownItem
        isReadOnly
        key="theme"
        className="cursor-default"
        endContent={
          <GoogleTranslate /> 
        }
      >
        Language
      </DropdownItem>
    </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}


