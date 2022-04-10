import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import OTPInputBox from "./OTPInputBox";
import axios from "axios";
import Loader from "./Loader";
const OTPCard = ({
  transactionID,
  merchantUrlRedirectBackAfterSuccess,
  setAlert,
  setAlertIsVisible,
  setLoaderIsVisible,
}) => {
  const [formState, setFormState] = useState({});

  const handleFormInputChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const focusNextInputBox = (event) => {
    const index = parseInt(event.target.name.slice(-1));
    const nextInputBoxIndex = index + 1;
    if (index !== numOTPInputBox - 1 && event.code !== "Backspace") {
      const nextInputBox = document.getElementsByName(
        "OTPInputBox" + nextInputBoxIndex
      )[0];
      nextInputBox.focus();
    }
  };

  const handleResendOTP = (event) => {
    setLoaderIsVisible(true);
    const resendOTP = async () => {
      let response;
      response = await axios
        .post(
          `${process.env.REACT_APP_PAYMENT_API_URL}/api/payment/resendPaymentOTP`,
          {
            transactionID: transactionID,
          }
        )
        .catch((err) => {
          setAlert({
            variant: "danger",
            message: err.response.data.message,
          });
        });

      setLoaderIsVisible(false);
      if (response !== undefined && response.status === 200) {
        setAlert({
          variant: "secondary",
          message: response.data.message,
        });
      }

      setAlertIsVisible(true);
      setTimeout(() => {
        setAlertIsVisible(false);
      }, 3000);
    };

    resendOTP();
  };

  const handleSubmit = (event) => {
    setLoaderIsVisible(true);

    let inputOTP = "";
    for (let key in formState) {
      inputOTP += formState[key];
    }

    const createCardPayment = async () => {
      let response;
      response = await axios
        .post(`${process.env.REACT_APP_PAYMENT_API_URL}/api/payment`, {
          transactionID: transactionID,
          transactionOTP: inputOTP,
        })
        .catch((err) => {
          console.log(err.response.data);
          setAlert({
            variant: "danger",
            message: err.response.data.message,
          });
        });

      setLoaderIsVisible(false);
      if (response !== undefined && response.status === 200) {
        setLoaderIsVisible(false);
        setAlert({
          variant: "primary",
          message: response.data.message,
        });
        setTimeout(() => {
          window.location.replace(merchantUrlRedirectBackAfterSuccess);
        }, 2500);
      }

      setAlertIsVisible(true);
      setTimeout(() => {
        setAlertIsVisible(false);
      }, 5000);
    };

    createCardPayment();
  };

  const numOTPInputBox = 6;
  return (
    <Container className="d-flex justify-content-center mt-5">
      <div className="d-flex flex-column text-center" style={{ width: "50%" }}>
        <div>Enter OTP</div>
        <Form>
          <div>
            <div className="d-flex flex-row justify-content-center">
              {Array(numOTPInputBox)
                .fill("placeHolderForMapping")
                .map((value, index) => {
                  const inputBoxName = "OTPInputBox" + index;
                  return (
                    <Form.Group
                      key={"OTPFormGroup" + index}
                      index={index}
                      className="p-2"
                      onChange={handleFormInputChange}
                      onKeyUp={focusNextInputBox}
                    >
                      <OTPInputBox
                        name={inputBoxName}
                        type="text"
                        givenIndex={index}
                        key={inputBoxName}
                      />
                    </Form.Group>
                  );
                })}
            </div>
          </div>
          <div className="d-flex flex-row justify-content-center">
            <div className="pe-2">
              <Button variant="secondary" onClick={handleResendOTP}>
                Resend OTP
              </Button>
            </div>
            <div>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default OTPCard;
