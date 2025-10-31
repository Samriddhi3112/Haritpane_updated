import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import driver from "../../../assets/images/images/Driver.png";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import {
  fetchRoleData,
  addRole,
  editRoleData,
  deleteRoleData,
} from "../../../reduxToolkit/Slices/Role";
import { useDispatch, useSelector } from "react-redux";

const RoleListing = () => {
  const dispatch = useDispatch();
  const rolesData = useSelector((state) => state.role?.roleData) || [];
  const [selectedRole, setSelectedRole] = useState(null);

  const [show, setShow] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [activeModal, setActiveModal] = useState(null);

  const defaultPermissions = {
    dashboard: { read: false, full: false },
    userManagementFarmers: { read: false, full: false },
    userManagementOsp: { read: false, full: false },
    userManagementB2B: { read: false, full: false },
    userManagementAd: { read: false, full: false },
    subscriptions: { read: false, full: false },
    services: { read: false, full: false },
    chats: { read: false, full: false },
    complaints: { read: false, full: false },
    subAdmins: { read: false, full: false },
    reports: { read: false, full: false },
    notifications: { read: false, full: false },
    profile: { read: false, full: false },
  };
  const [permissions, setPermissions] = useState(defaultPermissions);

  useEffect(() => {
    dispatch(fetchRoleData());
  }, [dispatch]);

  const handleOpenModal = (modalType, role = null) => {
    setActiveModal(modalType);

    if (modalType === "addRole") {

      setSelectedRole(null);
      setRoleName("");
      setPermissions(defaultPermissions);
    }

    if (modalType === "editRole" && role) {
      setSelectedRole(role);
      setRoleName(role.roleName);
    }

    if (modalType === "deleteRole" && role) {
      setSelectedRole(role);
    }
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedRole(null);
    setRoleName("");
    setPermissions(defaultPermissions);
  };

  const handleSaveRole = () => {
    const moduleList = Object.keys(permissions).map((key) => ({
      name: key,
      read: permissions[key].read || false,
      fullAccess: permissions[key].full || false,
    }));

    if (roleName.trim() !== "") {
      sessionStorage.setItem("roleName", roleName);
      dispatch(addRole({ roleName, moduleList }))
        .unwrap()
        .then((res) => {
          setPermissions(defaultPermissions);
          setActiveModal(null);
          setShow(false);
          setRoleName("");
          dispatch(fetchRoleData());
        })
        .catch((err) => {
          console.error("Failed to add role:", err);
          // alert(err);
        });
    } else {
      console.error("Please enter a role name.");
    }
  };

  const handleChange = (key, type) => {
    setPermissions((prev) => {
      const updated = { ...prev };

      if (type === "read") {
        const newReadValue = !prev[key].read;
        updated[key] = {
          read: newReadValue,
          full: newReadValue ? prev[key].full : false,
        };
      }

      if (type === "full") {
        const newFullValue = !prev[key].full;
        updated[key] = {
          read: newFullValue ? true : prev[key].read,
          full: newFullValue,
        };
      }

      return updated;
    });
  };

  // const handleSaveAccessControl = () => {
  //   const savedRoleName = sessionStorage.getItem("roleName");
  //   if (!savedRoleName) {
  //     alert("No role found in session. Please add a role first.");
  //     return;
  //   }

  //   const moduleList = Object.keys(permissions).map((key) => ({
  //     module: key,
  //     ...permissions[key],
  //   }));

  //   const payload = {
  //     roleName: savedRoleName,
  //     moduleList,
  //   };

  //   dispatch(addRole(payload))
  //     .unwrap()
  //     .then((res) => {
  //       console.log("Access control saved:", res);
  //       setActiveModal(null);
  //       dispatch(fetchRoleData());
  //     })
  //     .catch((err) => {
  //       console.error("Failed to save access control:", err);
  //       alert(err);
  //     });
  // };

  const handleUpdateRole = () => {
    if (!selectedRole) return;

    if (roleName.trim() === "") {
      alert("Role name cannot be empty.");
      return;
    }

    const payload = {
      roleId: selectedRole._id,
      roleName,
    };

    dispatch(editRoleData(payload))
      .then((res) => {
        setSelectedRole(null);
        setRoleName("");
        setActiveModal(null);
        dispatch(fetchRoleData());
      })
      .catch((err) => {
        console.error("Failed to update role:", err);
      });
  };

  const handleDeleteRole = async () => {
    if (!selectedRole) return;

    try {
      await dispatch(deleteRoleData(selectedRole._id)).unwrap();
      dispatch(fetchRoleData());

      handleCloseModal();
    } catch (err) {
      console.error("Failed to delete role:", err);
    }
  };

  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          {/* <nav aria-label="breadcrumb" className="breadcrumbs">
            <NavLink to="/dashboard" className="greyborder">
              <i className="fa-solid fa-arrow-left arrow-icon" />
              <p>Go Back</p>
            </NavLink>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="dashboard.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <NavLink to="/role-list">Sub Admins Management</NavLink>
              </li>
            </ol>
          </nav> */}
          <div className="TitleBox">
            <h4 className="Title">Sub Admins Management</h4>
            <a
              href="#"
              onClick={() => handleOpenModal("addRole")}
              className="TitleLink"
              style={{ cursor: "pointer" }}
            >
              Add Role
            </a>
          </div>
          <div className="Small-Wrapper pb-0">
            <div className="DriverCountList">
              <div className="row">
                {rolesData.map((role) => (
                  <div className="col-lg-4" key={role._id}>
                    <div className="DriverCountBox">
                      <a>
                        <span className="Icon">
                          <img src={driver} alt="role-icon" />
                        </span>
                        <span className="Text">{role.roleName}</span>
                      </a>
                      <Dropdown>
                        <Dropdown.Toggle
                          as="span"
                          id="dropdown-basic"
                          style={{ cursor: "pointer" }}
                        ></Dropdown.Toggle>
                        <Dropdown.Menu>
                          {/* <Dropdown.Item
                            onClick={() =>
                              handleOpenModal("accessControl", role)
                            }
                          >
                            Access Control
                          </Dropdown.Item> */}
                          <Dropdown.Item
                            onClick={() => handleOpenModal("editRole", role)}
                          >
                            Edit Role
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleOpenModal("deleteRole", role)}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Role Modal  */}
      <Modal
        show={activeModal === "addRole"}
        onHide={handleCloseModal}
        // centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Role Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Role Name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Body>
          {Object.keys(permissions).map((key) => (
            <div key={key} className="d-flex justify-content-between mb-2">
              <span className="text-capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <div>
                <Form.Check
                  inline
                  type="checkbox"
                  label="Read"
                  checked={permissions[key].read}
                  onChange={() => handleChange(key, "read")}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Full Access"
                  checked={permissions[key].full}
                  onChange={() => handleChange(key, "full")}
                />
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSaveRole}>
            Add Role
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Role Modal */}
      <Modal show={activeModal === "editRole"} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Role Name</Form.Label>
            <Form.Control
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="Enter Role Name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => handleUpdateRole()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Access Control Modal */}
      {/* <Modal
        show={activeModal === "accessControl"}
        onHide={() => setActiveModal(null)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Access Control</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.keys(permissions).map((key) => (
            <div key={key} className="d-flex justify-content-between mb-2">
              <span className="text-capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <div>
                <Form.Check
                  inline
                  type="checkbox"
                  label="Read"
                  checked={permissions[key].read}
                  onChange={() => handleChange(key, "read")}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Full Access"
                  checked={permissions[key].full}
                  onChange={() => handleChange(key, "full")}
                />
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setActiveModal(null)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveAccessControl}>
            Save
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* Delete Modal */}
      <Modal show={activeModal === "deleteRole"} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete role?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteRole}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoleListing;
