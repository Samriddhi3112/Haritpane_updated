import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { fetchLocationFarmer } from "../../../reduxToolkit/Slices/Farmer";
import { useDispatch, useSelector } from "react-redux";

const FarmerView = () => {
  const dispatch = useDispatch();
  const state = useLocation();
  const [activePage, updateActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageCount, setPageCount] = useState(0);
  console.log(state);
  const locationFarmer = useSelector((state) => state.farmer.location);
  console.log(locationFarmer);
  const farmerId = state.state._id || "N/A";
  const section = "locations";

  useEffect(() => {
    dispatch(
      fetchLocationFarmer({
        page: activePage,
        searchQuery,
        section,
        farmerId,
      })
    );
  }, [dispatch, activePage, searchQuery, section, farmerId]);

  const [activeTab, setActiveTab] = useState("personalDetails");

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        {/* Breadcrumbs */}
        <nav aria-label="breadcrumb" className="breadcrumbs">
          <NavLink to="/farmerListing" className="greyborder">
            <i className="fa-solid fa-arrow-left arrow-icon" />
            <p>Go Back</p>
          </NavLink>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to="/farmerListing">User Management</NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to="/farmerListing">Farmers</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Farmer Details
            </li>
          </ol>
        </nav>

        {/* Title */}
        <div className="TitleBox">
          <h4 className="Title mb-2">Farmer Details</h4>
        </div>

        {/* Tabs Navigation */}
        <div className="CommonTabs">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "personalDetails" ? "active" : ""
                }`}
                onClick={() => setActiveTab("personalDetails")}
              >
                Personal Details
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "farmLocations" ? "active" : ""
                }`}
                onClick={() => setActiveTab("farmLocations")}
              >
                Farm Locations
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "bookedServices" ? "active" : ""
                }`}
                onClick={() => setActiveTab("bookedServices")}
              >
                Booked Services
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "subscriptions" ? "active" : ""
                }`}
                onClick={() => setActiveTab("subscriptions")}
              >
                Subscriptions
              </button>
            </li>
          </ul>
        </div>

        {/* Tabs Content */}
        <div className="tab-content mt-3">
          {/* Personal Details */}
          {activeTab === "personalDetails" && (
            <div className="tab-pane fade active show" id="personalDetails">
              <div className="Small-Wrapper mt-3 pb-0">
                <div className="TitleBox">
                  <h4 className="Title">
                    <i className="fa fa-address-book-o" aria-hidden="true" />
                    Personal Details
                  </h4>
                </div>
                <div className="AdminActivity">
                  <aside id="infoDiv">
                    <ul>
                      <li>
                        <p className="d-flex">
                          <label className="afterCustom">
                            <i className="fa fa-user" aria-hidden="true" />
                            Farmer Name
                          </label>
                          <span>{state?.state?.name || "N/A"}</span>
                        </p>
                        <p className="d-flex">
                          <label className="afterCustom">
                            <i className="fa fa-phone" aria-hidden="true" />
                            Phone No
                          </label>
                          <span>{state?.state?.phone || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i
                              className="fa fa-envelope"
                              aria-hidden="true"
                            />
                            Email Address
                          </label>
                          <span>{state?.state?.email || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i
                              className="fa fa-map-marker"
                              aria-hidden="true"
                            />
                            Address
                          </label>
                          <span>{state?.state?.address || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i className="fa fa-language" aria-hidden="true" />
                            Choosen Language
                          </label>
                          <span>{state?.state?.languageSelector || "N/A"}</span>
                        </p>
                      </li>
                    </ul>
                  </aside>
                </div>
              </div>
            </div>
          )}

          {/* Farm Locations */}
          {activeTab === "farmLocations" && (
            <div className="tab-pane fade active show" id="farmLocations">
              <div className="Small-Wrapper">
                <div className="TitleBox">
                  <h4 className="Title">Farm Locations</h4>
                </div>
                <div className="TableList">
                  <table>
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Farm Address</th>
                        <th>State</th>
                        <th>City/Village/Taluka</th>
                        <th>Pin Code</th>
                        <th>View Map</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>Next milestone update.
                      {/* {locationFarmer?.[0]?.data.length > 0 ? (
                        locationFarmer?.[0]?.data.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.address || "N/A"}</td>
                            <td>{item.name || "N/A"}</td>
                            <td>{item.email || "N/A"}</td>
                            <td>{item.role?.roleName || "N/A"}</td>
                            <td>{"N/A"}</td>
                            <td>
                              <div
                                className="Actions"
                                style={{ display: "flex", gap: "8px" }}
                              >
                                <NavLink
                                  to="/farmerListing/farmlocationdetail"
                                  state={item}
                                  className="Blue"
                                  style={{ color: "#2196f3" }}
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </NavLink>
                                <a
                                  className="Red"
                                  onClick={() => handleDelete(item._id)}
                                  style={{
                                    color: "#f44336",
                                    cursor: "pointer",
                                  }}
                                >
                                  <i
                                    className="fa fa-trash"
                                    aria-hidden="true"
                                  ></i>
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
                            No data Found
                          </td>
                        </tr>
                      )} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Booked Services */}
          {activeTab === "bookedServices" && (
            <div className="tab-pane fade active show" id="bookedServices">
              <div className="Small-Wrapper">
                <div className="TitleBox">
                  <h4 className="Title">Booked Services</h4>
                </div>
                <div className="TableList">
                  <table>
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Booked Service Category</th>
                        <th>Sub Category</th>
                        <th>Vendor Name</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>Next milestone update.</tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Subscriptions */}
          {activeTab === "subscriptions" && (
            <div className="tab-pane fade active show" id="subscriptions">
              <div className="Small-Wrapper">
                <div className="TitleBox">
                  <h4 className="Title">Subscriptions</h4>
                </div>
                <div className="TableList">
                  <table>
                    <thead>
                      <tr>
                        <th>Subscription Plan</th>
                        <th>Tenure</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>Next milestone update.</tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerView;
