import React from "react";
// import './css/bootstrap.min.css';
// import './css/sb-admin.css';
// import './fontawesome/css/font-awesome.min.css';

import HeaderAdmin from "../content/templates/HeaderAdmin";
import SideBar from "../content/templates/SideBar";

const Adminhome = () =>
  <div id="wrapper">
    <nav className="navbar navbar-inverse navbar-fixed-top" >
      <HeaderAdmin />
      <SideBar />
    </nav>

    <div id="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">Admin Home</h1>
            <ol className="breadcrumb">
              <li>
                <i className="fa fa-dashboard" />{" "}
                <a href="index.html">Dashboard</a>
              </li>
              <li className="active">
                <i className="fa fa-file" /> Blank Page
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>;

export default Adminhome;
