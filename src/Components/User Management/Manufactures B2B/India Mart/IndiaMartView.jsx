import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import {
  deleteManufacturerProduct,
  fetchProductDetail,
} from "../../../../reduxToolkit/Slices/Manufacture";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";

const IndiaMartView = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data } = location.state || {};
  const productDetail = useSelector(
    (state) => state.manufacture?.productDetail
  );
  console.log(productDetail);
  const [deleteId, setDeleteId] = useState(null);
  const manufacturerId = data?._id;
  const [searchQuery, setSearchQuery] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const [activePage, updateActivePage] = useState(1);
  const [status, setStatus] = useState("true");

  const [activeTab, setActiveTab] = useState("personalDetails");
  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (!manufacturerId) return;

    dispatch(
      fetchProductDetail({
        manufacturerId,
        section: tab,
        searchQuery,
        status,
      })
    )
      .unwrap()
      .catch(() => toast.error("Failed to fetch data"));
  };

  useEffect(() => {
    dispatch(
      fetchProductDetail({
        section: activeTab,
        page: activePage,
        searchQuery,
        status,
        manufacturerId,
      })
    );
  }, [dispatch, activePage, searchQuery, status, activeTab]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setActiveModal("deleteProduct");
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setDeleteId(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteId) return;
    dispatch(deleteManufacturerProduct(deleteId))
      .unwrap()
      .then(() => {
        dispatch(
          fetchProductDetail({
            page: activePage,
            searchQuery,
            status,
            manufacturerId,
            section: activeTab,
          })
        );
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Failed to delete sub admin:", err);
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    updateActivePage(1);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    updateActivePage(1);
  };

  return (
    <div className="WrapperArea jd-buisness-service">
      <div className="WrapperBox">
        {/* Breadcrumbs */}
        <nav aria-label="breadcrumb" className="breadcrumbs">
          <NavLink to="/manufactureList" className="greyborder">
            <i className="fa-solid fa-arrow-left arrow-icon" />
            <p>Go Back</p>
          </NavLink>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to="/manufactureList">User Management</NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink to="/manufactureList">Manufacturers B2B</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <NavLink to="/manufactureList">IndiaMart</NavLink>
            </li>
          </ol>
        </nav>

        {/* Tabs Navigation */}
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
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "enquiries" ? "active" : ""
                }`}
                onClick={() => handleTabClick("enquiries")}
              >
                Enquiries
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "advertisements" ? "active" : ""
                }`}
                onClick={() => handleTabClick("advertisements")}
              >
                Advertisements
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

        {/* Tab Content */}
        <div className="tab-content">
          {/* PERSONAL DETAILS TAB */}
          {activeTab === "personalDetails" && (
            <div
              className="tab-pane fade active show"
              id="services-personalDetails"
            >
              <div className="Small-Wrapper pb-0">
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
                            <i className="fa fa-user" /> Name
                          </label>
                          <span>{data?.name || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i className="fa fa-phone" /> Phone Number
                          </label>
                          <span>{data?.phone || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i className="fa fa-whatsapp" /> WhatsApp Number
                          </label>
                          <span>{data?.whatsAppNumber || "N/A"}</span>
                        </p>
                        <p>
                          <span className="heading-divide3">
                            <i className="fa fa-briefcase" /> Business Details
                          </span>
                        </p>
                        <p>
                          <label>
                            <i className="fa fa-building" /> Company Name
                          </label>
                          <span>{data?.businInfo?.businessName || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i className="fa fa-envelope" /> Email
                          </label>
                          <span>{data?.businInfo?.businessEmail || "N/A"}</span>
                        </p>
                        <p>
                          <label>
                            <i className="fa fa-map-marker" /> Address
                          </label>
                          <span>{data?.businInfo?.city || "N/A"}</span>
                        </p>
                      </li>
                    </ul>
                  </aside>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCT DETAILS TAB */}
          {activeTab === "productDetails" && (
            <div
              className="tab-pane fade active show"
              id="services-product-details"
            >
              <div className="Small-Wrapper">
                <div className="TitleBox">
                  <h4 className="Title">Products</h4>
                </div>
                {/* <div className="FilterArea">
                  <div className="FilterLeft">
                    <div className="form-group">
                      <label>Search</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by location or service name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>
                  </div>
                  <div className="FilterRight">
                    <div className="form-group">
                      <label>Sort By</label>
                      <select
                        className="form-control"
                        value={status}
                        onChange={handleStatusChange}
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div> */}

                <div className="TableList">
                  <table>
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Service Category</th>
                        <th>Enquiries</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {productDetail?.[0]?.data?.length > 0 ? (
                      productDetail[0].data.map((item) => (
                        <tr key={item._id}>
                          <td>{item.productName || "N/A"}</td>
                          <td>{item.productPrice || "N/A"}</td>
                          <td>{item.enqiries || "N/A"}</td>
                          <td>{item.active ? "Active" : "Inactive"}</td>
                          <td>
                              <NavLink
                                to="/manufactureList/indiamartview/IMDetail"
                                state={item}
                                className="Blue"
                                style={{ color: "#2196f3" }}
                              >
                                <i className="fa fa-eye" aria-hidden="true"></i>
                              </NavLink>
                              <a
                                className="Red"
                                onClick={() => handleDelete(item._id)}
                                style={{ color: "#f44336", cursor: "pointer" }}
                              >
                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No Data Found</td>
                      </tr>
                    )}
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ENQUIRIES TAB */}
          {activeTab === "enquiries" && (
            <div className="tab-pane fade active show" id="services-enquiries">
              <div className="Small-Wrapper">
                <div className="TitleBox">
                  <h4 className="Title">Ad Enquiries</h4>
                </div>
                <div className="TableList">
                  <table>
                    <thead>
                      <tr>
                        <th>Grievance ID</th>
                        <th>Farmer Name</th>
                        <th>Service Category</th>
                        <th>Product Name</th>
                        <th>Farm Location</th>
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

          {/* ADVERTISEMENTS TAB */}
          {activeTab === "advertisements" && (
            <div
              className="tab-pane fade active show"
              id="services-advertisements"
            >
              <div className="Small-Wrapper">
                <div className="TitleBox">
                  <h4 className="Title">Advertisements</h4>
                </div>
                <div className="TableList">
                  <table>
                    <thead>
                      <tr>
                        <th>Banner ID</th>
                        <th>Banner Title</th>
                        <th>Clicks</th>
                        <th>Views</th>
                        <th>Enquiries</th>
                        <th>Action</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>Next milestone update.</tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SUBSCRIPTIONS TAB */}
          {activeTab === "subscriptions" && (
            <div
              className="tab-pane fade active show"
              id="services-subscriptions"
            >
              <div className="Small-Wrapper">
                <div className="TitleBox">
                  <h4 className="Title">Subscriptions</h4>
                  <a className="TitleLink" href="#">
                    Add Subscription
                  </a>
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
      <Modal show={activeModal === "deleteProduct"} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete Product?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IndiaMartView;
