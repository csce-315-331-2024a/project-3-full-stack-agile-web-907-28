import React, { useContext } from "react";
import { Switch } from "@nextui-org/react";
import ContrastContext from "@/contexts/ContrastContext";


export default function ColorContrastSwitch() {
  const { theme, updateTheme } = useContext(ContrastContext);

  // Function to handle theme change
  const handleThemeChange = () => {
    // Toggle between 'red' and 'contrast' themes
    const newTheme = theme === "red" ? "contrast" : "red";
    updateTheme(newTheme);
  };

  return (
    <div>
      <Switch
        defaultSelected={theme === "contrast"} // Set default selection based on theme
        aria-label="Toggle Theme"
        onChange={handleThemeChange}
      />
    </div>
  );
}


















/*const ColorContrastSwitch = ({ isContrastEnabled, toggleContrast }) => {

  return (
    <div>
      <Switch checked={isContrastEnabled} onChange={toggleContrast} />
    </div>
  );
};

export default ColorContrastSwitch;
*/











