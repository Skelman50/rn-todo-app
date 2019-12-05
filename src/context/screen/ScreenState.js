import React, { useReducer } from "react";
import { ScreenContext } from "./screenContext";
import { screenreducer } from "./screenReducer";
import { CHANGE_SCREEN } from "../types";

const ScreenState = ({ children }) => {
  const [state, dispatch] = useReducer(screenreducer, null);
  const changeScreen = id => dispatch({ type: CHANGE_SCREEN, id });
  return (
    <ScreenContext.Provider value={{ changeScreen, todoId: state }}>
      {children}
    </ScreenContext.Provider>
  );
};

export default ScreenState;
