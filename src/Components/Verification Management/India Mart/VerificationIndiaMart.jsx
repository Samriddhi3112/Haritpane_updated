import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { fetchVerificationProduct } from "../../../reduxToolkit/Slices/VerificationManagement";
import { useDispatch, useSelector } from "react-redux";

const VerificationInServices = () => {
  const dispatch = useDispatch();
  const state = useLocation();
  console.log(state);
  const productDetail = useSelector((state) => state?.verification);
  console.log(productDetail);
  const [activePage, updateActivePage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const providerId = state?.state?._id;
  const [activeTab, setActiveTab] = useState("personalDetails");

  useEffect(() => {
    dispatch(
      fetchVerificationProduct({ page: activePage, searchQuery, providerId })
    );
  }, [dispatch, activePage, searchQuery, providerId]);

  return (
    <div className="WrapperArea jd-buisness-service">
      <div className="WrapperBox">
        <nav aria-label="breadcrumb" className="breadcrumbs">
          <NavLink to="/verification" className="greyborder">
            <i className="fa-solid fa-arrow-left arrow-icon" />
            <p>Go Back</p>
          </NavLink>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to="/verification">Verification Management</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <span>IndiaMart Details</span>
            </li>
          </ol>
        </nav>

        {/* Tabs */}
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
                  activeTab === "productDetails" ? "active" : ""
                }`}
                onClick={() => setActiveTab("productDetails")}
              >
                Product Details
              </button>
            </li>
          </ul>
        </div>

        <div className="tab-content">
          {activeTab === "personalDetails" && (
            <div
              className="tab-pane fade active show"
              id="services-personalDetails"
            >
              <div className="Small-Wrapper pb-0">
                <div className="TitleBox">
                  <h4 className="Title">
                    <i className="fa fa-address-book-o" aria-hidden="true" />{" "}
                    Personal Details
                  </h4>
                </div>
                <div
                  className="AdminActivity"
                  id="infoDivImServicesPersonalDetails"
                >
                  <aside>
                    <ul>
                      <li>
                        <p>
                          <label>
                            <i className="fa fa-user" aria-hidden="true" /> Name
                          </label>
                          <span>{state.state.name || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i className="fa fa-phone" aria-hidden="true" />{" "}
                            Phone Number
                          </label>
                          <span>{state.state.phone || "N/A"}</span>
                        </p>
                        <p>
                          <span className="heading-divide3">
                            <i className="fa fa-briefcase" aria-hidden="true" />{" "}
                            Business Details
                          </span>
                        </p>
                        <p>
                          <label>
                            <i className="fa fa-building" aria-hidden="true" />{" "}
                            Business / Shop / Company Name
                          </label>
                          <span>{state.state?.businInfo?.businessName || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i className="fa-solid fa-envelope" /> Business
                            Email Address
                          </label>
                          <span>{state.state?.businInfo?.businessEmail || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i className="fa-solid fa-file" /> GST/PAN Number
                          </label>
                          <span>{state?.state?.gstNumber || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i
                              className="fa fa-map-marker"
                              aria-hidden="true"
                            />{" "}
                            Address
                          </label>
                          <span>{state.state?.businInfo?.city || "N/A"}</span>
                        </p>
                      </li>
                    </ul>
                  </aside>
                </div>
              </div>
            </div>
          )}

          {activeTab === "productDetails" && (
            <div
              className="tab-pane fade active show"
              id="services-product-details"
            >
              <div className="Small-Wrapper">
                <div className="TitleBox">
                  <h4 className="Title">Products</h4>
                </div>
                <div className="TableList">
                  <table>
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Service Category</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productDetail?.verification?.length > 0 ? (
                        productDetail.verification.map((item, index) => (
                          <tr key={item._id || index}>
                            <td>{item.productName || "N/A"}</td>
                            <td>{item.category || "N/A"}</td>
                            <td>
                              <div
                                className="Actions"
                                style={{ display: "flex", gap: "8px" }}
                              >
                                <NavLink
                                  to="/verification/verificationIm/viewDetailIM"
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
                        <tr key="no-data">
                          <td
                            colSpan="7"
                            style={{ textAlign: "center", padding: "10px" }}
                          >
                            No Data Found
                          </td>
                        </tr>
                      )}
                    </tbody>
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

export default VerificationInServices;
