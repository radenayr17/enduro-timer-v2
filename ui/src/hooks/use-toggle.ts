import { useState } from "react";

const useToggle = (toggleDefaultValue: boolean = false) => {
  const [toggle, setToggle] = useState(toggleDefaultValue);

  const onToggle = (value: boolean | undefined) => {
    setToggle(value ?? !toggle);
  };

  return { toggle, onToggle };
};

export default useToggle;
