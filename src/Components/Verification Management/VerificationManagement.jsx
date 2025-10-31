import React, { useState, useEffect } from "react";
import { fetchManufacture } from "../../reduxToolkit/Slices/Manufacture";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { toast, ToastContainer } from "react-toastify";
import { approveProviderByAdmin } from "../../reduxToolkit/Slices/VerificationManagement";

const VerificationManagement = () => {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("IM");
  const [activePageIM, setActivePageIM] = useState(1);
  const [activePageJD, setActivePageJD] = useState(1);
  const [pageCountIM, setPageCountIM] = useState(1);
  const [pageCountJD, setPageCountJD] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("active");
  const adminApproval = "false";
  const { success, error, message } = useSelector(
    (state) => state.verification
  );
  const { manufactures, loading } = useSelector((state) => state.manufacture);
  const [indiaMartData, setIndiaMartData] = useState([]);
  const [justDialData, setJustDialData] = useState([]);

  const handleAction = (providerId, adminApproval) => {
    const approvalBool = adminApproval === "true" || adminApproval === true;

    dispatch(
      approveProviderByAdmin({ providerId, adminApproval: approvalBool })
    ).then((res) => {
      if (res?.payload?.success && approvalBool) {
        // Determine which section the approval is for
        const section =
          activeTab === "IM"
            ? "India Mart"
            : activeTab === "JD"
            ? "Just Dial"
            : "";

        // Show toast for the correct section
        if (section) {
          toast.success(`${section} provider has been successfully approved`);
        }

        // Fetch updated data
        const page = activeTab === "IM" ? activePageIM : activePageJD;
        const apiSection =
          activeTab === "IM"
            ? "india_mart"
            : activeTab === "JD"
            ? "just_dial"
            : "";

        dispatch(
          fetchManufacture({
            page,
            searchQuery,
            section: apiSection,
            status,
            adminApproval: false,
          })
        ).then((res) => {
          if (res?.payload?.data?.length) {
            const result = res.payload.data[0];
            if (apiSection === "india_mart") {
              setIndiaMartData(result.data);
              const total = result.metadata?.[0]?.total || 0;
              setPageCountIM(Math.max(1, Math.ceil(total / 10)));
            } else if (apiSection === "just_dial") {
              setJustDialData(result.data);
              const total = result.metadata?.[0]?.total || 0;
              setPageCountJD(Math.max(1, Math.ceil(total / 10)));
            }
          }
        });
      }
    });
  };

  useEffect(() => {
    const section =
      activeTab === "IM" ? "india_mart" : activeTab === "JD" ? "just_dial" : "";

    const page = activeTab === "IM" ? activePageIM : activePageJD;

    dispatch(
      fetchManufacture({ page, searchQuery, section, status, adminApproval })
    ).then((res) => {
      if (res?.payload?.data?.length) {
        const result = res.payload.data[0];
        if (section === "india_mart") {
          setIndiaMartData(result.data);
          const total = result.metadata?.[0]?.total || 0;
          setPageCountIM(Math.max(1, Math.ceil(total / 10)));
        } else if (section === "just_dial") {
          setJustDialData(result.data);
          const total = result.metadata?.[0]?.total || 0;
          setPageCountJD(Math.max(1, Math.ceil(total / 10)));
        }
      }
    });
  }, [
    dispatch,
    activePageIM,
    activePageJD,
    searchQuery,
    activeTab,
    status,
    adminApproval,
  ]);

  const handlePageClickIM = (data) => {
    setActivePageIM(data.selected + 1);
  };

  const handlePageClickJD = (data) => {
    setActivePageJD(data.selected + 1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setActivePageIM(1);
    setActivePageJD(1);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setActivePageIM(1);
    setActivePageJD(1);
  };

  const activeData = activeTab === "IM" ? indiaMartData : justDialData;
  const activePageCount = activeTab === "IM" ? pageCountIM : pageCountJD;
  const activePageNumber = activeTab === "IM" ? activePageIM : activePageJD;

  return (
    <div className="WrapperArea">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="WrapperBox">
        <nav aria-label="breadcrumb" className="breadcrumbs">
          <NavLink to="/dashboard" className="greyborder">
            <i className="fa-solid fa-arrow-left arrow-icon" />
            <p>Go Back</p>
          </NavLink>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            {/* <li className="breadcrumb-item">
              <NavLink to="/manufactureList">User Management</NavLink>
            </li> */}
            <li className="breadcrumb-item active" aria-current="page">
              <a href="#">Verification Management</a>
            </li>
          </ol>
        </nav>

        <div className="TitleBox">
          <h4 className="Title">Verification Management</h4>
        </div>

        {/* Tabs */}
        <div className="CommonTabs">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "IM" ? "active" : ""}`}
                onClick={() => setActiveTab("IM")}
              >
                IndiaMart
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "JD" ? "active" : ""}`}
                onClick={() => setActiveTab("JD")}
              >
                Just Dial
              </button>
            </li>
          </ul>
        </div>

        <div className="Small-Wrapper">
          <div className="FilterArea">
            <div className="FilterLeft">
              <div className="form-group">
                <label>Search</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="FilterRight">
              <div className="form-group">
                <label>Sort</label>
                <select
                  className="form-control"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <option value="active">Active Users</option>
                  <option value="inactive">Deactivated Users</option>
                </select>
              </div>
            </div>
          </div>

          <div className="TableList">
            <table>
              <thead>
                <tr>
                  {activeTab === "IM" ? (
                    <>
                      <th>Manufacturer Name</th>
                      <th>Phone Number</th>
                      <th>Business Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </>
                  ) : (
                    <>
                      <th>Business Name</th>
                      <th>Contact Person</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Action</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {activeData?.length > 0 ? (
                  activeData.map((item, index) => (
                    <tr key={index}>
                      {activeTab === "IM" ? (
                        <>
                          <td>{item.name || "N/A"}</td>
                          <td>{item.phone || "N/A"}</td>
                          <td>{item?.businInfo?.businessName || "N/A"}</td>
                          <td>{item.status || "N/A"}</td>
                          <td>
                            <div className="Actions">
                              <button
                                className="tickbutton"
                                onClick={() => handleAction(item._id, "true")}
                              >
                                <i className="fa-solid fa-check" />
                              </button>

                              {/* <button
                                className="crossbutton"
                                onClick={() =>
                                  handleAction(item._id, "disapprove")
                                }
                              >
                                <i className="fa-solid fa-xmark" />
                              </button> */}
                              <NavLink
                                to={"/verification/verificationIm"}
                                className="Blue"
                                state={item}
                              >
                                <i className="fa fa-eye" aria-hidden="true" />
                              </NavLink>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{item?.businInfo?.businessName || "N/A"}</td>
                          <td>{item.name || "N/A"}</td>
                          <td>{item.email || "N/A"}</td>
                          <td>{item.phone || "N/A"}</td>
                          <td>{item.address || "N/A"}</td>
                          <td>{item.status || "N/A"}</td>
                          <td>
                            <div className="Actions">
                              <button
                                className="tickbutton"
                                onClick={() => handleAction(item._id, "true")}
                              >
                                <i className="fa-solid fa-check" />
                              </button>

                              {/* <button
                                className="crossbutton"
                                onClick={() =>
                                  handleAction(item._id, "disapprove")
                                }
                              >
                                <i className="fa-solid fa-xmark" />
                              </button> */}
                              <NavLink
                                to={"/verification/verificationJD"}
                                className="Blue"
                                state={item}
                              >
                                <i className="fa fa-eye" aria-hidden="true" />
                              </NavLink>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>
                      No Manufacture Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="PaginationBox">
            <div className="PaginationLeft">
              <p>
                Total Records : <span>{activeData?.length || 0}</span>
              </p>
            </div>
            <div className="PaginationRight">
              {activePageCount > 1 && (
                <ReactPaginate
                  pageCount={activePageCount}
                  forcePage={activePageNumber - 1}
                  onPageChange={
                    activeTab === "IM" ? handlePageClickIM : handlePageClickJD
                  }
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationManagement;
