import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { fetchServices } from "../../../reduxToolkit/Slices/OnlineServiceProvider";
import { useDispatch, useSelector } from "react-redux";

const OnlineServiceProvidersView = () => {
  const dispatch = useDispatch();
  const [activePage, updateActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [status, setStatus] = useState("active");
  const state = useLocation();
  console.log(state);
  const Services = useSelector((state) => state.onlineServiceProvider.services);
  console.log(Services);
  const providerId = state.state._id || "N/A";

  const [activeTab, setActiveTab] = useState("personalDetails");

  const coordinates = state?.state?.location?.coordinates || [];

  useEffect(() => {
    dispatch(
      fetchServices({ page: activePage, searchQuery, status, providerId })
    );
  }, [dispatch, activePage, searchQuery, status, providerId]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <nav aria-label="breadcrumb" className="breadcrumbs">
          <NavLink to="/onlineServiceProvider" className="greyborder">
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
            <li className="breadcrumb-item" aria-current="page">
              <NavLink to="/onlineServiceProvider">
                Online Service Providers
              </NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Online Service Provider Details
            </li>
          </ol>
        </nav>

        <div className="TitleBox">
          <h4 className="Title mb-2">Online Service Provider Details</h4>
        </div>

        <div className="CommonTabs">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "personalDetails" ? "active" : ""
                }`}
                onClick={() => handleTabClick("personalDetails")}
              >
                Personal Details
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "serviceBooking" ? "active" : ""
                }`}
                onClick={() => handleTabClick("serviceBooking")}
              >
                Service Bookings
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "services" ? "active" : ""
                }`}
                onClick={() => handleTabClick("services")}
              >
                Services
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "subscriptions" ? "active" : ""
                }`}
                onClick={() => handleTabClick("subscriptions")}
              >
                Subscriptions
              </button>
            </li>
          </ul>
        </div>

        <div className="tab-content">
          {activeTab === "personalDetails" && (
            <div className="tab-pane fade active show" id="personalDetails">
              <div className="Small-Wrapper pb-0">
                <div className="TitleBox">
                  <h4 className="Title">
                    <i className="fa fa-address-book" aria-hidden="true" />
                    Personal Details
                  </h4>
                </div>
                <div className="AdminActivity">
                  <aside id="infoDivOSPDPERSONAL">
                    <ul>
                      <li>
                        <p className="d-flex">
                          <label className="afterCustom">
                            <i className="fa fa-user" aria-hidden="true" />
                            Service Provider Name
                          </label>
                          <span>{state.state?.name || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i className="fa fa-phone" aria-hidden="true" />{" "}
                            Phone Number
                          </label>
                          <span>{state.state?.phone || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i className="fa fa-envelope" aria-hidden="true" />
                            Email Address
                          </label>
                          <span>{state.state?.email || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i
                              className="fa fa-address-card"
                              aria-hidden="true"
                            />
                            Address
                          </label>
                          <span>{state.state?.address || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i className="fa fa-language" aria-hidden="true" />
                            Chosen Language
                          </label>
                          <span>{state.state?.languageSelector || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i className="fa fa-file-text" aria-hidden="true" />
                            Experience
                          </label>
                          <span>{"N/A"}</span>
                        </p>
                        <label className="enquiry-heading">About</label>
                        <p className="mb-3">
                          <span>{"N/A"}</span>
                        </p>
                      </li>
                    </ul>
                  </aside>
                </div>
              </div>
            </div>
          )}

          {activeTab === "serviceBooking" && (
            <div className="tab-pane fade active show" id="serviceBooking">
              <div className="Small-Wrapper">
                <div className="TitleBox">
                  <h4 className="Title">Booked Services</h4>
                </div>
                <div className="TableList">
                  <table>
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Service Name</th>
                        <th>Sub Category Name</th>
                        <th>Farmer Name</th>
                        <th>Location</th>
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

          {activeTab === "services" && (
            <div className="tab-pane fade active show" id="services">
              <div className="Small-Wrapper">
                <div className="TitleBox">
                  <h4 className="Title">Services</h4>
                </div>
                <div className="TableList">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr.No.</th>
                        <th>Service Category</th>
                        <th>Sub Service</th>
                        <th>Location</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Services?.data && Services.data.length > 0 ? (
                        Services.data.map((item, index) => (
                          <tr key={item._id || index}>
                            <td>{index + 1}</td>
                            <td>{item?.categoryDetails?.name || "N/A"}</td>
                            <td>{item?.selectSubCategory || "N/A"}</td>
                            <td>{state?.state?.address || "N/A"}</td>
                            <td>
                              <div
                                className="Actions"
                                style={{ display: "flex", gap: "8px" }}
                              >
                                <NavLink
                                  to="/onlineServiceProvider/serviceViewDetail"
                                  state={item}
                                  className="Blue"
                                  style={{ color: "#2196f3" }}
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </NavLink>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            style={{ textAlign: "center", padding: "10px" }}
                          >
                            No Services Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "subscriptions" && (
            <div className="tab-pane fade active show" id="subscriptions">
              <div className="Small-Wrapper">
                <div className="TitleBox">
                  <h4 className="Title">Subscriptions</h4>
                  {/* <button className="TitleLink">Add Subscription</button> */}
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

export default OnlineServiceProvidersView;
