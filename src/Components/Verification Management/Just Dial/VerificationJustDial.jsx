import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { fetchVerificationProduct } from "../../../reduxToolkit/Slices/VerificationManagement";
import { useDispatch, useSelector } from "react-redux";

const VerificationJustDial = () => {
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="WrapperArea jd-buisness-service">
      <div className="WrapperBox">
        {/* Breadcrumb */}
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
              <NavLink to="#">Just Dial</NavLink>
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
                onClick={() => handleTabClick("personalDetails")}
              >
                Personal Details
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "productDetails" ? "active" : ""
                }`}
                onClick={() => handleTabClick("productDetails")}
              >
                Product Details
              </button>
            </li>
          </ul>
        </div>

        {/* Tab Contents */}
        <div className="tab-content">
          {/* PERSONAL DETAILS */}
          {activeTab === "personalDetails" && (
            <div
              className="tab-pane fade active show"
              id="services-personalDetails"
            >
              <div className="Small-Wrapper pb-0" id="infoDivJdPersonalDetails">
                <div className="AdminActivity">
                  <div className="TitleBox">
                    <h4 className="Title">
                      <i className="fa fa-address-book" aria-hidden="true" />{" "}
                      Personal Details
                    </h4>
                  </div>
                  <aside>
                    <ul>
                      <li>
                        <p>
                          <label>
                            <i className="fa fa-user" aria-hidden="true" /> Name
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
                            <i className="fa fa-whatsapp" aria-hidden="true" />{" "}
                            Whatsapp Phone Number
                          </label>
                          <span>{state.state?.whatsAppNumber || "N/A"}</span>
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
                          <span>{state.state?.businessName || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i
                              className="fa fa-envelope"
                              aria-hidden="true"
                            />{" "}
                            Business Email Address
                          </label>
                          <span>{state.state?.businessEmail || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i
                              className="fa fa-map-marker"
                              aria-hidden="true"
                            />{" "}
                            Address
                          </label>
                          <span>{state.state?.address || "N/A"}</span>
                        </p>
                      </li>
                    </ul>
                  </aside>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCT DETAILS */}
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
                        <th>Service Category</th>
                        <th>Image</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productDetail?.verification?.length > 0 ? (
                        productDetail.verification.map((item, index) => (
                          <tr key={item._id || index}>
                            <td>{item.createdBy || "N/A"}</td>
                            <td>
                              {item.productImage && item.productImage.length > 0
                                ? item.productImage.map((img, index) => (
                                    <img
                                      key={index}
                                      src={img}
                                      alt={`${item.productName}-${index}`}
                                      style={{
                                        width: "60px",
                                        height: "60px",
                                        objectFit: "cover",
                                        borderRadius: "6px",
                                        marginRight: "5px",
                                      }}
                                    />
                                  ))
                                : "N/A"}
                            </td>

                            <td>
                              <div
                                className="Actions"
                                style={{ display: "flex", gap: "8px" }}
                              >
                                <NavLink
                                  to="/verification/verificationJD/viewDetailJD"
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

                {/* <div className="PaginationBox">
                  <div className="PaginationLeft">
                    <p>
                      Total Records : <span>200</span>
                    </p>
                  </div>
                  <div className="PaginationRight">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fa fa-angle-double-left" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-angle-left" />
                        </a>
                      </li>
                      <li className="active">
                        <a href="#">1</a>
                      </li>
                      <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-angle-right" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-angle-double-right" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationJustDial;
