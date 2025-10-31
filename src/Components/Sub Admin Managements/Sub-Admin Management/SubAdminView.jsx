import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const SubAdminView = () => {
  const { state } = useLocation();
  console.log(state);

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <nav aria-label="breadcrumb" className="breadcrumbs">
          <NavLink to="/tabSwitch" className="greyborder">
            <i className="fa-solid fa-arrow-left arrow-icon" />
            <p>Go Back</p>
          </NavLink>
          {/* <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="dashboard.html">Dashboard</a>
      </li>

      <li class="breadcrumb-item">
        <a href="sub-admins-management.html">Sub Admins Management</a>
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        <a href="sub-admins-management.html">Sub Admins Management</a>
      </li>
    </ol> */}
        </nav>
        <div className="TitleBox">
          <h4 className="Title">Sub Admin Details</h4>
        </div>
        <div className="Small-Wrapper">
          <div className="AdminActivity">
            <aside>
              <ul>
                <li>
                  {/* <h4>Simmi Sharma</h4> */}
                  <p>
                    <label>Sub Admin Id</label>
                    <span>{state.admin_id || "N/A"}</span>
                  </p>
                  <p>
                    <label>Sub Admin Name</label>
                    <span>{state.name || "N/A"}</span>
                  </p>
                  <p>
                    <label>Email Address</label>
                    <span>{state.email || "N/A"}</span>
                  </p>
                  <p>
                    <label>Role</label>
                    <span>{state.role.role_id || "N/A"}</span>
                  </p>
                  {/* <p>
                    <label>Status</label>
                    <span></span>
                  </p> */}
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAdminView;
