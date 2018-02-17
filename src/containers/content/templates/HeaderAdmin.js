import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../../components/Auth';
// import '../js/jquery';
// import '../js/bootstrap';
// import '../css/bootstrap.min.css';
// import '../css/sb-admin.css';
// import '../fontawesome/css/font-awesome.min.css';

const Header = () =>
  <div>
    <Auth name="admin" />
    <div className="navbar-header">
      <button
        type="button"
        className="navbar-toggle"
        data-toggle="collapse"
        data-target=".navbar-ex1-collapse"
      >
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar" />
        <span className="icon-bar" />
        <span className="icon-bar" />
      </button>

      <Link to="/" className="navbar-brand">
        Admin Page{' '}
      </Link>
    </div>

    <ul className="nav navbar-right top-nav">
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-user" /> {localStorage.getItem('username').replace(/"/g, '')}
          <b className="caret" />
        </a>
        <ul className="dropdown-menu">
          <li>
            <a href="/myprofile">
              <i className="fa fa-fw fa-user" /> Profile
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-fw fa-envelope" /> Inbox
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-fw fa-gear" /> Settings
            </a>
          </li>
          <li className="divider" />
          <li>
            <a href="#">
              <i className="fa fa-fw fa-power-off" /> Log Out
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>;

export default Header;
