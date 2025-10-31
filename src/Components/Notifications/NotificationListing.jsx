import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {NavLink} from "react-bootstrap";

const NotificationListing = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <nav aria-label="breadcrumb" className="breadcrumbs">
            <NavLink to="/dashboard" className="greyborder">
            <i className="fa-solid fa-arrow-left arrow-icon" />
            <p>Go Back</p>
            </NavLink>
            {/* <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="dashboard.html">Dashboard</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <a href="notifications.html">Notification</a>
              </li>
            </ol> */}
          </nav>
          <div className="TitleBox">
            <h4 className="Title">Notification Management</h4>
            <a
              onClick={handleShow}
              className="TitleLink"
              style={{ cursor: "pointer" }}
            >
              Add New Notification
            </a>
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
                  <label>User Type</label>
                  <select className="form-control">
                    <option>All Users</option>
                    <option>Specific Users</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Notification Type</label>
                  <select className="form-control">
                    <option>Warning Messages</option>
                    <option>General Notification</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="TableList">
              <table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Notification Title</th>
                    <th>Notification Type</th>
                    <th>Sent To</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  Next milestone update.
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Notification</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Notification Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" placeholder="Enter description" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notification Type</Form.Label>
              <Form.Select>
                <option>Warning Messages</option>
                <option>General Notifications</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>User Type</Form.Label>
              <Form.Select>
                <option>All Users</option>
                <option>Specific Users</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success">Add Notification</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NotificationListing;
