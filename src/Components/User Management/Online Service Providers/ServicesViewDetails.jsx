import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const ServicesViewDetails = () => {
    const state = useLocation();
    console.log(state);
    
  return (
    <div className="WrapperArea">
  <div className="WrapperBox">
    <nav aria-label="breadcrumb" className="breadcrumbs">
      <NavLink to="/onlineServiceProvider" className="greyborder"><i className="fa-solid fa-arrow-left arrow-icon" />
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
        <a href="online-service-providers.html"
          >Online Service Providers</a
        >
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        <a href="online-service-providers-details.html"
          >Online Service Provider Details
        </a>
      </li>
    </ol> */}
    </nav>
    <div className="TitleBox">
      <h4 className="Title">Services</h4>
      {/* <a className="TitleLink" data-toggle="modal" data-target="#UploadModal" onclick="toggleFormospBookedServices()">Edit</a> */}
    </div>
    <div className="Small-Wrapper pb-0">
      <div className="AdminActivity" id="infoospBookedServices">
        <h4 className="text-left">Service Details</h4>
        <aside>
          <ul>
            <li>
              <p>
                <label>Service Category</label>
                <span>{state?.state?.categoryDetails?.name || "N/A"}</span>
              </p>
              <p>
                <label>Sub-Service Name</label>
                <span><td>{state?.state?.selectSubCategory || "N/A"}</td></span>
              </p>
              <p>
                <label>Location</label>
                <span>{state?.state?.providerDetails?.address ||"N/A"}</span>
              </p>
            </li>
          </ul>
        </aside>
      </div>
      <div className="AdminActivity" id="myFormospBookedServices">
        <aside>
          <form action>
            <div className="CommonForm">
              <div className="row">
                <div className="form-group col-6">
                  <label>Service Name</label>
                  <input type="text" className="form-control" placeholder="Enter Service Name" />
                </div>
                <div className="form-group col-6">
                  <label>Sub-Service Name</label>
                  <input type="text" className="form-control" placeholder="Enter Sub-Service Name" />
                </div>
                <div className="form-group col-6">
                  <label>Location</label>
                  <input type="text" className="form-control" placeholder="Enter Location" />
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

  )
}

export default ServicesViewDetails