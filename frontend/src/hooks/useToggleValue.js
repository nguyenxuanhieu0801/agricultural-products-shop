import { useState } from "react";

export default function useToggleValue(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const handleToggleValue = (values) => {
    setValue(!value);
  };

  return {
    value,
    handleToggleValue,
  };
}
