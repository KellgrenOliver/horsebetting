import React, { useState, useEffect } from "react";
import reactCSS from "reactcss";
import { TwitterPicker } from "react-color";
import randomColor from "randomcolor";

const ColorPicker = ({ getValue }) => {
  const color123 = randomColor({
    luminosity: "random",
    format: "rgb",
  });

  const [r, g, b] = color123.match(/\d+/g);

  const [state, setState] = useState({
    displayColorPicker: false,
    color: {
      r,
      g,
      b,
    },
  });

  useEffect(() => {
    getValue(`rgb(${state.color.r}, ${state.color.g}, ${state.color.b})`);
  }, [state]);

  const handleClick = () => {
    const copyState = { ...state };
    setState({
      ...copyState,
      displayColorPicker: !copyState.displayColorPicker,
    });
  };

  const handleClose = () => {
    const copyState = { ...state };
    setState({ ...copyState, displayColorPicker: false });
  };

  const handleChange = (color) => {
    const copyState = { ...state };
    setState({ ...copyState, color: color.rgb });
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
        border: "1px solid gray",
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
        <>
          <TwitterPicker color={state.color} onChange={handleChange} />
          <div style={styles.popover}>
            <div style={styles.cover} onClick={handleClose} />
          </div>
        </>
      ) : null}
    </>
  );
};

export default ColorPicker;
