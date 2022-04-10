import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: "1",
      }}
      className="overlay d-flex justify-content-center align-items-center"
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "50px",
          height: "50px",
          margin: "auto",
          zIndex: "1",
          position: "fixed",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          transform: "-webkit-translate(-50%, -50%)",
          transform: "-moz-translate(-50%, -50%)",
          transform: "-ms-translate(-50%, -50%)",
        }}
      ></Spinner>
    </div>
  );
};

export default Loader;
