import React from "react";
import {  Link } from "react-router-dom";
import {
  BootstrapTable,
  TableHeaderColumn,
  DeleteButton,
  ButtonGroup
} from "react-bootstrap-table";
import HeaderAdmin from "../../containers/content/templates/HeaderAdmin";
import SideBar from "../../containers/content/templates/SideBar";
/* global $*/
class Uyeler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedId:{}
    };
    this.handleRowSelect=this.handleRowSelect.bind(this);
  }

  componentWillMount() {
    document.title="Companies";
    $.ajax({
      url: "http://192.168.0.11:56019/Admin/GetAllMembers",
      dataType: "JSON",
      type: "GET",
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        this.setState({ data: data });
      }.bind(this),
      error() {
        console.log("Veriler alınamadı");
      }
    });
  }
  onAfterDeleteRow(rowKeys) {
    $.ajax({
      url: "http://192.168.0.11:56019/Admin/DeleteMember/" + rowKeys,
      type: "POST",
      data: JSON.stringify(rowKeys),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success() {
        alert("Silindi.");
      },
      error() {
        alert("Hata,tekrar kontrol ediniz.");
      }
    });
  }
  handleRowSelect(row) {
    this.setState({selectedId:row.memberId});
    
  }
  onClickMoreInfo(cell, row, rowIndex) {}
  cellButton(cell, row, enumObject, rowIndex) {
    return <Link to={`/uyedetay/${row.memberId}`}>Details</Link>;
  }
  createCustomButtonGroup = props => {
    return (
      <ButtonGroup className="my-custom-class" sizeClass="btn-group-md">
        {props.deleteBtn}
        <Link to={`/uyeozellikdegis/${this.state.selectedId}`} className={`btn btn-primary`}>
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
                    dataField="memberId"
                    width="150"
                    hidden
                  >
                    Member ID
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="name" width="150">
                   Name
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="surname" width="150">
                    Surname
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="number" width="100">
                    Number
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="mail" width="150">
                    Mail
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="identityNo" width="100">
                    Identity No
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="username" width="150">
                    Username
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="password" width="150">
                    Password
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="button"
                    width="150"
                    dataFormat={this.cellButton.bind(this)}
                  >
                    Detail{" "}
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

export default Uyeler;
