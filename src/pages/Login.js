import React from "react";
import { Redirect } from "react-router-dom";
/* global $ */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      d: {},
      info: [],
      fireRedirect: false,
      role: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    document.title = "Giriş Yap";
  }
  handleSubmit(event) {
    event.preventDefault();
    const values = {};
    $.ajax({
      url: `http://192.168.0.11:56019/Authentication/ControlLoginInfo`,
      type: "POST",
      dataType: "JSON",
      data: JSON.stringify(this.state.d),
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        values.username = data.username;
        if (data.roleName === "Uye" || data.roleName === "Sirket") {
          localStorage.setItem("username", JSON.stringify(data.username));
          this.setState({ role: 1, fireRedirect: true });
          localStorage.setItem("memberId", data.memberId);
          localStorage.setItem("roleName", data.roleName);
          // this.setState({ fireRedirect: true });
        } else if (data.roleName === "Admin" || data.roleName === "Calisan") {
          localStorage.setItem("username", JSON.stringify(data.username));
          localStorage.setItem("roleName", data.roleName);
          localStorage.setItem("empId2", data.empId);
          this.setState({ fireRedirect: true, role: 2 });
        }
      }.bind(this),
      error() {
        alert("Yanlış girildi");
      }
    });
  }
  handleChange(event) {
    const d = this.state.d;
    d[event.target.name] = event.target.value;
    this.setState({ d });
  }

  render() {
    const { role } = this.state;
    return (
      <div id="fullscreen_bg" className="fullscreen_bg">
        <div className="container">
          <form className="form-signin" onSubmit={this.handleSubmit}>
            <h1 className="form-signin-heading text-muted">Log in</h1>
            <input
              type="text"
              className="form-control"
              placeholder="Kullanıcı Adı ya da E-Mail"
              required
              name="username"
              value={this.state.d.username}
              onChange={this.handleChange}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Şifre"
              required
              name="password"
              onChange={this.handleChange}
              value={this.state.d.password}
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Login
            </button>
          </form>
          {(function() {
            switch (role) {
              case 1:
                return (
                  <Redirect
                    to={{
                      pathname: "/memberhome"
                    }}
                  />
                );
              case 2:
                return (
                  <Redirect
                    to={{
                      pathname: "/adminhome"
                    }}
                  />
                );
              default:
                return null;
            }
          })()}
        </div>{" "}
      </div>
    );
  }
}

export default Login;
