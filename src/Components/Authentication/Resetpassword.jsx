import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "../../assets/images/logo.png";
import { resetPassword } from "../../reduxToolkit/Slices/Authentication";

const Resetpassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.warn("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const storedEmail = sessionStorage.getItem("email");
      if (!storedEmail) {
        toast.error("Email not found. Please restart the process.");
        return;
      }

      const response = await dispatch(
        resetPassword({
          email: storedEmail,
          newPassword,
          reEnterPassword: confirmPassword,
        })
      ).unwrap();

      if (response?.success) {
        toast.success("Password reset successfully!");
        setTimeout(() => navigate("/resetSuccess"), 1500);
      } else {
        throw new Error(response?.message || "Reset failed");
      }
    } catch (error) {
      toast.error(error?.message || "Password reset failed");
    }
  };

  return (
    <div className="LoginArea">
      <div className="LoginBox">
        <div className="LoginLeft">
          <figure>
            <img src={Logo} alt="Logo" />
          </figure>
          <h3>
            <span>Reset Password</span>
          </h3>
          <h4>Please enter your new password below.</h4>

          <form onSubmit={handleResetPassword}>
            {/* New Password Field */}
            <div className="form-group" style={{ position: "relative" }}>
              <label>New Password *</label>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="form-control"
              />
              <span className="Icon">
                <i className="fa fa-lock" />
              </span>
              <span
                onClick={() => setShowNewPassword(!showNewPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "28px",
                  cursor: "pointer",
                }}
              >
                {showNewPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>

            {/* Confirm Password Field */}
            <div className="form-group" style={{ position: "relative" }}>
              <label>Confirm Password *</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="form-control"
              />
              <span className="Icon">
                <i className="fa fa-lock" />
              </span>
              <span
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "28px",
                  cursor: "pointer",
                }}
              >
                {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>

            <button type="submit" className="Login">
              Reset Password
            </button>

            <NavLink to="/login" className="Login Back aa">
              Back to Login
            </NavLink>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Resetpassword;