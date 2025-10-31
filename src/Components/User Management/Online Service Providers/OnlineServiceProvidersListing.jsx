import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { sendDeleteOtp, verifyOtp } from "../../../reduxToolkit/Slices/Delete";
import {
  editServiceProvider,
  fetchServiceProvider,
  deleteService,
} from "../../../reduxToolkit/Slices/OnlineServiceProvider";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import { Modal, Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const OnlineServiceProvidersListing = () => {
  const dispatch = useDispatch();
  const serviceProvider = useSelector(
    (state) => state.onlineServiceProvider.onlineServiceProvider
  );
  console.log(serviceProvider);
  const [deleteId, setDeleteId] = useState(null);
  const [activePage, updateActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [status, setStatus] = useState("active");
  const [activeModal, setActiveModal] = useState(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const otpInputsRef = useRef([]);

  const [editServiceData, setEditServiceData] = useState({
    _id: "",
    name: "",
    email: "",
    address: "",
  });

  const handleDelete = (id) => {
    setDeleteId(id);
    setActiveModal("deleteService");
    setOtp(["", "", "", "", "", ""]);
    setOtpVerified(false);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setActiveModal("otp");
    setOtpLoading(true);
    try {
      await dispatch(sendDeleteOtp({ providerId: deleteId })).unwrap();
      toast.success("OTP sent ");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP. Try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleEdit = (serviceItem) => {
    setEditServiceData({
      _id: serviceItem?._id || serviceItem?.providerId || serviceItem?.id,
      name: serviceItem?.name || "",
      email: serviceItem?.email || "",
      address: serviceItem?.address || "",
    });
    setActiveModal("edit");
  };

  const handleOTPChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);

    if (val && idx < 5) {
      otpInputsRef.current[idx + 1]?.focus();
    }
    if (!val && idx > 0) {
      otpInputsRef.current[idx - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      toast.warn("Please enter 6-digit OTP");
      return;
    }
    setVerifyLoading(true);
    try {
      await dispatch(verifyOtp({ otp: code })).unwrap();
      setOtpVerified(true);
      toast.success("OTP verified. You can now confirm deletion.");
    } catch (err) {
      console.error(err);
      setOtpVerified(false);
      toast.error(err?.message || "OTP verification failed");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleFinalConfirm = async () => {
    if (!otpVerified) {
      toast.warn("Please verify OTP before confirming deletion");
      return;
    }
    try {
      await dispatch(deleteService({ providerId: deleteId })).unwrap();
      toast.success("Farmer deleted successfully");
      dispatch(fetchServiceProvider({ page: activePage, searchQuery, status }));
      handleCloseModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete services");
    }
  };

  const handleResendOtp = async () => {
    if (!deleteId) return;
    setOtpLoading(true);
    try {
      await dispatch(sendDeleteOtp({ farmerId: deleteId })).unwrap();
      toast.success("OTP resent");
    } catch (err) {
      console.error(err);
      toast.error("Failed to resend OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditServiceData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]{3,}\.[a-zA-Z]{2,}$/;
  const email = editServiceData.email?.trim() || "";

  if (!emailRegex.test(email)) {
    console.log("Invalid email triggered!");
    toast.error("Please enter a valid email address");
    return;
  }

  try {
    const payload = {
      name: editServiceData.name,
      email,
      address: editServiceData.address,
    };

    console.log("Payload before dispatch:", payload);

    await dispatch(
      editServiceProvider({
        providerId: editServiceData._id,
        payload,
      })
    ).unwrap();

    toast.success("Service details updated successfully!");
    handleCloseModal();
    dispatch(fetchServiceProvider({ page: activePage, searchQuery, status }));
  } catch (err) {
    console.error(err);
    toast.error("Failed to update service details");
  }
};


  const handleCloseModal = () => {
    setActiveModal(null);
    setDeleteId(null);
    setOtp(["", "", "", "", "", ""]);
    setOtpVerified(false);
    setOtpLoading(false);
    setVerifyLoading(false);
  };

  useEffect(() => {
    dispatch(fetchServiceProvider({ page: activePage, searchQuery, status }));
  }, [dispatch, activePage, searchQuery, status]);

  useEffect(() => {
    if (serviceProvider?.[0]?.metadata?.[0]?.total) {
      const total = serviceProvider[0].metadata[0].total;
      const limit = 10;
      setPageCount(Math.ceil(total / limit));
    }
  }, [serviceProvider]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    updateActivePage(selectedPage);
    dispatch(fetchFarmer({ page: selectedPage, searchQuery, status }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    updateActivePage(1);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    updateActivePage(1);
  };

  return (
    <div className="WrapperArea">
      <ToastContainer position="top-right" autoClose={3000} />
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
            <li className="breadcrumb-item">
              <NavLink to="/onlineServiceProvider">User Management</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <NavLink to="/onlineServiceProvider">
                Online Service Providers
              </NavLink>
            </li>
          </ol>
        </nav>
        <div className="TitleBox">
          <h4 className="Title">Online Service Providers</h4>
        </div>
        <div className="Small-Wrapper">
          <div className="FilterArea">
            <div className="FilterLeft">
              <div className="form-group">
                <label>Search</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="FilterRight">
              <div className="form-group">
                <label>Sort</label>
                <select
                  className="form-control"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <option value="active">Active Users</option>
                  <option value="inactive">Deactivated Users</option>
                </select>
              </div>
              <div className="form-group">
                <label>&nbsp;</label>
                <a href="#" className="Button" download>
                  <span className="download">
                    {/* <img src="images/download.png" alt /> */}
                  </span>
                  Export CSV
                </a>
              </div>
            </div>
          </div>
          <div className="TableList">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email Address</th>
                  <th>Address</th>
                  {/* <th>Service Category</th>
                  <th>Sub Service</th> */}
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {serviceProvider?.[0]?.data?.length > 0 ? (
                  serviceProvider?.[0]?.data?.map((item, index) => (
                    <tr key={item.id}>
                      <td>{item.name || "N/A"}</td>
                      <td>{item.phone || "N/A"}</td>
                      <td>{item.email || "N/A"}</td>
                      <td>{item.address || "N/A"}</td>
                      {/* <td>{item.role?.roleName || "N/A"}</td>
                      <td>{item.role?.roleName || "N/A"}</td> */}
                      <td>{item.status || "N/A"}</td>
                      <td>
                        <div
                          className="Actions"
                          style={{ display: "flex", gap: "8px" }}
                        >
                          <NavLink
                            to="/onlineServiceProvider/onlineServiceProviderView"
                            state={item}
                            className="Blue"
                            style={{ color: "#2196f3" }}
                          >
                            <i className="fa fa-eye" aria-hidden="true"></i>
                          </NavLink>
                          <a
                            className="Green"
                            onClick={() => handleEdit(item)}
                            style={{ color: "#4caf50", cursor: "pointer" }}
                          >
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                          </a>
                          <a
                            className="Red"
                            onClick={() => handleDelete(item._id)}
                            style={{ color: "#f44336", cursor: "pointer" }}
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr key="no-sub-admins">
                    <td
                      colSpan="7"
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      No Online Services Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="PaginationBox">
            <div className="PaginationLeft">
              <p>
                Total Records :{" "}
                <span>
                  {serviceProvider?.[0]?.data?.length||
                    0}
                </span>
              </p>
            </div>
            <div className="PaginationRight">
              {serviceProvider?.[0]?.metadata?.[0]?.total > 10 && (
                <ReactPaginate
                  pageCount={pageCount}
                  onPageChange={handlePageClick}
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={activeModal === "deleteService"}
        onHide={handleCloseModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Online Service Provider</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={activeModal === "otp"} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Verify Deletion Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>We just sent you a verification code</p>

          <Form.Group className="mb-3 text-center">
            <Form.Label>Enter OTP</Form.Label>
            <div
              className="d-flex justify-content-center"
              style={{ gap: "8px", marginTop: 8 }}
            >
              {otp.map((value, idx) => (
                <Form.Control
                  key={idx}
                  ref={(el) => (otpInputsRef.current[idx] = el)}
                  type="text"
                  value={value}
                  onChange={(e) => handleOTPChange(e, idx)}
                  maxLength={1}
                  style={{
                    width: 48,
                    height: 48,
                    textAlign: "center",
                    fontSize: 18,
                  }}
                />
              ))}
            </div>
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center">
            <small>
              Didn’t get OTP?{" "}
              <Button
                variant="link"
                className="p-0"
                onClick={handleResendOtp}
                disabled={otpLoading}
              >
                {otpLoading ? "Resending..." : "Resend"}
              </Button>
            </small>

            <div>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setOtp(["", "", "", "", "", ""]);
                  otpInputsRef.current[0]?.focus();
                }}
                className="me-2"
              >
                Clear
              </Button>

              <Button
                variant="primary"
                onClick={handleVerifyOtp}
                disabled={verifyLoading}
              >
                {verifyLoading ? "Verifying..." : "Verify"}
              </Button>

              <Button
                variant="success"
                onClick={handleFinalConfirm}
                className="ms-2"
                disabled={!otpVerified}
              >
                Confirm
              </Button>
            </div>
          </div>

          {!otpVerified && (
            <div style={{ marginTop: 12 }}>
              <small className="text-muted">
                Enter the 6-digit code and click Verify. On success you can
                Confirm deletion.
              </small>
            </div>
          )}

          {otpVerified && (
            <div style={{ marginTop: 12 }}>
              <small className="text-success">OTP Verified ✓</small>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={activeModal === "edit"} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Online Service Provider</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editServiceData.name || ""}
                onChange={handleEditChange}
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editServiceData.email || ""}
                onChange={handleEditChange}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={editServiceData.address || ""}
                onChange={handleEditChange}
                placeholder="Enter address"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OnlineServiceProvidersListing;
