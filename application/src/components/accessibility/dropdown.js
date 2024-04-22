import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button } from '@nextui-org/react';
import { useState } from 'react';
import GoogleTranslate from "@/components/translation/translationComponent"

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
        <DropdownSection aria-label="Accessibility Options" showDivider>
          <DropdownItem>
            Text Size
            <DropdownMenu>
              <DropdownItem onClick={() => handleTextSizeChange("small")}>
                Small
              </DropdownItem>
              <DropdownItem onClick={() => handleTextSizeChange("normal")}>
                Normal
              </DropdownItem>
              <DropdownItem onClick={() => handleTextSizeChange("large")}>
                Large
              </DropdownItem>
            </DropdownMenu>
          </DropdownItem>
          <DropdownItem>
            Color Contrast
            <DropdownMenu>
              <DropdownItem onClick={() => handleColorContrastChange("normal")}>
                Normal
              </DropdownItem>
              <DropdownItem onClick={() => handleColorContrastChange("high")}>
                High Contrast
              </DropdownItem>
            </DropdownMenu>
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Preferences" showDivider>
      <DropdownItem
        isReadOnly
        key="theme"
        className="cursor-default"
        endContent={
          <GoogleTranslate /> // Replace with your GoogleTranslate component
          //TODO: Get rid of google photo
        }
      >
        Language {/* Instead of Theme */}
      </DropdownItem>
    </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}


