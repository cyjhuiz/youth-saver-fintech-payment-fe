import React from "react";
import { InputGroup, FormControl, Form } from "react-bootstrap";
import "./OTPInputBox.css";

const OTPInputBox = ({ name }) => {
  return (
    <Form.Control
      name={name}
      aria-label="OTP Inputbox"
      className="otp-input-box text-center fs-4"
      maxlength="1"
      bsPrefix="otp-input-box"
    />
  );
};

export default OTPInputBox;
