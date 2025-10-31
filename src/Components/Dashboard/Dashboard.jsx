import React from "react";

const Dashboard = () => {
  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <div className="TitleBox">
          <h4 className="Title">Dashboard</h4>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-4">
                <div className="Dashboard Active">
                  <figure>
                    <img src="images/car.png" />
                  </figure>
                  <figcaption>
                    <h4>Total Service Categories</h4>
                    <h2>40</h2>
                  </figcaption>
                </div>
              </div>  
              <div className="col-sm-4">
                <div className="Dashboard">
                  <figure>
                    <img src="images/car.png" />
                  </figure>
                  <figcaption>
                    <h4>No. of Subscriptions</h4>
                    <h2>40</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="Dashboard">
                  <figure>
                    <img src="images/car.png" />
                  </figure>
                  <figcaption>
                    <h4>Ongoing Services</h4>
                    <h2>40</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="Dashboard">
                  <figure>
                    <img src="images/car.png" />
                  </figure>
                  <figcaption>
                    <h4>Upcoming Services</h4>
                    <h2>2000</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="Dashboard">
                  <figure>
                    <img src="images/car.png" />
                  </figure>
                  <figcaption>
                    <h4>Completed Services</h4>
                    <h2>40</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="Dashboard">
                  <figure>
                    <img src="images/car.png" />
                  </figure>
                  <figcaption>
                    <h4>Total Farmers</h4>
                    <h2>40</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="Dashboard">
                  <figure>
                    <img src="images/car.png" />
                  </figure>
                  <figcaption>
                    <h4>Total Service Provider</h4>
                    <h2>40</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="Dashboard">
                  <figure>
                    <img src="images/car.png" />
                  </figure>
                  <figcaption>
                    <h4>Total Advertisers</h4>
                    <h2>40</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="Dashboard">
                  <figure>
                    <img src="images/car.png" />
                  </figure>
                  <figcaption>
                    <h4>Total B2B Manufacturers</h4>
                    <h2>40</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="Dashboard min-height">
                  <figure>
                    <img src="images/car.png" />
                  </figure>
                  <figcaption>
                    <h4>Total IM</h4>
                    <h2>40</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="Dashboard min-height">
                  <figure>
                    <img src="images/car.png" />
                  </figure>
                  <figcaption>
                    <h4>Total JD</h4>
                    <h2>40</h2>
                  </figcaption>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="dashboard-contanier">
                  <div className="Dashboard">
                    <figure>
                      <img src="images/car.png" />
                    </figure>
                    <figcaption>
                      <h4>No. of Service Requests</h4>
                      <h2>40</h2>
                    </figcaption>
                  </div>
                  <div className="filter">
                    <input type="date" className="filter-date" />
                    <select className="filter-select">
                      <option value>Accept</option>
                      <option value>Reject</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="TitleBox mt-4">
          <h4 className="Title">Services</h4>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="TableList">
              <table>
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th>Sub Category Name</th>
                    <th>Farmer Name</th>
                    <th>Location Of Service</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Land Management Service</td>
                    <td>Tractor</td>
                    <td>Rohit Sharma</td>
                    <td>Nashik Maharashtra</td>
                    <td>Confirmed</td>
                  </tr>
                  <tr>
                    <td>ESS</td>
                    <td>Spraying</td>
                    <td>Kapil Sharma</td>
                    <td>Guntur Andhra Pradesh</td>
                    <td>On Hold</td>
                  </tr>
                  <tr>
                    <td>Cow Dunk</td>
                    <td>Wet Dunk</td>
                    <td>Radha Sharma</td>
                    <td>Bhopal Madhya Pradesh</td>
                    <td>On Progress</td>
                  </tr>
                  <tr>
                    <td>Harvester</td>
                    <td>Tractor harvester</td>
                    <td>Rahul Sharma</td>
                    <td>Kochi Kerala</td>
                    <td>Confirmed</td>
                  </tr>
                  <tr>
                    <td>Bore well construction</td>
                    <td>digging</td>
                    <td>Rohit Sharma</td>
                    <td>Surat Gujarat</td>
                    <td>On Hold</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;