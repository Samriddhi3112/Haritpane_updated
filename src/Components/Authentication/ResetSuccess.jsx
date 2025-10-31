import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/images/Logo.png";
import { FaCheckCircle } from "react-icons/fa";

const ResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="LoginArea">
      <div className="LoginBox">
        <div className="LoginLeft text-center">
          <figure>
            <img src={Logo} alt="Logo" style={{ width: "120px" }} />
          </figure>

          <div style={{ marginTop: "30px" }}>
            <FaCheckCircle color="#4CAF50" size={70} />
            <h3 style={{ marginTop: "20px", color: "#333" }}>
              Password Reset Successful!
            </h3>
            <p style={{ marginTop: "10px", color: "#666", fontSize: "15px" }}>
              Your password has been successfully changed.  
              You can now log in with your new credentials.
            </p>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="Login"
            style={{
              marginTop: "25px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 25px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccess;
