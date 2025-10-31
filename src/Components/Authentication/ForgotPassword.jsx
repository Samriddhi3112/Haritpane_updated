import React, { useState } from "react";
import Logo from "../../assets/images/images/Logo.png";
import {
  NavLink,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../reduxToolkit/Slices/Authentication";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState(false);
  sessionStorage.setItem("email", email);

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbar(true);
  };

  const FORGOT_PASSWORD_ROUTE = "dashboard";

  const handleForgotPassword = async () => {
    const trimmedEmail = email.trim();
    // console.log(trimmedEmail);

    if (!trimmedEmail) {
      showSnackbar("Email is required", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      showSnackbar("Please enter a valid email address", "error");
      return;
    }

    try {
      const res = await dispatch(forgotPassword(email));
      if (res?.payload?.code === 200) {
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("forgotEmail", JSON.stringify(res.payload));
        console.log(JSON.stringify(res.payload));

        setSnackbarMessage("OTP sent successfully. Check your email.");
        navigate("/otpverify");
      } else {
        showSnackbar("Email is not registered", "error");
      }
    } catch (err) {
      showSnackbar("Something went wrong. Please try again later.");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(!snackbar);
  };

  return (
    <div className="LoginArea">
      <div className="LoginBox">
        <div className="LoginLeft">
          {/* <h2>Huk N <span>Buk</span></h2> */}
          <figure>
            <img src={Logo} />
          </figure>
          <h3>
            <span>Forgot Password ?</span>
          </h3>
          <h4>
            No Problem! Just provide your e-mail address and we’ll <br />
            send you a Verification E-mail.
          </h4>
          <form>
            <div className="form-group">
              <label>Enter Email ID *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter your Company Email"
                className="form-control"
              />
              <span className="Icon">
                <i className="fa fa-envelope" />
              </span>
            </div>
            <NavLink className="Login" onClick={handleForgotPassword}>
              Send Verification E-mail
            </NavLink>
            <NavLink to="/login" className="Login Back aa">
              Back to Login
            </NavLink>
            {/* <button>Log In <i class="fa fa-sign-in"></i></button> */}
          </form>
        </div>
      </div>
      <Snackbar
        open={snackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForgotPassword;
