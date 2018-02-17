import React from "react";
import HeaderAdmin from "../../containers/content/templates/HeaderAdmin";
import SideBar from "../../containers/content/templates/SideBar";
/* global $*/
class UyeDetay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: this.props.match.params.memberId,
      member: {},
      selectRole: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    document.title = "Change Company Info";
    this.fillRoleSelect();
    this.fillInputs();
  }
  fillInputs() {
    $.ajax({
      url:
        "http://192.168.0.11:56019/Admin/GetMemberValue/" + this.state.memberId,
      type: "POST",
      dataType: "JSON",
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        this.setState({
          member: data
        });
      }.bind(this),
      error() {
        alert("Hata");
      }
    });

    if (this.state.member.surname == null) {
      const member = this.state.member;
      member["surname"] = "";
      this.setState({ member: member });
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
      }.bind(this),
      error() {
        alert("Hata");
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
    $.ajax({
      url: "http://192.168.0.11:56019/Admin/UpdateMember",
      type: "POST",
      data: JSON.stringify(this.state.member),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success(response) {
        if (response.success) alert(response.responseText);
        else {
          alert(response.responseText);
        }
      },
      error() {
        alert("Hata,tekrar kontrol ediniz.");
      }
    });
  }
  render() {
    const style = {
      height: 200
    };
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
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="col-sm-1 control-label">Name</label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      name="name"
                      onChange={this.handleChange}
                      className="form-control"
                      value={this.state.member.name}
                      required
                      maxLength={50}
                    />
                  </div>
                  <label className="col-sm-1 control-label">Surname</label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      name="surname"
                      className="form-control"
                      value={this.state.member.surname}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-1 control-label">Phone</label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      name="number"
                      onChange={this.handleChange}
                      className="form-control"
                      value={this.state.member.number}
                      required
                      maxLength={13}
                    />
                  </div>
                  <label className="col-sm-1 control-label">Mail</label>
                  <div className="col-sm-5">
                    <input
                      type="mail"
                      name="mail"
                      onChange={this.handleChange}
                      className="form-control"
                      value={this.state.member.mail}
                      required
                      maxLength={75}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-1 control-label">Identity No:</label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      onChange={this.handleChange}
                      name="identityNo"
                      className="form-control"
                      value={this.state.member.identityNo}
                    />
                  </div>
                  <label className="control-label col-sm-1">Position:</label>
                  <div className="col-sm-5">
                    <select
                      className="form-control"
                      name="roleId"
                      onChange={this.handleChange}
                      value={this.state.member.roleId}
                    >
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
                </div>
                <div className="form-group">
                  <label className="col-sm-1 control-label">
                   Username:
                  </label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.member.username}
                      required
                      maxLength={50}
                    />
                  </div>
                  <label className="col-sm-1 control-label">Password:</label>
                  <div className="col-sm-5">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={this.handleChange}
                      value={this.state.member.password}
                      required
                      maxLength={50}
                    />
                  </div>
                </div>
                <div className="from-group">
                  <label className="control-label col-sm-1">Adress: </label>

                  <div className="col-sm-5">
                    <textarea
                      className="form-control"
                      name="adress"
                      style={style}
                      onChange={this.handleChange}
                      value={this.state.member.adress}
                    />
                  </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="from-group">
                  <div className="col-sm-offset-5 col-sm-7">
                    <input
                      type="submit"
                      value="Güncelle"
                      className="btn btn-primary"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UyeDetay;
