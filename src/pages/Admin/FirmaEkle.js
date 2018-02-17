import React from "react";

import HeaderAdmin from "../../containers/content/templates/HeaderAdmin";
import SideBar from "../../containers/content/templates/SideBar";

/* global $*/
class FirmaEkle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      member: {},
      selectRole: [],
      valid: false,
      validMail: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleControl = this.handleControl.bind(this);
  }

  componentWillMount() {
    document.title="Firma Ekle";
    this.fillRoleSelect();
  }
  handleControl(event) {
    if (event.target.name === "username") {
      $.ajax({
        url: "http://192.168.0.11:56019/Admin/ControlUsername",
        type: "POST",
        dataType: "JSON",
        data: JSON.stringify(this.state.member),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
          this.setState({
            valid: data
          });
        }.bind(this)
      });
    } else if (event.target.name === "mail") {
      $.ajax({
        url: "http://192.168.0.11:56019/Admin/ControlMail",
        type: "POST",
        dataType: "JSON",
        data: JSON.stringify(this.state.member),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
          this.setState({
            validMail: data
          });
        }.bind(this)
      });
    }
  }
  fillRoleSelect() {
    $.ajax({
      url: "http://192.168.0.11:56019/Admin/GetRolesForMember",
      type: "GET",
      dataType: "JSON",
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        this.setState({
          selectRole: data
        });
        console.log(this.state.selectMember);
      }.bind(this),
      error() {
        alert("Eklendi.");
      }
    });
  }

  handleChange(event) {
    const member = this.state.member;
    member[event.target.name] = event.target.value;
    this.setState({ member: member });
    console.log(event.target.value);
    console.log(this.state.member);
  }

  handleSubmit() {
    if (this.state.valid) {
      alert("Kullanıcı Adı Aynı Olamaz");
      return false;
    }
    $.ajax({
      url: "http://192.168.0.11:56019/Admin/AddMember",
      type: "POST",
      data: JSON.stringify(this.state.member),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success() {
        alert("Eklendi");
      },
      error() {
        alert("Eklendi.");
      }
    });
  }
  render() {
    let btn = false;
    if (this.state.valid || this.state.validMail) btn = true;
    return (
      <div id="wrapper">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <HeaderAdmin />
          <SideBar />
        </nav>

        <div id="page-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12" />

              <form onSubmit={this.handleSubmit} className="form-horizontal">
                <div className="form-group">
                  <label className="control-label col-sm-2">
                  Company or Customer Name::
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={this.handleChange}
                      value={this.state.member.name}
                      required
                      maxLength={50}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2">
                  If yes Customer Surname:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="surname"
                      onChange={this.handleChange}
                      value={this.state.member.surname}
                      maxLength={50}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2">Number:</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control"
                      name="number"
                      onChange={this.handleChange}
                      value={this.state.member.number}
                      maxLength={15}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2">Mail:</label>
                  {this.state.validMail
                    ? <div className="col-sm-8 has-error has-feedback">
                        <input
                          type="text"
                          className="form-control"
                          name="mail"
                          onChange={this.handleChange}
                          value={this.state.member.mail}
                          required
                          maxLength={150}
                          onBlur={this.handleControl}
                        />{" "}
                        <span
                          className="glyphicon glyphicon-remove form-control-feedback"
                          aria-hidden="true"
                        />
                        <span id="inputError2Status" className="sr-only">
                          (error)
                        </span>
                        {this.state.validMail ? "Mail Mevcut" : ""}
                      </div>
                    : <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          name="mail"
                          onChange={this.handleChange}
                          value={this.state.member.mail}
                          required
                          maxLength={150}
                          onBlur={this.handleControl}
                        />{" "}
                        {this.state.validMail ? "Mail Mevcut" : ""}
                      </div>}
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2">Adress:</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      name="adress"
                      onChange={this.handleChange}
                      value={this.state.member.adress}
                      required
                      maxLength={250}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2">Identity NO:</label>
                  <div className="col-sm-8">
                    <input
                      type="number"
                      className="form-control"
                      name="identityNo"
                      onChange={this.handleChange}
                      value={this.state.member.identityNo}
                      maxLength={20}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2">
                    Username:
                  </label>
                  {this.state.valid
                    ? <div className="col-sm-8 has-error has-feedback">
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          onChange={this.handleChange}
                          value={this.state.member.username}
                          required
                          maxLength={50}
                          onBlur={this.handleControl}
                        />
                        <span
                          className="glyphicon glyphicon-remove form-control-feedback"
                          aria-hidden="true"
                        />
                        <span id="inputError2Status" className="sr-only">
                          (error)
                        </span>
                        {this.state.valid ? "Kullanıcı Adı Mevcut" : ""}
                      </div>
                    : <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          onChange={this.handleChange}
                          value={this.state.member.username}
                          required
                          maxLength={50}
                          onBlur={this.handleControl}
                        />
                        {this.state.valid ? "Kullanıcı Adı Mevcut" : ""}
                      </div>}
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2">Password:</label>
                  <div className="col-sm-8">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      onChange={this.handleChange}
                      value={this.state.member.password}
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                <div className="from-group">
                  <label className="control-label col-sm-2">Position:</label>

                  <div className="col-sm-8">
                    <select
                      className="form-control"
                      name="roleId"
                      onChange={this.handleChange}
                      required
                    >
                      <option key={0} value="">
                        Choose
                      </option>
                      {this.state.selectRole.map(selections =>
                        <option
                          key={selections.roleId}
                          value={selections.roleId}
                        >
                          {selections.name}
                        </option>
                      )}
                    </select>
                  </div>
                  <br />
                  <br />
                  <br />
                </div>{" "}
                {btn
                  ? <div className="from-group">
                      <div className="col-sm-offset-2 col-sm-8">
                        <input
                          className="btn btn-primary"
                          type="submit"
                          value="Ekle"
                          disabled
                        />
                      </div>
                    </div>
                  : <div className="from-group">
                      <div className="col-sm-offset-2 col-sm-8">
                        <input
                          className="btn btn-primary"
                          type="submit"
                          value="Ekle"
                        />
                      </div>
                    </div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FirmaEkle;
