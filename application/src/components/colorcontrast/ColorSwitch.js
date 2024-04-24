import React from "react";
import { Switch } from "@nextui-org/react";

const ColorContrastSwitch = ({ isContrastEnabled, toggleContrast }) => {
  return (
    <div className={isContrastEnabled ? "bg-black text-teal-300" : ""}>
      <Switch checked={isContrastEnabled} onChange={toggleContrast} />
    </div>
  )
}

export default ColorContrastSwitch;








