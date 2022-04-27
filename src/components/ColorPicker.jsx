import React, { useState, useEffect, useMemo } from "react";
import { TwitterPicker } from "react-color";
import styled from "@emotion/styled";

const Color = styled.div(({ state }) => {
  return {
    width: "80vw",
    height: "15px",
    borderRadius: "2px",
    background: `rgb(${state.color.r}, ${state.color.g}, ${state.color.b})`,
    "@media screen and (min-width: 600px)": {
      width: "38vw",
    },
    "@media screen and (min-width: 1024px)": {
      width: "23vw",
    },
  };
});

const Swatch = styled.div({
  display: "flex",
  marginTop: "0.2rem",
  marginBottom: "1rem",
  justifyContent: "center",
  alignItems: "center",
  width: "85vw",
  height: "30px",
  background: "#fff",
  borderRadius: "4px",
  cursor: "pointer",
  "@media screen and (min-width: 600px)": {
    width: "40vw",
  },
  "@media screen and (min-width: 1024px)": {
    width: "25vw",
  },
});

const getColors = (value) => {
  return value.match(/\d+/g);
};
const ColorPicker = ({ getValue, savedColor }) => {
  const [r, g, b] = getColors(savedColor);

  const [state, setState] = useState({
    displayColorPicker: false,
    color: {
      r,
      g,
      b,
    },
  });

  const rgb = useMemo(() => getColors(savedColor), [savedColor]);

  useEffect(() => {
    getValue(`rgb(${state.color.r}, ${state.color.g}, ${state.color.b})`);
  }, [state, getValue]);

  useEffect(() => {
    const [r, g, b] = rgb;
    setState((prev) => ({
      ...prev,
      color: {
        r,
        g,
        b,
      },
    }));
  }, [rgb]);

  const handleClick = () => {
    const copyState = { ...state };
    setState({
      ...copyState,
      displayColorPicker: !copyState.displayColorPicker,
    });
  };

  const handleChange = (color) => {
    const copyState = { ...state };
    setState({
      ...copyState,
      color: color.rgb,
      displayColorPicker: !copyState.displayColorPicker,
    });
  };

  return (
    <>
      <Swatch onClick={handleClick}>
        <Color state={state} />
      </Swatch>
      {state.displayColorPicker ? (
        <TwitterPicker color={state.color} onChange={(e) => handleChange(e)} />
      ) : null}
    </>
  );
};

export default ColorPicker;
