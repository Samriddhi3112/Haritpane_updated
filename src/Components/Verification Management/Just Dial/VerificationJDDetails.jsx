import React from "react";
import { NavLink } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const VerificationJDDetails = () => {
  const state = useLocation();

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <nav aria-label="breadcrumb" className="breadcrumbs">
          {/* <NavLink to="/verification" className="greyborder">
            <i className="fa-solid fa-arrow-left arrow-icon" />
            <p>Go Back</p>
          </NavLink> */}
        </nav>
        <div className="TitleBox">
          <h4 className="Title">Product Details Page</h4>
        </div>
        <div className="view-details-ad">
          <div className="Small-Wrapper pb-0">
            <div className="AdminActivity" id="infoDivJdProdcutDetailService">
              <aside>
                <ul>
                  <li>
                    <p className="d-flex">
                      <label className="afterCustom">Service Category</label>
                      <span>{state?.state?.createdBy || "N/A"}</span>
                    </p>
                  </li>
                  <li>
                    <p className="d-flex">
                      <label className="afterCustom">Service Image</label>
                      <span>
                        {state?.state?.productImage && state?.state?.productImage.length > 0 && (
                          <img
                            src={state?.state?.productImage[0]}
                            alt={"image"}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                              borderRadius: "8px",
                            }}
                          />
                        )}
                      </span>
                    </p>
                  </li>
                </ul>
              </aside>
            </div>
            <div className="AdminActivity" id="myFormJdProdcutDetailService">
              <aside>
                <form action>
                  <div className="CommonForm">
                    <div className="row">
                      <div className="form-group col-6">
                        <label>Service Category</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Your Service Category"
                        />
                      </div>
                      <div className="form-group col-6" />
                      <div className="form-group col-6">
                        <label>Service Image </label>
                        <div className="UploadBox">
                          <div className="Upload">
                            <i className="fa fa-upload" /> <span>Upload </span>
                            <input type="file" />
                          </div>
                        </div>
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
    </div>
  );
};

export default VerificationJDDetails;
