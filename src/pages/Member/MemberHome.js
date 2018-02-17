import React from "react";
import HeaderMember from "../../containers/content/templates/HeaderMember";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const MemberHome = () =>
  <div>
    <HeaderMember />
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <img
            className="img-responsive img-rounded"
            src="http://placehold.it/900x350"
            alt=""
          />
        </div>
        <div className="col-md-4">
          <h1>Business Name or Tagline</h1>
          <p>
            S This is a template that is great for small businesses. It doesn't
            have too much fancy flare to it, but it makes a great use of the
            standard Bootstrap core components. Feel free to use this template
            for any project you want!
          </p>
        </div>
      </div>
    </div>
  </div>;

export default MemberHome;
