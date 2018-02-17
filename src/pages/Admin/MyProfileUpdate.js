import React from 'react';
import HeaderAdmin from '../../containers/content/templates/HeaderAdmin';
import SideBar from '../../containers/content/templates/SideBar';
import { Link } from 'react-router-dom';
/* global $ */
class MyProfileUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empId: localStorage.getItem("empId2").replace(/"/g,""),
      data: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    $.ajax({
      url: `http://192.168.0.11:56019/Admin/ProfileInfo/${this.state.empId}`,
      type: 'POST',
      dataType: 'JSON',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        this.setState({
          data,
        });
      }.bind(this),
      error() {
        alert('Error');
      },
    });
  }
  handleChange(event) {
    const data = this.state.data;
    data[event.target.name] = event.target.value;
    this.setState({ data });
  }
  handleSubmit() {
    $.ajax({
      url: 'http://192.168.0.11:56019/Admin/UpdateProfile',
      type: 'POST',
      data: JSON.stringify(this.state.data),
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success(response) {
        if (response.success) alert(response.responseText);
        else {
          alert(response.responseText);
        }
      },
      error() {
        alert('Hata,tekrar kontrol ediniz.');
      },
    });
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
            <form onSubmit={this.handleSubmit}>
              <div className=" col-md-12 col-lg-12 hidden-xs hidden-sm">
                <table className="table table-user-information">
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          value={this.state.data.name || ''}
                          onChange={this.handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Surname:</td>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          name="surname"
                          value={this.state.data.surname || ''}
                          onChange={this.handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td> Number</td>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          name="number"
                          value={this.state.data.number || ''}
                          onChange={this.handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td> Mail</td>
                      <td>
                        <input
                          className="form-control"
                          type="mail"
                          name="mail"
                          value={this.state.data.mail || ''}
                          onChange={this.handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td> Password</td>
                      <td>
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          value={this.state.data.password || ''}
                          onChange={this.handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td> Adress</td>
                      <td>
                        <input
                          className="form-control"
                          type="text"
                          name="adress"
                          value={this.state.data.adress || ''}
                          onChange={this.handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="form-group row">
                <input type="submit" className="btn btn-default" value="Güncelle" />
              </div>
            </form>
          </div>

          <div className="clearfix" />
          <div className="bot-border" />
        </div>
      </div>
    );
  }
}

export default MyProfileUpdate;
