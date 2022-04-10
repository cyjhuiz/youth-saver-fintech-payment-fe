import OTPScreen from "./screens/OTPScreen";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/processPaymentOTP" element={<OTPScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
