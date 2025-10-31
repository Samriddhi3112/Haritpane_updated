import React, { useEffect, useState } from "react";
import { fetchProfile } from "../../reduxToolkit/Slices/Profile";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../reduxToolkit/Slices/Profile";
import { NavLink } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { uploadProfileImage } from "../../reduxToolkit/Slices/Profile";
import { updateProfile } from "../../reduxToolkit/Slices/Profile";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("detail");
  const profile = useSelector((state) => state.profile.profileData?.data || {});
  const [showModal, setShowModal] = useState(false);
  // console.log("prf", profile);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showReEnter, setShowReEnter] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbar(true);
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleSnackbarClose = () => {
    setSnackbar(!snackbar);
  };

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      // setEmail(profile.email || "");
      // setPhone(profile.phone || "");
    }
  }, [profile, showModal]);

  const handleSave = () => {
    const updatedData = {
      name,
      profileImage: image,
    };

    // console.log("Payload being sent:", updatedData);

    dispatch(updateProfile(updatedData))
      .unwrap()
      .then(() => {
        dispatch(fetchProfile());
      })
      .catch((err) => {
        console.error("Failed to update Profile:", err);
      });

    setShowModal(false);
  };

  const handlePasswordChange = () => {
    if (!oldPassword || !newPassword || !reEnterPassword) {
      showSnackbar("All fields are required", "error");
      return;
    }
    if (newPassword !== reEnterPassword) {
      showSnackbar("New Password and Re-enter Password must match", "error");
      return;
    }

    dispatch(changePassword({ oldPassword, newPassword, reEnterPassword }))
      .unwrap()
      .then((res) => {
        showSnackbar("Password changed successfully!", "success");
        setOldPassword("");
        setNewPassword("");
        setReEnterPassword("");
      })
      .catch((err) => {
        showSnackbar(err?.message || "Failed to change password", "error");
      });
  };

  // --- Replace your existing handleFileChange with this ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check for PDF
    if (file.type === "application/pdf") {
      showSnackbar(
        "PDF files are not allowed. Please upload an image.",
        "error"
      );
      e.target.value = "";
      return;
    }

    // Check for non-image file types
    if (!file.type.startsWith("image/")) {
      showSnackbar("Invalid file type. Please upload an image.", "error");
      e.target.value = "";
      return;
    }

    // Preview locally before uploading
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    // Upload to server
    dispatch(uploadProfileImage(file))
      .unwrap()
      .then((res) => {
        if (res?.data && res.data.length > 0) {
          setImage(res.data[0]); // use uploaded URL
          showSnackbar("Image uploaded successfully!", "success");
        }
      })
      .catch((err) => {
        console.error("Image upload failed:", err);
        showSnackbar("Image upload failed!", "error");
      });
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <nav aria-label="breadcrumb" className="breadcrumbs">
          <NavLink to="/dashboard" className="greyborder">
            <i className="fa-solid fa-arrow-left arrow-icon" />
            <p>Go Back</p>
          </NavLink>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <NavLink to="/profile">Profile</NavLink>
            </li>
          </ol>
        </nav>

        <div className="TitleBox">
          <h4 className="Title">My Profile</h4>
        </div>

        <div className="CommonTabs">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "detail" ? "active" : ""}`}
                onClick={() => setActiveTab("detail")}
              >
                Personal Details
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "setting" ? "active" : ""
                }`}
                onClick={() => setActiveTab("setting")}
              >
                Password Settings
              </button>
            </li>
          </ul>
        </div>

        <div className="tab-content">
          {activeTab === "detail" && (
            <div className="tab-pane active">
              <div className="row">
                <div className="col-sm-12">
                  <div className="Small-Wrapper">
                    <div className="CommonForm">
                      <div className="form-group">
                        <figure>
                          <img
                          style={{height:"150px"}}
                            src={profile.profileImage || "N/A"}
                            alt="profile"
                          />
                        </figure>
                      </div>
                      <div className="form-group">
                        <label>Full name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={profile.name || "N/A"}
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label>Email address</label>
                        <input
                          type="email"
                          className="form-control"
                          value={profile.email || "N/A"}
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label>Contact No</label>
                        <input
                          type="number"
                          className="form-control"
                          value={profile.phone || "N/A"}
                          disabled
                        />
                      </div>
                      <button
                        className="Button"
                        onClick={() => setShowModal(true)}
                      >
                        Edit Details
                      </button>
                    </div>
                  </div>
                </div>
                {showModal && (
                  <div
                    className="modal fade show"
                    style={{
                      display: "block",
                      background: "rgba(0,0,0,0.5)",
                    }}
                  >
                    <div className="modal-dialog modal-lg">
                      <div
                        className="modal-content"
                        style={{ position: "relative" }}
                      >
                        {/* Cross Button (top-right corner) */}
                        <button
                          onClick={() => setShowModal(false)}
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "15px",
                            border: "none",
                            background: "transparent",
                            fontSize: "24px",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          ×
                        </button>

                        {/* Modal Header */}
                        <div className="modal-header">
                          <h5 className="modal-title">Edit Details</h5>
                        </div>

                        {/* Modal Body with your form */}
                        <div className="modal-body">
                          <div className="col-sm-12">
                            <div className="Small-Wrapper">
                              <div className="CommonForm">
                                <div className="form-group">
  <label>Upload Image</label>
  <div
    className="UploadBox"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "15px",
      flexWrap: "wrap",
    }}
  >
    {/* Upload button box */}
    <div
      className="Upload"
      style={{
        border: "2px dashed #ccc",
        borderRadius: "10px",
        width: "120px",
        height: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
        backgroundColor: "#fafafa",
        transition: "border 0.3s ease",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.border = "2px dashed #666")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.border = "2px dashed #ccc")
      }
    >
      <i className="fa fa-upload" style={{ fontSize: "20px", color: "#666" }} />
      <span style={{ fontSize: "14px", marginTop: "5px", color: "#333" }}>
        Upload
      </span>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{
          opacity: 0,
          position: "absolute",
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
      />
    </div>

    {/* Image Preview */}
    {image && (
      <div
        style={{
          position: "relative",
          width: "120px",
          height: "120px",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          border: "1px solid #eee",
        }}
      >
        <img
          src={image}
          alt="Preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />

        {/* Optional remove (×) button */}
        <button
          onClick={() => setImage("")}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "22px",
            height: "22px",
            cursor: "pointer",
            fontSize: "14px",
            lineHeight: "20px",
          }}
          title="Remove"
        >
          ×
        </button>
      </div>
    )}
  </div>
</div>


                                <div className="form-group">
                                  <label>Full name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={name || "N/A"}
                                    placeholder="Enter Your Name"
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </div>

                                <div className="form-group">
                                  <label>Email address</label>
                                  <input
                                    disabled
                                    type="email"
                                    className="form-control"
                                    value={profile?.email || "N/A"}
                                    // onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email"
                                  />
                                </div>

                                <div className="form-group">
                                  <label>Contact No</label>
                                  <input
                                    disabled
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Your Contact No"
                                    value={profile?.phone || "N/A"}
                                    // onChange={(e) => setPhone(e.target.value)}
                                  />
                                </div>

                                <button className="Button" onClick={handleSave}>
                                  Save Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="modal-footer">
                          <button
                            className="btn btn-secondary"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "setting" && (
            <div className="tab-pane active">
              <div className="TitleBox">
                <h4 className="Title">Change Password</h4>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="Small-Wrapper">
                    <div className="CommonForm">
                      <div className="form-group">
                        <label>Old Password</label>
                        <input
                          type={showOld ? "text" : "password"}
                          className="form-control"
                          placeholder="Enter Old Password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <span
                          className="Icon"
                          onClick={() => setShowOld(!showOld)}
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className={`fa ${
                              showOld ? "fa-eye" : "fa-eye-slash"
                            }`}
                          />
                        </span>
                      </div>

                      <div className="form-group">
                        <label>New Password</label>
                        <input
                          type={showNew ? "text" : "password"}
                          className="form-control"
                          placeholder="Enter New Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <span
                          className="Icon"
                          onClick={() => setShowNew(!showNew)}
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className={`fa ${
                              showNew ? "fa-eye" : "fa-eye-slash"
                            }`}
                          />
                        </span>
                      </div>

                      <div className="form-group">
                        <label>Re-enter Password</label>
                        <input
                          type={showReEnter ? "text" : "password"}
                          className="form-control"
                          placeholder="Re-enter Password"
                          value={reEnterPassword}
                          onChange={(e) => setReEnterPassword(e.target.value)}
                        />
                        <span
                          className="Icon"
                          onClick={() => setShowReEnter(!showReEnter)}
                          style={{ cursor: "pointer" }}
                        >
                          <i
                            className={`fa ${
                              showReEnter ? "fa-eye" : "fa-eye-slash"
                            }`}
                          />
                        </span>
                      </div>

                      <button className="Button" onClick={handlePasswordChange}>
                        Save Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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

export default Profile;
