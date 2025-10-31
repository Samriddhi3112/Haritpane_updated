import React from 'react'

const ReportPage = () => {
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
          <a href="Reports.html">Reports</a>
        </li>
      </ol>
    </nav>
    <div className="TitleBox">
      <h4 className="Title">Reports</h4>
      <div className="d-flex">
        <div className="calender-container">
          <i className="fa fa-calendar-o" aria-hidden="true"> </i>
          <input type="date" id="start" className="left-date" />
          <label htmlFor="start"> From Date </label>
        </div>
        <div className="calender-container">
          <i className="fa fa-calendar-o" aria-hidden="true"> </i>
          <input type="date" id="start" className="right-date" />
          <label htmlFor="end"> To Date</label>
        </div>
        <div>
          <select name id className="custom-btn">
            <option value>Today</option>
            <option value>This week</option>
            <option value>This Month</option>
            <option value>Custom</option>
          </select>
        </div>
      </div>
    </div>
    <div className="Small-Wrapper">
      <section className="reports-section">
        <ul>
          <li>
            <div className="report-type">
              <div>
                <h5>
                  Enquiry (Posted by farmers on Vendor/manufacturer profile)
                </h5>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Fugit, hic nam in quasi mollitia
                </p>
              </div>
              <i className="fa fa-download download-btn" aria-hidden="true" />
            </div>
            <div className="headline" />
          </li>
          <li>
            <div className="report-type">
              <div>
                <h5>Financial Report</h5>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Fugit, hic nam in quasi mollitia
                </p>
              </div>
              <i className="fa fa-download download-btn" aria-hidden="true" />
            </div>
            <div className="headline" />
          </li>
          <li>
            <div className="report-type">
              <div>
                <h5>Farmer wise service requests reports</h5>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Fugit, hic nam in quasi mollitia
                </p>
              </div>
              <i className="fa fa-download download-btn" aria-hidden="true" />
            </div>
            <div className="headline" />
          </li>
          <li>
            <div className="report-type">
              <div>
                <h5>Service provider wise service requests</h5>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Fugit, hic nam in quasi mollitia
                </p>
              </div>
              <i className="fa fa-download download-btn" aria-hidden="true" />
            </div>
            <div className="headline" />
          </li>
          <li>
            <div className="report-type">
              <div>
                <h5>App Analytics</h5>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Fugit, hic nam in quasi mollitia
                </p>
              </div>
              <i className="fa fa-download download-btn" aria-hidden="true" />
            </div>
            <div className="headline" />
          </li>
        </ul>
      </section>
    </div>
  </div>
</div>

  )
}

export default ReportPage