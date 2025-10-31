import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const IndiaMartDetail = () => {
  const state = useLocation();
  console.log(state);

  return (
    <div className="WrapperArea im-prodcut-details">
      <div className="WrapperBox">
        <nav aria-label="breadcrumb" className="breadcrumbs">
          <NavLink to="/manufactureList/indiamartview" className="greyborder">
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
          <h4 className="Title">Product Details Page</h4>
          {/* <a class="TitleLink" onclick="toggleFormImproductDetails()">Edit</a> */}
        </div>
        <div className="view-details-ad">
          <div className="Small-Wrapper pb-0">
            {/* <div class="FilterArea">
        <div class="FilterLeft">
          <div class="form-group">
            <label>Search</label>
            <input
              type="text"
              class="form-control"
              placeholder="Search by location,name of services"
            />
          </div>
        </div>
      </div> */}
            <div className="AdminActivity" id="infoDivImproductDetails">
              <aside>
                <ul>
                  <h3 className="heading-divide">Service Details</h3>
                  <li>
                    <p className="d-flex">
                      <label className="afterCustom">Service Name</label>
                      <span>{state?.state?.serviceName || "N/A"}</span>
                    </p>
                  </li>
                  <li>
                    <p className="d-flex">
                      <label className="afterCustom">Product Name</label>
                      <span>{state?.state?.productName || "N/A"}</span>
                    </p>
                  </li>
                  <li>
                    <p className="d-flex">
                      <label className="afterCustom">
                        Price <br />
                        (Inc. additional charges)
                      </label>
                      <span> {state?.state?.productPrice || "N/A"} </span>
                    </p>
                  </li>
                  <h3 className="heading-divide2">Product Specification</h3>
                  <li>
                    <p className="d-flex">
                      <label className="afterCustom">Product Weight </label>
                      <span>{"N/A"}</span>
                    </p>
                  </li>
                  <li>
                    <p className="d-flex">
                      <label className="afterCustom">Product Size </label>
                      <span>{"N/A"}</span>
                    </p>
                  </li>
                  <li>
                    <p className="d-flex">
                      <label className="afterCustom">Service Image</label>
                      <span
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexWrap: "wrap",
                        }}
                      >
                        {state?.state?.productImage?.length > 0 ? (
                          state.state.productImage.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`Product ${index}`}
                              style={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "8px",
                                objectFit: "cover",
                                border: "1px solid #ccc",
                              }}
                            />
                          ))
                        ) : (
                          <span>No Image Available</span>
                        )}
                      </span>
                    </p>
                  </li>

                  <label className="enquiry-heading">Description</label>
                  <p>
                    <span>{state?.state?.productDescription}</span>
                  </p>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaMartDetail;
