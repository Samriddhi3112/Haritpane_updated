import React, { useState } from "react";
import StaticContentEdit from "../../Static Content/StaticContentEdit";
import StaticContentListing from "../../Static Content/StaticContentListing";
import { NavLink } from "react-router-dom";
import StaticContentListing from "../../Static Content/StaticContentListing";

const TabSwitching = () => {
  const [activeTab, setActiveTab] = useState("subAdmin");

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div aria-label="breadcrumb" className="breadcrumbs" style={{marginLeft:"18%" , backgroundColor:"#f0fdf4"}}>
        <NavLink to="/dashboard" className="greyborder">
          <i className="fa-solid fa-arrow-left arrow-icon" />
          <p>Go Back</p>
        </NavLink>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li className="breadcrumb-item">
            <NavLink to="/tabSwitchVeri">Verification Management</NavLink>
          </li>
        </ol>
      </div>
      <div
        className="flex justify-center gap-4 mb-6"
        style={{ textAlign: "-webkit-center", marginRight: "45%" }}
      >
        <button
          onClick={() => setActiveTab("subAdmin")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            border: "none",
            backgroundColor: activeTab === "subAdmin" ? "#22c55e" : "#e5e7eb",
            color: activeTab === "subAdmin" ? "#ffffff" : "#1f2937",
            boxShadow:
              activeTab === "subAdmin" ? "0 4px 0 #166534" : "0 4px 0 #6b7280",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseDown={(e) =>
            (e.currentTarget.style.transform = "translateY(4px)")
          }
          onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          Farmer
        </button>

        <button
          onClick={() => setActiveTab("roles")}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            border: "none",
            backgroundColor: activeTab === "roles" ? "#22c55e" : "#e5e7eb",
            color: activeTab === "roles" ? "#ffffff" : "#1f2937",
            boxShadow:
              activeTab === "roles" ? "0 4px 0 #166534" : "0 4px 0 #6b7280",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseDown={(e) =>
            (e.currentTarget.style.transform = "translateY(4px)")
          }
          onMouseUp={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          Service Provider
        </button>
      </div>

      <div className="p-4  ">
        {activeTab === "subAdmin" && <StaticContentListing />}
        {activeTab === "roles" && <StaticContentListing />}
      </div>
    </div>
  );
};

export default TabSwitching;
