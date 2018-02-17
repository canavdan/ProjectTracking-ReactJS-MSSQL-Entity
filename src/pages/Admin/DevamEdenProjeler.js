import React from "react";
import {Link } from "react-router-dom";
import {
  BootstrapTable,
  TableHeaderColumn,
  ButtonGroup,
  DeleteButton
} from "react-bootstrap-table";
import HeaderAdmin from "../../containers/content/templates/HeaderAdmin";
import SideBar from "../../containers/content/templates/SideBar";
/* global $ */
class DevamEdenProjeler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedId: null,
      selectedSaleId:null,
      saleId:null
    };
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.convertDate = this.convertDate.bind(this);
  }
  convertDate(jsondate) {
    var shortDate = null;
    var regex = /-?\d+/; 
    var matches = regex.exec(jsondate);
    var dt = new Date(parseInt(matches[0]));
    var month = dt.getMonth() + 1;
    var monthString = month > 9 ? month : "0" + month;
    var day = dt.getDate();
    var dayString = day > 9 ? day : "0" + day;
    var year = dt.getFullYear();
    shortDate = monthString + "/" + dayString + "/" + year;
    return shortDate;
  }
  componentWillMount() {
    document.title="Devam Eden Projeler";
    $.ajax({
      url: "http://192.168.0.11:56019/Admin/GetGuncelProjects",
      dataType: "json",
      type: "GET",
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        data.forEach(data => {
          data.exceptedFinish = this.convertDate(data.exceptedFinish);
          data.startDate = this.convertDate(data.startDate);
        });
        this.setState({ data: data });
      }.bind(this),
      error() {
        alert("Veriler Alınamadı");
      }
    });
  }

  onAfterDeleteRow(rowKeys) {
    $.ajax({
      url: "http://192.168.0.11:56019/Admin/DeleteProject/" + rowKeys,
      type: "POST",
      data: JSON.stringify(rowKeys),
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
  handleRowSelect(row) {
    this.setState({ selectedId: row.projectId ,selectedSaleId:row.saleId});
  }
  onClickMoreInfo(cell, row, rowIndex) {}
  cellButtonDetay(cell, row, enumObject, rowIndex) {
  
    return <Link to={`/projedetay/${row.projectId}`}>More information</Link>;
  }
  cellButtonSatis(cell, row, enumObject, rowIndex) {
    return <Link to={`/satisdetay/${row.saleId}`}>Sales Information</Link>;
  }
  createCustomButtonGroup = props => {
    return (
      <ButtonGroup className="my-custom-class" sizeClass="btn-group-md">
        {props.deleteBtn}
        <Link
          to={`/projeozellikdegis/${this.state.selectedId}/${this.state.selectedSaleId}`}
          className={`btn btn-primary`}
        >
          Change
        </Link>
      </ButtonGroup>
    );
  };
  handleDeleteButtonClick = onClick => {
    onClick();
  };
  createCustomDeleteButton = onClick => {
    return (
      <DeleteButton
        btnText="Delete"
        btnContextual="btn-success"
        className="my-custom-class"
        btnGlyphicon="glyphicon-edit"
        onClick={e => this.handleDeleteButtonClick(onClick)}
      />
    );
  };

  render() {
    const options = {
      onRowDoubleClick: function(row) {
        alert(`You double click row id: ${row.memberId}`);
      },
      afterDeleteRow: this.onAfterDeleteRow,
      btnGroup: this.createCustomButtonGroup,
      deleteBtn: this.createCustomDeleteButton
    };
    const selectRowProp = {
      mode: "radio",
      onSelect: this.handleRowSelect
    };

    return (
      <div id="wrapper">
        <nav
          className="navbar navbar-inverse navbar-fixed-top"
        >
          <HeaderAdmin />
          <SideBar />
        </nav>

        <div id="page-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <br />
                <BootstrapTable
                  data={this.state.data}
                  pagination
                  options={options}
                  deleteRow={true}
                  search
                  selectRow={selectRowProp}
                >
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
                  Person in charge
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="memberFull" width="150">
                    To Whom
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="percentStatu" width="70">
                    Percent
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="startDate" width="125">
                  Starting date
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
      </div>
    );
  }
}

export default DevamEdenProjeler;
