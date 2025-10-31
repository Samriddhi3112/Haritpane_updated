import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SubscriptionListing = () => {
  return (
    <div className="WrapperArea">
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
            <li className="breadcrumb-item active" aria-current="page">
              <NavLink to="subscriptions">Subscriptions</NavLink>
            </li>
          </ol>
        </nav>
        <div className="TitleBox">
          <h4 className="Title">Subscriptions</h4>
          <NavLink
            className="TitleLink"
            data-toggle="modal"
            data-target="#UploadModal"
          >
            Add Subscription
          </NavLink>
        </div>
        <div className="Small-Wrapper">
          <div className="FilterArea">
            <div className="FilterLeft">
              <div className="form-group">
                <label>Search</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by location,name of services"
                />
              </div>
              {/* <div class="form-group">
                          <label>From Date</label>
                          <input type="date" class="form-control">
                      </div> 
                      <div class="form-group">
                          <label>To Date</label>
                          <input type="date" class="form-control">
                      </div>
                      <div class="form-group">
                          <label>&nbsp;</label>
                          <button class="Button">Apply</button>
                          <button class="Button Cancel"><i class="fa fa-refresh"></i></button>
                      </div> */}
            </div>
            <div className="FilterRight">
              <div className="form-group">
                <label>&nbsp;</label>

                <NavLink to="#" className="Button" download>
                  <span className="download">
                    <img src="images/download.png" alt />
                  </span>
                  Export CSV
                </NavLink>
              </div>
              <div className="form-group">
                <label>Sort</label>
                <select className="form-control">
                  <option>Active</option>
                  <option>In Active</option>
                </select>
              </div>
            </div>
          </div>
          <div className="TableList">
            <table>
              <thead>
                <tr>
                  <th>Subscription Plan</th>
                  <th>Subscribers</th>
                  <th>Tenure</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                Next milestone update.
                </tbody>
            </table>
          </div>
          <div className="PaginationBox">
            <div className="PaginationLeft">
              <p>
                Total Records : <span>200</span>
              </p>
            </div>
            <div className="PaginationRight">
              <ul>
                <li>
                  <NavLink to="javascript:void(0);">
                    <i className="fa fa-angle-double-left" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="javascript:void(0);">
                    <i className="fa fa-angle-left" />
                  </NavLink>
                </li>
                <li className="active">
                  <NavLink to="javascript:void(0);">1</NavLink>
                </li>
                <li>
                  <NavLink to="javascript:void(0);">2</NavLink>
                </li>
                <li>
                  <NavLink to="javascript:void(0);">3</NavLink>
                </li>
                <li>
                  <NavLink to="javascript:void(0);">
                    <i className="fa fa-angle-right" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="javascript:void(0);">
                    <i className="fa fa-angle-double-right" />
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionListing;