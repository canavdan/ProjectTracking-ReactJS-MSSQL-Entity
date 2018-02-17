import React from 'react';
import HeaderAdmin from '../../containers/content/templates/HeaderAdmin';
import SideBar from '../../containers/content/templates/SideBar';
/* global $ */

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentWillMount() {
    document.title = "İletişim";
    $.ajax({
      url: 'http://192.168.0.11:56019/Admin/GetReports',
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        this.setState({ items: data });
      }.bind(this),
      error() {
        alert('Hata,veriler alınamadı.');
      },
    });
  }

  render() {
    const style = {
      width: '560px',
      height: '330px',
    };
    const chartData = [10, 20, 30];
    return (
      <div id="wrapper">
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <HeaderAdmin />
          <SideBar />
        </nav>

        <div id="page-wrapper">
          <div className="container-fluid">
            <div className="col-lg-6">
                <h2>Total Project Number:</h2>
              </div>
            <div className="col-lg-6">
               <h2> Number of Ongoing Projects:</h2>
             </div>
            <div className="col-lg-6">
                 <h2> Number of Projects Canceled:</h2>
               </div>
            <div className="col-lg-6">
                <h2>Number of Completed Projects:</h2>
              </div>
            <div>
             
             </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reports;
