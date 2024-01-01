import { useState } from "react";

const useClickedState = (initialValues) => {
  const [clickedState, setClickedState] = useState(initialValues);

  const handleToggle = (tagName, category) => {
    switch (category) {
      case "view":
        setClickedState({
          ...initialValues,
          [tagName]: true,
        });
        break;
      default:
        setClickedState((prev) => ({ ...prev, [tagName]: !prev[tagName] }));
        break;
    }
  };

  return [clickedState, handleToggle];
};

export default useClickedState;
