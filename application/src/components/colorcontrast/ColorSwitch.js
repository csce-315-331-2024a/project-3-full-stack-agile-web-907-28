import React, { useContext } from "react";
import { Switch } from "@nextui-org/react";
import ContrastContext from "@/contexts/ContrastContext"; 

const ColorContrastSwitch = ({ isContrastEnabled, toggleContrast }) => {

  return (
    <div>
      <Switch checked={isContrastEnabled} onChange={toggleContrast} />
    </div>
  );
};

export default ColorContrastSwitch;










