import React from "react";
import { Switch } from "@nextui-org/react";
import ContrastContext from "@/contexts/ContrastContext";

const ColorContrastSwitch = ({ isContrastEnabled, toggleContrast }) => {
  return (
    <div className={isContrastEnabled ? "bg-black text-teal-300" : ""}>
      <Switch checked={isContrastEnabled} onChange={toggleContrast} />
    </div>
  )
}

export default ColorContrastSwitch;








