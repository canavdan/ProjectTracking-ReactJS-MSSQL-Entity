import React from 'react';
import HeaderMember from '../../containers/content/templates/HeaderMember';
import { Link } from 'react-router-dom';
import HeaderAdmin from '../../containers/content/templates/HeaderAdmin';
import SideBar from '../../containers/content/templates/SideBar';
/* global $ */
class MyProfileAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empId: localStorage.getItem('empId2').replace(/"/g, ''),
      data: {},
    };
  }
  componentWillMount() {
    document.title = 'My Profile';
    $.ajax({
      url: `http://192.168.0.11:56019/Admin/ProfileInfo/${this.state.empId}`,
      type: 'POST',
      dataType: 'JSON',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        data.entranceDate = this.convertDate(data.entranceDate);
        this.setState({
          data,
        });
      }.bind(this),
      error() {
        alert('Error');
      },
    });
  }
  convertDate(jsondate) {
    let shortDate = null;
    const regex = /-?\d+/;
    const matches = regex.exec(jsondate);
    const dt = new Date(parseInt(matches[0]));
    const month = dt.getMonth() + 1;
    const monthString = month > 9 ? month : `0${month}`;
    const day = dt.getDate();
    const dayString = day > 9 ? day : `0${day}`;
    const year = dt.getFullYear();
    shortDate = `${monthString}/${dayString}/${year}`;
    return shortDate;
  }
  render() {
    return (
      <div id="wrapper">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <HeaderAdmin />
          <SideBar />
        </nav>

        <div id="page-wrapper">
          <div className="container-fluid">
            <div className=" col-md-12 col-lg-12 hidden-xs hidden-sm">
              <table className="table table-user-information">
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>
                      {this.state.data.name}
                    </td>
                  </tr>
                  <tr>
                    <td>Surname:</td>
                    <td>
                      {this.state.data.surname}
                    </td>
                  </tr>
                  <tr>
                    <td>Join Date</td>
                    <td>
                      {this.state.data.entranceDate}
                    </td>
                  </tr>
                  <tr>
                    <td> Number</td>
                    <td>
                      {this.state.data.number}
                    </td>
                  </tr>
                  <tr>
                    <td> Number</td>
                    <td>
                      {this.state.data.number}
                    </td>
                  </tr>
                  <tr>
                    <td> Mail</td>
                    <td>
                      {this.state.data.mail}
                    </td>
                  </tr>
                  <tr>
                    <td> Username</td>
                    <td>
                      {this.state.data.username}
                    </td>
                  </tr>
                  <tr>
                    <td> Adress</td>
                    <td>
                      {this.state.data.adress}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <Link to={`/myprofileupdate/${this.state.data.empId}`} className="btn btn-primary">
              Change
            </Link>
          </div>
          <div className="clearfix" />
          <div className="bot-border" />
        </div>
      </div>
    );
  }
}

export default MyProfileAdmin;
