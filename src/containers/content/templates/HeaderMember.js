import React from 'react';
import { Link } from 'react-router-dom';
import AuthMember from '../../../components/AuthMember';

const HeaderMember = () =>
  <nav className="navbar navbar-inverse navbar-fixed-top1" >
    <div className="container">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target="#bs-example-navbar-collapse-1"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <Link to="/">
          <img src="https://cdn.dribbble.com/users/602062/screenshots/1666511/01__bersicht-04_1x.png" height="50" width="75" alt="" />
        </Link>
      </div>

      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/memberhome">Main Page</Link>
          </li>
          <li>
            <Link to="/alinanprojeler">Buying Projects</Link>
          </li>
          <li>
            <Link to="/hakkinda">About</Link>
          </li>
          <li>
            <Link to="/profilim">My Profile</Link>
          </li>
          <li>
            <Link to="/iletisim">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>;

export default HeaderMember;
