import React from 'react'

const PasswordSetting = () => {
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
          <a href="profile.html">Profile</a>
        </li>
      </ol>
    </nav>
    <div className="TitleBox">
      <h4 className="Title">My Profile</h4>
    </div>
    {/* <div class="Small-Wrapper">
    <div class="AdminActivity">
      <aside>
        <ul>
          <li>
            <p>
              <figure>
                <img src="images/akshit.png" alt="" />
              </figure>
            </p>
            <p>
              <label>Full Name</label>
              <span>Aditya Kakkar</span>
            </p>

            <p>
              <label>Email Address</label>
              <span>simmi@gmail.com</span>
            </p>
            <p>
              <label>Contact N0</label>
              <span> +91-9876543210 </span>
            </p>
          </li>
        </ul>
      </aside>
    </div>
  </div> */}
    <div className="CommonTabs">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" data-toggle="tab" href="#MyAccount">Personal Details</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#PasswordSetting">Password Settings</a>
        </li>
      </ul>
    </div>
    <div className="tab-content">
      <div className="tab-pane active" id="MyAccount">
        <div className="row">
          <div className="col-sm-12">
            <div className="Small-Wrapper">
              <div className="CommonForm">
                <div className="form-group">
                  <figure>
                    <img src="images/akshit.png" alt />
                  </figure>
                  {/* <label>Upload Image</label> */}
                  {/* <div class="UploadBox">
                  <div class="Upload">
                    <i class="fa fa-upload"></i> <span>Upload </span>
                    <input type="file" />
                  </div>
                </div> */}
                </div>
                <div className="form-group">
                  <label>Full name</label>
                  <input type="text" className="form-control" placeholder="Enter Your Name" defaultValue="Aditya Kakkar" disabled />
                </div>
                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" placeholder="Enter Your Email" defaultValue="Aditya@gmail.com" disabled />
                </div>
                <div className="form-group">
                  <label>Contact No</label>
                  <input type="number" className="form-control" placeholder="Enter Your Contact No" defaultValue={9876543210} disabled />
                </div>
                <button className="Button">Edit Details</button>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="Small-Wrapper">
              <div className="CommonForm">
                <div className="form-group">
                  <label>Upload Image</label>
                  <div className="UploadBox">
                    <div className="Upload">
                      <i className="fa fa-upload" /> <span>Upload </span>
                      <input type="file" />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Full name</label>
                  <input type="text" className="form-control" placeholder="Enter Your Name" />
                </div>
                <div className="form-group">
                  <label>Email address</label>
                  <input type="email" className="form-control" placeholder="Enter Your Email" />
                </div>
                <div className="form-group">
                  <label>Contact No</label>
                  <input type="number" className="form-control" placeholder="Enter Your Contact No" />
                </div>
                <button className="Button">Save Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-pane fade" id="PasswordSetting">
        <div className="TitleBox">
          <h4 className="Title">Change Password</h4>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="Small-Wrapper">
              <div className="CommonForm">
                <button className="Button">Update Password</button>
              </div>
            </div>
            <div className="Small-Wrapper">
              <div className="CommonForm">
                <div className="form-group">
                  <label>Old Password</label>
                  <input type="password" className="form-control" placeholder="Enter Old Password" />
                  <span className="Icon"><i className="fa fa-eye-slash" aria-hidden="true" /></span>
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" className="form-control" placeholder="Enter New Password" />
                  <span className="Icon"><i className="fa fa-eye-slash" aria-hidden="true" /></span>
                </div>
                <div className="form-group">
                  <label>Re-enter Password</label>
                  <input type="password" className="form-control" placeholder="Enter Re-enter Password" />
                  <span className="Icon"><i className="fa fa-eye-slash" aria-hidden="true" /></span>
                </div>
                <button className="Button">Save Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default PasswordSetting