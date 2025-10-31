import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { verifyOTP } from "../../reduxToolkit/Slices/Authentication";
import Logo from "../../assets/images/images/Logo.png";
import { toast, ToastContainer } from "react-toastify";

const OtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = () => setSnackbar(false);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); 
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5 && value) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async (e) => {
  e.preventDefault();

  const otpValue = otp.join("").trim();
  const storedEmail = sessionStorage.getItem("email");

  if (!otpValue) return toast.warn("Please enter the OTP");
  if (!/^\d{4}$/.test(otpValue)) return toast.warn("Enter a valid 4-digit OTP");
  if (!storedEmail) return toast.error("Email not found. Please try again.");

  try {
    const response = await dispatch(
      verifyOTP({ email: storedEmail, otp: otpValue })
    ).unwrap();

    const message = response?.message?.toLowerCase() || "";

    if (response?.success) {
      toast.success("OTP verified successfully!");
      setTimeout(() => navigate("/resetPassword"), 1500);
    } else if (message.includes("invalid")) {
      toast.error("Invalid OTP. Please try again.");
    } else if (message.includes("expired")) {
      toast.error("OTP expired. Please request a new one.");
    } else if (message.includes("not verified")) {
      toast.warn("OTP not verified. Please recheck your code.");
    } else {
      toast.error(response?.message || "Verification failed. Try again.");
    }
  } catch (error) {
    console.error("OTP Verification Error:", error);
    const status = error?.response?.status;

    if (status === 404) toast.error("User not found.");
    else if (status === 410) toast.error("OTP expired. Please resend.");
    else if (status === 500) toast.error("Server error. Try again later.");
    else toast.error(error?.message || "OTP verification failed.");
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
          <h3>
            <span>OTP Verification</span>
          </h3>
          <h4>
            Please enter the 6-digit verification code sent to your registered email.
          </h4>

          <form onSubmit={handleVerifyOtp}>
            <div className="otp-container" style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "20px 0" }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="form-control otp-input"
                  style={{
                    width: "45px",
                    height: "45px",
                    textAlign: "center",
                    fontSize: "20px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              ))}
            </div>

            <button type="submit" className="Login">
              Verify OTP
            </button>

            <NavLink to="/login" className="Login Back aa">
              Back to Login
            </NavLink>
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

export default OtpVerification;
