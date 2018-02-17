import React from "react";
import HeaderAdmin from "../../containers/content/templates/HeaderAdmin";
import SideBar from "../../containers/content/templates/SideBar";
/* global $*/
class UyeDetay extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.params.memberId);
    this.state = {
      memberId: this.props.match.params.memberId,
      member: {},
      selectRole: []
    };
  }
  componentWillMount() {
    document.title="Member Detail";
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
        if (data.registerDay != null)
          data.registerDay = this.convertDate(data.registerDay);
        this.setState({
          member: data
        });
      }.bind(this),
      error() {
        alert("Error");
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
        alert("Error");
      }
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
    shortDate = `${dayString}/${monthString}/${year}`;
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
            <div className="row">
              <div className="col-lg-12" />
              <br />
              <div className="col-lg-6">
                <div className="panel-group">
                  <div className="panel panel-primary">
                    <div className="panel-heading">Name Surname</div>
                    <div className="panel-body">
                      {this.state.member.name} {this.state.member.surname}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="panel-group">
                  <div className="panel panel-primary">
                    <div className="panel-heading">Mail</div>
                    <div className="panel-body">
                      {this.state.member.mail}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="panel-group">
                  <div className="panel panel-primary">
                    <div className="panel-heading">Number</div>
                    <div className="panel-body">
                      {this.state.member.number}
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="col-lg-6">
                <div className="panel-group">
                  <div className="panel panel-primary">
                    <div className="panel-heading">Adress</div>
                    <div className="panel-body">
                      {this.state.member.adress}
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="col-lg-6">
                <div className="panel-group">
                  <div className="panel panel-primary">
                    <div className="panel-heading">Identity No</div>
                    <div className="panel-body">
                      {this.state.member.identityNo}{" "}
                    </div>
                  </div>
                </div>{" "}
              </div>
              <div className="col-lg-6">
                <div className="panel-group">
                  <div className="panel panel-primary">
                    <div className="panel-heading">Username</div>
                    <div className="panel-body">
                      {this.state.member.username}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="panel-group">
                  <div className="panel panel-primary">
                    <div className="panel-heading">Register Day</div>
                    <div className="panel-body">
                      {this.state.member.registerDay}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UyeDetay;
