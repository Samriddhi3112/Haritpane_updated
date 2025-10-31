import React from 'react'

const ComplaintsListings = () => {
  return (
    <div className="WrapperArea">
  <div className="WrapperBox">
    <nav aria-label="breadcrumb" className="breadcrumbs">
      <a href="dashboard.html" className="greyborder"><i className="fa-solid fa-arrow-left arrow-icon" />
        <p>Go Back</p>
      </a>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="dashboard.html">Dashboard</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          <a href="complaints.html">Complaints Management </a>
        </li>
      </ol>
    </nav>
    <div className="TitleBox">
      <h4 className="Title">Complaints Management</h4>
    </div>
    <div className="CommonTabs">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" data-toggle="tab" href="#Complaints">Complaints</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#AddEnquires">Ad Enquires</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#Reviews">Reviews</a>
        </li>
      </ul>
    </div>
    <div className="tab-content">
      <div className="tab-pane active" id="Complaints">
        <div className="TitleBox">
          <h4 className="Title">Complaints</h4>
        </div>
        <div className="Small-Wrapper">
          <div className="FilterArea">
            <div className="FilterLeft">
              <div className="form-group">
                <label>Search</label>
                <input type="text" className="form-control" placeholder="Search by location,name of services" />
              </div>
              <div className="form-group">
                <label>&nbsp;</label>
                <a href="#" className="Button" download>
                  <span className="download"><img src="images/download.png" alt /></span>
                  Export CSV
                </a>
              </div>
            </div>
          </div>
          <div className="TableList">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Grievance ID</th>
                  <th>Farmer Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                Next milestone update.
              </tbody>
            </table>
          </div>
          <div className="PaginationBox">
            <div className="PaginationLeft">
              <p>Total Records : <span>200</span></p>
            </div>
            <div className="PaginationRight">
              <ul>
                <li>
                  <a href="javascript:void(0);"><i className="fa fa-angle-double-left" /></a>
                </li>
                <li>
                  <a href="javascript:void(0);"><i className="fa fa-angle-left" /></a>
                </li>
                <li className="active"><a href="javascript:void(0);">1</a></li>
                <li><a href="javascript:void(0);">2</a></li>
                <li><a href="javascript:void(0);">3</a></li>
                <li>
                  <a href="javascript:void(0);"><i className="fa fa-angle-right" /></a>
                </li>
                <li>
                  <a href="javascript:void(0);"><i className="fa fa-angle-double-right" /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-pane fade" id="AddEnquires">
        <div className="TitleBox">
          <h4 className="Title">Enquires</h4>
        </div>
        <div className="Small-Wrapper">
          <div className="FilterArea">
            <div className="FilterLeft">
              <div className="form-group">
                <label>Search</label>
                <input type="text" className="form-control" placeholder="Search by location,name of services" />
              </div>
            </div>
          </div>
          <div className="TableList">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Grievance ID</th>
                  <th>Farmer Name</th>
                  <th>Chat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>06/05/2025</td>
                  <td><a href="#">#12345</a></td>
                  <td>Rahul Kumar</td>
                  <td>
                    <a href="Ad-Enquires-chat.html">
                      <i className="fa fa-whatsapp" aria-hidden="true" /></a>
                  </td>
                </tr>
                <tr>
                  <td>06/05/2025</td>
                  <td><a href="#">#12345</a></td>
                  <td>Rahul Kumar</td>
                  <td>
                    <a href="Ad-Enquires-chat.html">
                      <i className="fa fa-whatsapp" aria-hidden="true" /></a>
                  </td>
                </tr>
                <tr>
                  <td>06/05/2025</td>
                  <td><a href="#">#12345</a></td>
                  <td>Rahul Kumar</td>
                  <td>
                    <a href="Ad-Enquires-chat.html">
                      <i className="fa fa-whatsapp" aria-hidden="true" /></a>
                  </td>
                </tr>
                <tr>
                  <td>06/05/2025</td>
                  <td><a href="#">#12345</a></td>
                  <td>Rahul Kumar</td>
                  <td>
                    <a href="Ad-Enquires-chat.html">
                      <i className="fa fa-whatsapp" aria-hidden="true" /></a>
                  </td>
                </tr>
                <tr>
                  <td>06/05/2025</td>
                  <td><a href="#">#12345</a></td>
                  <td>Rahul Kumar</td>
                  <td>
                    <a href="Ad-Enquires-chat.html">
                      <i className="fa fa-whatsapp" aria-hidden="true" /></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="PaginationBox">
            <div className="PaginationLeft">
              <p>Total Records : <span>200</span></p>
            </div>
            <div className="PaginationRight">
              <ul>
                <li>
                  <a href="javascript:void(0);"><i className="fa fa-angle-double-left" /></a>
                </li>
                <li>
                  <a href="javascript:void(0);"><i className="fa fa-angle-left" /></a>
                </li>
                <li className="active"><a href="javascript:void(0);">1</a></li>
                <li><a href="javascript:void(0);">2</a></li>
                <li><a href="javascript:void(0);">3</a></li>
                <li>
                  <a href="javascript:void(0);"><i className="fa fa-angle-right" /></a>
                </li>
                <li>
                  <a href="javascript:void(0);"><i className="fa fa-angle-double-right" /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-pane fade" id="Reviews">
        <div className="TitleBox">
          <h4 className="Title">Reviews</h4>
        </div>
        <div className="Small-Wrapper">
          <div className="FilterArea">
            <div className="FilterLeft">
              <div className="form-group">
                <label>Search</label>
                <input type="text" className="form-control" placeholder="Search by location,name of services" />
              </div>
            </div>
            <div className="FilterRight">
              <div className="form-group">
                <label>Customer Type</label>
                <select className="form-control">
                  <option>Farmer</option>
                  <option>Corporate</option>
                </select>
              </div>
            </div>
          </div>
          <div className="TableList">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Customer Type</th>
                  <th>Vendor Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>06/05/2025</td>
                  <td>Ravi Kumar</td>
                  <td>Farmer</td>
                  <td>GreenGrow Agro Services</td>
                  <td>
                    <div className="Actions">
                      <a className="Blue" href data-toggle="modal" data-target="#ReviewModal">
                        <i className="fa fa-eye" aria-hidden="true" />
                      </a>
                      <a className="Red" data-toggle="modal" data-target="#DeleteReview">
                        <i className="fa fa-trash" aria-hidden="true" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>06/05/2025</td>
                  <td>Meena Patel</td>
                  <td>Farmer</td>
                  <td>AgrlFly Tech</td>
                  <td>
                    <div className="Actions">
                      <a className="Blue" href>
                        <i className="fa fa-eye" aria-hidden="true" />
                      </a>
                      <a className="Red" data-toggle="modal" data-target="#DeleteReview">
                        <i className="fa fa-trash" aria-hidden="true" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>06/05/2025</td>
                  <td>Suraj yadav</td>
                  <td>Farmer</td>
                  <td>Desl Dairy farm</td>
                  <td>
                    <div className="Actions">
                      <a className="Blue" href>
                        <i className="fa fa-eye" aria-hidden="true" />
                      </a>
                      <a className="Red" data-toggle="modal" data-target="#DeleteReview">
                        <i className="fa fa-trash" aria-hidden="true" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>06/05/2025</td>
                  <td>Anita Verma</td>
                  <td>Corporate</td>
                  <td>Farm move Logistics</td>
                  <td>
                    <div className="Actions">
                      <a className="Blue" href>
                        <i className="fa fa-eye" aria-hidden="true" />
                      </a>
                      <a className="Red" data-toggle="modal" data-target="#DeleteReview">
                        <i className="fa fa-trash" aria-hidden="true" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>06/05/2025</td>
                  <td>Rajesh Singh</td>
                  <td>Farmer</td>
                  <td>ElectroSpary India Pvt Ltd</td>
                  <td>
                    <div className="Actions">
                      <a className="Blue" href>
                        <i className="fa fa-eye" aria-hidden="true" />
                      </a>
                      <a className="Red" data-toggle="modal" data-target="#DeleteReview">
                        <i className="fa fa-trash" aria-hidden="true" />
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="PaginationBox">
            <div className="PaginationLeft">
              <p>Total Records : <span>200</span></p>
            </div>
            <div className="PaginationRight">
              <ul>
                <li>
                  <a href="javascript:void(0);"><i className="fa fa-angle-double-left" /></a>
                </li>
                <li>
                  <a href="javascript:void(0);"><i className="fa fa-angle-left" /></a>
                </li>
                <li className="active"><a href="javascript:void(0);">1</a></li>
                <li><a href="javascript:void(0);">2</a></li>
                <li><a href="javascript:void(0);">3</a></li>
                <li>
                  <a href="javascript:void(0);"><i className="fa fa-angle-right" /></a>
                </li>
                <li>
                  <a href="javascript:void(0);"><i className="fa fa-angle-double-right" /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default ComplaintsListings