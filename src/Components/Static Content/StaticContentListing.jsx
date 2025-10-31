import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaticData } from "../../reduxToolkit/Slices/StaticContent";
import { NavLink, useNavigate } from "react-router-dom";

const StaticContentListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.staticData);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    dispatch(fetchStaticData());
  }, [dispatch]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleEdit = (item) => {
    navigate("/static-content-edit", { state: item });
  };

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
              <NavLink to="/static-content">Static Content</NavLink>
            </li>
          </ol>
        </nav>

        <div className="TitleBox">
          <h4 className="Title">Static Content</h4>
        </div>

        <div className="StaticArea">
          {data?.map((item, index) => (
            <div className="card no-padding" key={item._id}>
              <div
                className="card-header d-flex justify-content-between align-items-center"
                onClick={() => toggleAccordion(index)}
                style={{ cursor: "pointer" }}
              >
                <h5 className="mb-0" style={{fontSize:"15px"}}>{item.title}</h5>

                <div className="d-flex align-items-center gap-3">
                  <i
                    className="fa fa-pencil text-black"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(item);
                      // state={data}
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  {/* /static-content-edit */}
                  {/* Dropdown chevron */}
                  {/* <i
                    className={`fa ${
                      openIndex === index ? "fa-chevron-up" : "fa-chevron-down"
                    }`}
                  /> */}
                </div>
              </div>

              {openIndex === index && (
                <div className="card-body">{item.description}</div>
              )}
            </div>
          ))}

          {data?.length === 0 && <p>No static content found.</p>}
        </div>
      </div>
    </div>
  );
};

export default StaticContentListing;