import React, { useContext } from "react";
import { Switch } from "@nextui-org/react";
import ContrastContext from "@/contexts/ContrastContext"; // Make sure the correct path is provided

const ColorContrastSwitch = ({ isContrastEnabled, toggleContrast }) => {
  const { theme } = useContext(ContrastContext);

  return (
    <div className={theme === "contrast" ? "bg-black text-teal-300" : ""}>
      <Switch checked={isContrastEnabled} onChange={toggleContrast} />
    </div>
  );
};

export default ColorContrastSwitch;










