import React, { useState } from "react";
import logo from "../../assets/images/images/Logo.png";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { logoutAdmin } from "../../reduxToolkit/Slices/Authentication";
import { FaFont, FaChevronDown, FaChevronUp } from "react-icons/fa";


const SideNavBar = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    dispatch(logoutAdmin())
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch(() => {
        navigate("/login");
      });
  };

  return (
    <div className="SidenavArea">
      <div className="SidenavHead">
        <figure>
          <img src={logo} />
        </figure>
      </div>
      <div className="SidenavBody">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="Icon">
                <i className="fa fa-tachometer" />
              </span>
              <span className="Text">Dashboard</span>
            </NavLink>
          </li>
          <li className={`dropdown ${open ? "open" : ""}`}>
            <a
              href="#!"
              className="dropdown-toggle"
              onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
              }}
              aria-expanded={open}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                padding: "10px 15px",
                color: "#000",
                textDecoration: "none",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <FaFont />
                <span>User Management</span>
              </div>
              {open ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
            </a>

            <ul
              className="submenu"
              style={{
                listStyle: "none",
                margin: 0,
                paddingLeft: "40px",
                display: open ? "block" : "none",
                transition: "all 0.3s ease",
                height:"200px",
                overflow:"hidden"
              }}
            >
              <li>
                <NavLink to="/farmerListing" className="submenu-link">
                  Farmers
                </NavLink>
              </li>
              <li>
                <NavLink to={"/onlineServiceProvider"}
                  className="submenu-link"
                >
                  Online Service Providers
                </NavLink>
              </li>
              <li>
                <NavLink to="/manufactureList" className="submenu-link">
                  Manufacturers B2B
                </NavLink>
              </li>
              <li>
                <a href="#" className="submenu-link">
                  Advertisers
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
            >
              <span className="Icon">
                <i className="fa fa-file-image" />
              </span>
              <span className="Text">Advertisement</span>
            </a>
            <NavLink
              to="/subscription-listing"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="Icon">
                <i className="fa fa-file-image" />
              </span>
              <span className="Text">Subscriptions</span>
            </NavLink>
          </li>
          <li>
            <a >
              <span className="Icon">
                <i className="fa-solid fa-briefcase" />
              </span>
              <span className="Text">Services</span>
            </a>
          </li>
          <li>
            <NavLink
              to="/static-content"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="Icon">
                <i className="fa fa-file" />
              </span>
              <span className="Text">Static Content</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/verification"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="Icon">
                <i className="fa fa-check-circle" />
              </span>
              <span className="Text">Verification Management</span>
            </NavLink>
          </li>
          <li>
            <a
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="Icon">
                <i className="fa fa-file-text" />
              </span>
              <span className="Text">Chats Management</span>
            </a>
          </li>
          <li>
            <NavLink to="/complain"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="Icon">
                <i className="fa fa-puzzle-piece" />
              </span>
              <span className="Text">Complaints Management</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tabSwitch"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="Icon">
                <i className="fa fa-file-image" />
              </span>
              <span className="Text">Sub admins Management</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="Icon">
                <i className="fa fa-file-text" />
              </span>
              <span className="Text">Reports</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/notification-listing"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="Icon">
                <i className="fa fa-bell" />
              </span>
              <span className="Text">Notifications</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="Icon">
                <i className="fa fa-user" aria-hidden="true" />
              </span>
              <span className="Text">Profile</span>
            </NavLink>
          </li>
          <li>
            <a onClick={handleShow} style={{ cursor: "pointer" }}>
              <span className="Icon">
                <i className="fa fa-sign-out" />
              </span>
              <span className="Text">Logout</span>
            </a>
          </li>
        </ul>
      </div>
      <Modal show={show} onHide={handleClose} >
        <Modal.Body>
          <div className="Decline text-center">
            <button
              onClick={handleClose}
              className="CloseModal"
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
            <h3>Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div style={{ marginTop: "20px" }}>
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
              >
                No
              </Button>
              <Button variant="danger" onClick={handleLogout}>
                Yes
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SideNavBar;