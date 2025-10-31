import React, { useState, useEffect, useRef } from "react";
import {
  fetchManufacture,
  deleteManufacturer,
} from "../../../reduxToolkit/Slices/Manufacture";
import { editServiceProvider } from "../../../reduxToolkit/Slices/OnlineServiceProvider";
import { sendDeleteOtp, verifyOtp } from "../../../reduxToolkit/Slices/Delete";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Modal, Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const ManufacuresListing = () => {
  const dispatch = useDispatch();
  const adminApproval = "true";

  const [activeTab, setActiveTab] = useState("IM");
  const [activePageIM, setActivePageIM] = useState(1);
  const [activePageJD, setActivePageJD] = useState(1);
  const [pageCountIM, setPageCountIM] = useState(1);
  const [pageCountJD, setPageCountJD] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("active");
  const { manufactures, loading } = useSelector((state) => state.manufacture);
  const [indiaMartData, setIndiaMartData] = useState([]);
  const [justDialData, setJustDialData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [editData, setEditData] = useState({});
  const [editLoading, setEditLoading] = useState(false);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const otpInputsRef = useRef([]);

  useEffect(() => {
    const section =
      activeTab === "IM" ? "india_mart" : activeTab === "JD" ? "just_dial" : "";

    const page = activeTab === "IM" ? activePageIM : activePageJD;

    dispatch(
      fetchManufacture({ page, searchQuery, section, adminApproval, status })
    ).then((res) => {
      if (res?.payload?.data?.length) {
        const result = res.payload.data[0];
        if (section === "india_mart") {
          setIndiaMartData(result.data);
          const total = result.metadata?.[0]?.total || 0;
          setPageCountIM(Math.max(1, Math.ceil(total / 10)));
        } else if (section === "just_dial") {
          setJustDialData(result.data);
          const total = result.metadata?.[0]?.total || 0;
          setPageCountJD(Math.max(1, Math.ceil(total / 10)));
        }
      }
    });
  }, [
    dispatch,
    activePageIM,
    activePageJD,
    searchQuery,
    activeTab,
    status,
    adminApproval,
  ]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setActiveModal("deleteManufacture");
    setOtp(["", "", "", "", "", ""]);
    setOtpVerified(false);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setActiveModal("otp");
    setOtpLoading(true);
    try {
      await dispatch(sendDeleteOtp({ manufactureId: deleteId })).unwrap();
      toast.success("OTP sent ");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP. Try again.");
    } finally {
      setOtpLoading(false);
    }
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
    const deleteResponse = await dispatch(deleteManufacturer(deleteId)).unwrap();

    if (deleteResponse?.success) {
      toast.success("Manufacturer deleted successfully");

      // 1️⃣ Remove deleted item from local state immediately
      if (activeTab === "IM") {
        setIndiaMartData((prev) => prev.filter((item) => item._id !== deleteId));
      } else if (activeTab === "JD") {
        setJustDialData((prev) => prev.filter((item) => item._id !== deleteId));
      }

      handleCloseModal();

      // 2️⃣ Call fetch to sync with backend (optional but recommended)
      const section = activeTab === "IM" ? "india_mart" : "just_dial";
      const page = activeTab === "IM" ? activePageIM : activePageJD;

      const res = await dispatch(
        fetchManufacture({ page, searchQuery, section, adminApproval, status })
      ).unwrap();

      const result = res?.data?.[0];
      if (result) {
        if (activeTab === "IM") {
          setIndiaMartData(result.data || []);
          const total = result.metadata?.[0]?.total || 0;
          setPageCountIM(Math.max(1, Math.ceil(total / 10)));
        } else if (activeTab === "JD") {
          setJustDialData(result.data || []);
          const total = result.metadata?.[0]?.total || 0;
          setPageCountJD(Math.max(1, Math.ceil(total / 10)));
        }
      } else {
        if (activeTab === "IM") setIndiaMartData([]);
        else setJustDialData([]);
      }

    } else {
      toast.error("Failed to delete manufacturer");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete manufacturer");
  }
};

  const handleEdit = (item) => {
    setEditData(item);
    if (activeTab === "IM") {
      setActiveModal("editIM");
    } else {
      setActiveModal("editJD");
    }
  };

  const handleResendOtp = async () => {
    if (!deleteId) return;
    setOtpLoading(true);
    try {
      await dispatch(sendDeleteOtp({ manufactureId: deleteId })).unwrap();
      toast.success("OTP resent");
    } catch (err) {
      console.error(err);
      toast.error("Failed to resend OTP");
    } finally {
      setOtpLoading(false);
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

  const handlePageClickIM = (data) => {
    setActivePageIM(data.selected + 1);
  };

  const handlePageClickJD = (data) => {
    setActivePageJD(data.selected + 1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setActivePageIM(1);
    setActivePageJD(1);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setActivePageIM(1);
    setActivePageJD(1);
  };

  const activeData = activeTab === "IM" ? indiaMartData : justDialData;
  const activePageCount = activeTab === "IM" ? pageCountIM : pageCountJD;
  const activePageNumber = activeTab === "IM" ? activePageIM : activePageJD;

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
  setEditLoading(true);
  try {
    const providerId = editData._id;

    let payload = {};
    if (activeTab === "IM") {
      payload = {
        name: editData.name,
        businessName: editData.businessName,
      };
    } else if (activeTab === "JD") {
      payload = {
        businessName: editData.businessName,
        name: editData.name,      
        email: editData.email,
        // address: editData.address, 
      };
    }

    await dispatch(editServiceProvider({ providerId, payload })).unwrap();

    toast.success("Manufacturer updated successfully");

    if (activeTab === "IM") {
      setIndiaMartData((prev) =>
        prev.map((item) =>
          item._id === providerId ? { ...item, ...payload } : item
        )
      );
    } else if (activeTab === "JD") {
      setJustDialData((prev) =>
        prev.map((item) =>
          item._id === providerId ? { ...item, ...payload } : item
        )
      );
    }

    handleCloseModal();
  } catch (err) {
    console.error(err);
    toast.error("Failed to update manufacturer");
  } finally {
    setEditLoading(false);
  }
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
              <NavLink to="/manufactureList">User Management</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <a href="#">Manufacturers B2B</a>
            </li>
          </ol>
        </nav>

        <div className="TitleBox">
          <h4 className="Title">Manufacturers B2B</h4>
        </div>

        {/* Tabs */}
        <div className="CommonTabs">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "IM" ? "active" : ""}`}
                onClick={() => setActiveTab("IM")}
              >
                IndiaMart
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "JD" ? "active" : ""}`}
                onClick={() => setActiveTab("JD")}
              >
                Just Dial
              </button>
            </li>
          </ul>
        </div>

        {/* Table + Pagination */}
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
            </div>
          </div>

          <div className="TableList">
            <table>
              <thead>
                <tr>
                  {activeTab === "IM" ? (
                    <>
                      <th>Manufacturer Name</th>
                      <th>Phone Number</th>
                      <th>Business Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </>
                  ) : (
                    <>
                      <th>Business Name</th>
                      <th>Contact Person</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Action</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {activeData?.length > 0 ? (
                  activeData.map((item, index) => (
                    <tr key={index}>
                      {activeTab === "IM" ? (
                        <>
                          <td>{item.name || "N/A"}</td>
                          <td>{item.phone || "N/A"}</td>
                          <td>{item?.businInfo?.businessName || "N/A"}</td>
                          <td>{item.status || "N/A"}</td>
                          <td>
                            <div
                              className="Actions"
                              style={{ display: "flex", gap: "8px" }}
                            >
                              <NavLink
                                to="/manufactureList/indiamartview"
                                state={{ source: "IndiaMart", data: item }}
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
                                <i
                                  className="fa fa-pencil"
                                  aria-hidden="true"
                                ></i>
                              </a>
                              <a
                                className="Red"
                                onClick={() => handleDelete(item._id)}
                                style={{ color: "#f44336", cursor: "pointer" }}
                              >
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{item?.businInfo?.businessName || "N/A"}</td>
                          <td>{item.name || "N/A"}</td>
                          <td>{item.email || "N/A"}</td>
                          <td>{item.phone || "N/A"}</td>
                          <td>{item.address || "N/A"}</td>
                          <td>{item.status || "N/A"}</td>
                          <td>
                            <div
                              className="Actions"
                              style={{ display: "flex", gap: "8px" }}
                            >
                              <NavLink
                                to="/manufactureList/justdialview"
                                state={{ source: "JustDial", data: item }}
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
                                <i
                                  className="fa fa-pencil"
                                  aria-hidden="true"
                                ></i>
                              </a>
                              <a
                                className="Red"
                                onClick={() => handleDelete(item._id)}
                                style={{ color: "#f44336", cursor: "pointer" }}
                              >
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No Manufacture Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="PaginationBox">
            <div className="PaginationLeft">
              <p>
                Total Records : <span>{activeData?.length || 0}</span>
              </p>
            </div>
            <div className="PaginationRight">
              {activePageCount > 1 && (
                <ReactPaginate
                  pageCount={activePageCount}
                  forcePage={activePageNumber - 1}
                  onPageChange={
                    activeTab === "IM" ? handlePageClickIM : handlePageClickJD
                  }
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
        show={activeModal === "deleteManufacture"}
        onHide={handleCloseModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Manufacturer B2B</Modal.Title>
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

      {/* OTP Modal */}
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
      {/* IndiaMart Edit Modal */}
      <Modal show={activeModal === "editIM"} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit IndiaMart Manufacturer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Manufacturer Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editData.name || ""}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number (Not Editable)</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={editData.phone || ""}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Business Name</Form.Label>
              <Form.Control
                type="text"
                name="businessName"
                value={editData.businessName || ""}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleEditSubmit}
            disabled={editLoading}
          >
            {editLoading ? "Updating..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* JustDial Edit Modal */}
      <Modal show={activeModal === "editJD"} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit JustDial Manufacturer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Business Name</Form.Label>
              <Form.Control
                type="text"
                name="businessName"
                value={editData.businessName || ""}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact Person</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editData.name || ""}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editData.email || ""}
                onChange={handleEditChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number (Not Editable)</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={editData.phone || ""}
                disabled
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={editData.address || ""}
                onChange={handleEditChange}
              />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleEditSubmit}
            disabled={editLoading}
          >
            {editLoading ? "Updating..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManufacuresListing;
