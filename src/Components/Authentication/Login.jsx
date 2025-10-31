import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "../../assets/images/images/Logo.png";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../reduxToolkit/Slices/Authentication";
import { toast, ToastContainer } from "react-toastify";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSnackbarClose = () => {
    setSnackbar(!snackbar);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbar(true);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address");
    return;
  }
  
    if (!email || !password) {
      toast.error("Both fields are required");
      return;
    }

    
    try {
      const res = await dispatch(loginAdmin({ email, password }));

      if (res?.payload?.code === 200) {
        sessionStorage.setItem("AdminData", JSON.stringify(res.payload));
       navigate("/loginSuccess", { replace: true });
        toast.success("Login successfully!");
      } else {
        toast.error("Authentication failed. Please check your credentials.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="LoginArea">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="LoginBox">
        <div className="LoginLeft">
          <figure>
            <img src={Logo} alt="Logo" />
          </figure>
          {/* <h2>Huk N <span>Buk</span></h2> */}
          <h3>
            <span>Login Your Account</span>
          </h3>
          <h4>
            Enter your email address and password <br />
            to access admin panel.
          </h4>
          <form>
            <div className="form-group">
              <label>Enter Email *</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Enter Email ID"
                className="form-control"
              />
              <span className="Icon">
                <i className="fa fa-envelope" />
              </span>
            </div>
            <div className="form-group">
              <label>Enter Password *</label>
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="form-control"
                // style={{
                //   width: "100%",
                //   padding: "10px 12px",
                //   fontSize: "15px",
                //   borderRadius: "8px",
                //   border: "1px solid #ccc",
                // }}
              />
              <span className="Icon">
                <i className="fa fa-unlock-alt" />
              </span>
              <span
                onClick={togglePassword}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "27px",
                  cursor: "pointer",
                }}
              >
                {passwordVisible ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            <div className="Checkboxs text-right">
              {/* <label class="CheckBox"
          >Remember Me
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label> */}
              <NavLink to="/login-forgot" className="underline-link">
                Forgot password?
              </NavLink>
            </div>
            <NavLink onClick={handleNext} className="Login">
              Login <i className="fa fa-sign-in" />
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

export default Login;
