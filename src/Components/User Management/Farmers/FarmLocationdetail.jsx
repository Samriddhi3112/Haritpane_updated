import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const farmLocationdetail = () => {
    const state = useLocation();
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <nav aria-label="breadcrumb" className="breadcrumbs">
          <NavLink to="/farmerListing" className="greyborder">
            <i className="fa-solid fa-arrow-left arrow-icon" />
            <p>Go Back</p>
          </NavLink>
          {/* <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="dashboard.html">Dashboard</a>
      </li>
      <li class="breadcrumb-item">
        <a href="dashboard.html">User Management</a>
      </li>
      <li class="breadcrumb-item" aria-current="page">
        <a href="farmers.html">Farmers</a>
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        <a href="farmers-details.html">Farmer Details </a>
      </li>
    </ol> */}
        </nav>
        <div className="TitleBox">
          <h4 className="Title">Farm Locations</h4>
          {/* <a
      class="TitleLink"
      data-toggle="modal"
      data-target="#UploadModal"
      onclick="toggleForm2()"
      >Edit</a
    > */}
        </div>
        <div className="Small-Wrapper pb-0">
          <div className="AdminActivity" id="infoDiv2">
            <aside>
              <ul>
                <li>
                  <p>
                    <label>Farm Address</label>
                    <span>{state?.state?.name || "N/A"}</span>
                  </p>
                  <p className="d-flex">
                    <label className="afterCustom">State</label>
                    <span><span>{state?.state?.state || "N/A"}</span></span>
                  </p>
                  <p>
                    <label>City/Village/Taluka</label>
                    <span><span>{state?.state?.city || "N/A"}</span></span>
                  </p>
                  <p>
                    <label> Pin Code</label>
                    <span><span>{state?.state?.pincode || "N/A"}</span></span>
                  </p>
                  <p>
                    <label> View Map </label>
                    <span>
                      <i className="fa fa-map-marker" aria-hidden="true" />
                    </span>
                  </p>
                </li>
              </ul>
            </aside>
          </div>
          <div className="AdminActivity" id="myForm2">
            <aside>
              <form action>
                <div className="CommonForm">
                  <div className="row">
                    <div className="form-group col-6">
                      <label>Sr No.</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Sr No."
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Farm Address </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Farm Address"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>State</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Your State"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>City/Village/Taluka </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your City/Village/Taluka"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>Pin Code </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Pin Code	"
                      />
                    </div>
                    <div className="form-group col-6">
                      <label>View Map </label>
                      <input type="url" className="form-control" />
                    </div>
                  </div>
                  <button className="Button">Save Details</button>
                </div>
              </form>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default farmLocationdetail;
