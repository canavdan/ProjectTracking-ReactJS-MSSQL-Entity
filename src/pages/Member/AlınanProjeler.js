import React from "react";
import { Link } from "react-router-dom";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import HeaderMember from "../../containers/content/templates/HeaderMember";
import Auth from "../../components/Auth";
/* global $ */
class AlınanProjeler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedId: null,
      selectedSaleId: null,
      saleId: null,
      memberId: localStorage.getItem("memberId").replace(/"/g, ""),
    };
    this.convertDate = this.convertDate.bind(this);
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
  componentDidMount() {
    $.ajax({
      url: `http://192.168.0.11:56019/Member/GetProject/${this.state.memberId}`,
      dataType: "json",
      type: "GET",
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        data.forEach(data => {
          data.exceptedFinish = this.convertDate(data.exceptedFinish);
          data.startDate = this.convertDate(data.startDate);
        });
        this.setState({ data });
      }.bind(this),
      error() {
        alert("Veriler Alınamadı");
      }
    });
  }
  cellButtonDetay(cell, row, enumObject, rowIndex) {
    return <Link to={`/projedetaymember/${row.projectId}`}>Details</Link>;
  }
  cellButtonSatis(cell, row, enumObject, rowIndex) {
    return <Link to={`/satisdetaymember/${row.saleId}`}>Sale Info</Link>;
  }
  render() {
    return (
      <div>
      
        <HeaderMember />
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <br />
              <BootstrapTable data={this.state.data} pagination search>
                <TableHeaderColumn
                  isKey
                  dataField="projectId"
                  width="150"
                  hidden
                >
                  Proje ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="saleId" width="110" hidden>
                  Sale ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="projectName" width="150">
                  Project Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="employeeFull" width="150">
                Authorized Person
                </TableHeaderColumn>
                <TableHeaderColumn dataField="memberFull" width="150">
                  To Whom
                </TableHeaderColumn>
                <TableHeaderColumn dataField="percentStatu" width="70">
                  Percent
                </TableHeaderColumn>
                <TableHeaderColumn dataField="startDate" width="125">
                  Start Date
                </TableHeaderColumn>
                <TableHeaderColumn dataField="exceptedFinish" width="110">
                Estimated End
                </TableHeaderColumn>

                <TableHeaderColumn
                  dataField="button"
                  width="100"
                  dataFormat={this.cellButtonDetay.bind(this)}
                >
                  Details{" "}
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="button"
                  width="100"
                  dataFormat={this.cellButtonSatis.bind(this)}
                >
                 Sales Info{" "}
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AlınanProjeler;
