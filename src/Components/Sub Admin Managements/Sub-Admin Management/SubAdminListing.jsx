import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { addSubAdmin, fetchRoleData } from "../../../reduxToolkit/Slices/Role";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubAdmin } from "../../../reduxToolkit/Slices/SubAdmin";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import {
  deleteSubAdmin,
  editSubAdmin,
} from "../../../reduxToolkit/Slices/SubAdmin";
import ReactPaginate from "react-paginate";

const RoleListing = () => {
  const dispatch = useDispatch();
  const { roleData, loading } = useSelector((state) => state.role || []);
  const subAdmin = useSelector((state) => state.subAdmin.subAdminData) || [];
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  console.log(subAdmin);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [activePage, updateActivePage] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (subAdmin?.[0]?.metadata?.[0]?.total) {
      const total = subAdmin[0].metadata[0].total;
      const limit = 10;
      setPageCount(Math.max(1, Math.ceil(total / limit)));
    } else {
      setPageCount(1);
    }
  }, [subAdmin]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    updateActivePage(selectedPage);
    dispatch(fetchSubAdmin({ page: selectedPage, searchQuery }));
  };

  const handleShow = () => {
    resetForm();
    setIsEditMode(false);
    setShow(true);
  };

  useEffect(() => {
    dispatch(fetchRoleData());
    // dispatch(deleteSubAdmin());
  }, [dispatch]);

  const roleOptions =
    roleData?.map((role) => ({
      value: role._id,
      label: role.roleName,
    })) || [];

  useEffect(() => {
    dispatch(fetchSubAdmin({ page: activePage, searchQuery }));
  }, [dispatch, activePage, searchQuery]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setActiveModal("deleteSubAdmin");
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setDeleteId(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    updateActivePage(1);
  };

  const handleConfirmDelete = () => {
    if (!deleteId) return;
    dispatch(deleteSubAdmin(deleteId))
      .unwrap()
      .then(() => {
        dispatch(fetchSubAdmin({ page: activePage, searchQuery }));
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Failed to delete sub admin:", err);
      });
  };

  const handleEdit = (item) => {
    setIsEditMode(true);
    setCurrentEditId(item._id);
    // console.log("Edit", item);

    setFullName(item.name || "");
    setEmail(item.email || "");
    setPhoneNo(item.phone || "");
    setPassword("");
    setSelectedRole(
      item.role ? { value: item.role._id, label: item.role.roleName } : null
    );

    setShow(true);
  };

  const handleSubmit = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]{3,}\.[a-zA-Z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (isEditMode) {
      const payload = {
        subAdminId: currentEditId,
        name: fullName,
        email,
        phone: phoneNo,
        password,
        role: selectedRole?.value,
      };
      dispatch(editSubAdmin(payload))
        .unwrap()
        .then(() => {
          setShow(false);
          dispatch(fetchSubAdmin({ page: activePage, searchQuery }));
          resetForm();
        })
        .catch((err) => console.error("Failed to edit SubAdmin:", err));
    } else {
      const payload = {
        name: fullName,
        role: selectedRole?.value,
        email,
        phone: phoneNo,
        password,
        type: "SubAdmin",
      };
      dispatch(addSubAdmin(payload))
        .unwrap()
        .then(() => {
          setShow(false);
          dispatch(fetchSubAdmin({ page: activePage, searchQuery }));
          resetForm();
        })
        .catch((err) => console.error("Failed to add SubAdmin:", err));
    }
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhoneNo("");
    setPassword("");
    setSelectedRole(null);
    setCurrentEditId(null);
    setIsEditMode(false);
  };

  return (
    <>
      <div className="WrapperArea">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="WrapperBox">
          {/* <NavLink aria-label="breadcrumb" className="breadcrumbs">
            <NavLink to="/dashboard" className="greyborder">
              <i className="fa-solid fa-arrow-left arrow-icon" />
              <p>Go Back</p>
            </NavLink>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="dashboard.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item">
                <NavLink to="/sub-admins-management">
                  Sub Admins Management
                </NavLink>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <NavLink to="/sub-admins-management">
                  Sub Admins Management
                </NavLink>
              </li>
            </ol>
          </NavLink>  */}
          <div className="TitleBox">
            <h4 className="Title">Manager</h4>
            <a
              onClick={handleShow}
              className="TitleLink"
              style={{ cursor: "pointer" }}
            >
              Add Sub-Admin
            </a>
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
                {/* <div class="form-group">
                          <label>From Date</label>
                          <input type="date" class="form-control">
                      </div> 
                      <div class="form-group">
                          <label>To Date</label>
                          <input type="date" class="form-control">
                      </div>
                      <div class="form-group">
                          <label>&nbsp;</label>
                          <button class="Button">Apply</button>
                          <button class="Button Cancel"><i class="fa fa-refresh"></i></button>
                      </div> */}
              </div>
              <div className="FilterRight">
                {/* <div class="form-group">
          <label>User Type</label>
          <select class="form-control">
            <option>All Users</option>
            <option>Specific Users</option>
          </select>
        </div>
        <div class="form-group">
          <label>Notification Type</label>
          <select class="form-control">
            <option>Warning messages</option>
            <option>General Notification</option>
          </select>
        </div> */}
              </div>
            </div>
            <div className="TableList">
              <table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subAdmin?.[0]?.data.length > 0 ? (
                    subAdmin?.[0]?.data.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.admin_id || "N/A"}</td>
                        <td>{item.name || "N/A"}</td>
                        <td>{item.email || "N/A"}</td>
                        <td>{item.role?.roleName || "N/A"}</td>
                        <td>{item.active ? "Active" : "Inactive"}</td>
                        <td>
                          <div
                            className="Actions"
                            style={{ display: "flex", gap: "8px" }}
                          >
                            <NavLink
                              to="/viewSubAdmin"
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
                        No Sub-Admins Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="PaginationBox">
              <div className="PaginationLeft">
                <p>
                  Total Records : <span>{subAdmin?.[0]?.data.length || 0}</span>
                </p>
              </div>
              <div className="PaginationRight">
                {pageCount >= 1 && (
                  <ReactPaginate
                    pageCount={pageCount || 1}
                    forcePage={activePage - 1}
                    onPageChange={handlePageClick}
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    disabledClassName={"disabled"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Sub-Admin</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                onChange={(e) => setFullName(e.target.value)}
              />
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Select
                  name="role"
                  options={roleOptions}
                  value={selectedRole}
                  onChange={setSelectedRole}
                  placeholder={loading ? "Loading roles..." : "Select a Role"}
                  classNamePrefix="select"
                />
              </Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                onChange={(e) => setPhoneNo(e.target.value)}
              />
              <Form.Label>Create Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            {isEditMode ? "Update Sub-Admin" : "Add Sub-Admin"}
          </Button>
        </Modal.Footer>
      </Modal> */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit Sub-Admin" : "Add Sub-Admin"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                value={fullName} // controlled input
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Select
                name="role"
                options={roleOptions}
                value={selectedRole}
                onChange={setSelectedRole}
                placeholder={loading ? "Loading roles..." : "Select a Role"}
                classNamePrefix="select"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email Address"
                value={email} // controlled input
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Phone Number"
                value={phoneNo} // controlled input
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3 position-relative">
              <Form.Label>
                {isEditMode ? "Change Password" : "Create Password"}
              </Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder={isEditMode ? "Enter Password" : "Enter Password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#6c757d",
                  }}
                ></i>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            {isEditMode ? "Update Sub-Admin" : "Add Sub-Admin"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={activeModal === "deleteSubAdmin"} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete Sub-Admin?</p>
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
    </>
  );
};

export default RoleListing;
