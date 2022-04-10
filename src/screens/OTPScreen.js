import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import OTPCard from "../components/OTPCard";
import "./OTPScreen.css";
import Loader from "../components/Loader";
const OTPScreen = () => {
  const [alert, setAlert] = useState({
    variant: "primary",
    message: "",
    isShown: false,
  });
  const [alertIsVisible, setAlertIsVisible] = useState(false);
  const [loaderIsVisible, setLoaderIsVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const transactionID = searchParams.get("transactionID");
  const merchantUrlRedirectBackAfterSuccess = searchParams.get(
    "merchantUrlRedirectBackAfterSuccess"
  );

  return (
    <div className="main-body-style">
      {loaderIsVisible && <Loader />}
      {alertIsVisible && (
        <Alert
          variant={alert.variant}
          show={alertIsVisible}
          className="text-center"
        >
          {alert.message}
        </Alert>
      )}
      <OTPCard
        setAlert={setAlert}
        setAlertIsVisible={setAlertIsVisible}
        setLoaderIsVisible={setLoaderIsVisible}
        transactionID={transactionID}
        merchantUrlRedirectBackAfterSuccess={
          merchantUrlRedirectBackAfterSuccess
        }
      />
    </div>
  );
};

export default OTPScreen;
