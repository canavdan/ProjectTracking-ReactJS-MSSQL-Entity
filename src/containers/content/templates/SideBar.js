import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

// import '../css/bootstrap.min.css';
// import '../css/sb-admin.css';
// import '../fontawesome/css/font-awesome.min.css';
// import '../js/jquery';
// import '../js/bootstrap';

const SideBar = () =>
  <div className="collapse navbar-collapse navbar-ex1-collapse">
    <ul className="nav navbar-nav side-nav">
      <li>
        <Link to="/adminhome">
          {" "}<i className="fa fa-fw fa-dashboard" />
          &nbsp;&nbsp;Main Page{" "}
        </Link>
      </li>
      <li>
        <a href="javascript:;" data-toggle="collapse" data-target="#demo">
          <i className="fa fa-fw fa-arrows-v" /> Projects{" "}
          <i className="fa fa-fw fa-caret-down" />
        </a>
        <ul id="demo" className="collapse">
          <li>
            <Link to="/devamedenprojeler">Ongoing projects</Link>
          </li>
          <li>
            <Link to="/bitenprojeler">Finished Projects</Link>
          </li>
          <li>
            <Link to="/iptalprojeler">Canceled Projects</Link>
          </li>
        </ul>
      </li>
      <li>
        <Link to="/projeekle">
          <i className="fa fa-fw fa-table" /> &nbsp;Add Project
        </Link>
      </li>
      <li>
         <a href="javascript:;" data-toggle="collapse" data-target="#catDropDown">
          <i className="fa fa-fw fa-arrows-v" /> Category{" "}
          <i className="fa fa-fw fa-caret-down" />
        </a>
         <ul id="catDropDown" className="collapse">
          <li>
            <Link to="/kategoriekle">Add Category</Link>
          </li>
          <li>
              <Link to="/kategoriduzenle">Edit Categories</Link>
            </li>
          <li>
            <Link to="/katozellikekle">Add Category Attribute</Link>
          </li>
          <li>
            <Link to="/katozdegistir">Change Category Attribute</Link>
          </li>
        </ul>
       </li>
      <li>
        <Link to="/uyeler">
          <i className="fa fa-fw fa-table" /> &nbsp;Companies
        </Link>
      </li>{" "}
      <li>
        <Link to="/firmaekle">
          <i className="fa fa-fw fa-table" /> &nbsp;Add Companies
        </Link>
      </li>
      <li>
        <Link to="/myprofile">
           <i className="fa fa-fw fa-desktop" /> My Profile
       </Link>
      </li>
      <li>
        <Link to="/reports">
           <i className="fa fa-fw fa-wrench" /> Reports
        </Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
         <Link to="/">Log out</Link>
       </li>
    </ul>
  </div>;

export default SideBar;
