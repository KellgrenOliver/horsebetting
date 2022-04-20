import React, { useState, useEffect, useMemo } from "react";
import reactCSS from "reactcss";
import { TwitterPicker } from "react-color";

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
    console.log("color", color);
    setState({
      ...copyState,
      color: color.rgb,
      displayColorPicker: !copyState.displayColorPicker,
    });
  };

  const styles = reactCSS({
    default: {
      color: {
        width: "23vw",
        height: "20px",
        borderRadius: "2px",
        background: `rgb(${state.color.r}, ${state.color.g}, ${state.color.b})`,
      },
      swatch: {
        display: "flex",
        marginTop: "0.2rem",
        marginBottom: "1rem",
        justifyContent: "center",
        alignItems: "center",
        width: "25vw",
        height: "40px",
        background: "#fff",
        borderRadius: "4px",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
        marginBottom: "1rem",
      },
      cover: {
        marginBottom: "1rem",
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });
  return (
    <>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {state.displayColorPicker ? (
        <TwitterPicker color={state.color} onChange={(e) => handleChange(e)} />
      ) : null}
    </>
  );
};

export default ColorPicker;
