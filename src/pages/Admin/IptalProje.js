import React from 'react';
import {
  BootstrapTable,
  TableHeaderColumn,
  ButtonGroup,
  DeleteButton,
} from 'react-bootstrap-table';
import { Link } from 'react-router-dom';
import HeaderAdmin from '../../containers/content/templates/HeaderAdmin';
import SideBar from '../../containers/content/templates/SideBar';
/* global $ */

class IptalProje extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedId: null,
      selectedSaleId: null,
      saleId: null,
    };
      this.handleRowSelect = this.handleRowSelect.bind(this);
    this.convertDate = this.convertDate.bind(this);
  }

  componentWillMount() {
    document.title = 'İptal Olan Projeler';
    $.ajax({
      url: 'http://192.168.0.11:56019/Admin/GetIptalProjects',
      dataType: 'json',
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      success: function(data) {
        data.forEach(data => {
          data.exceptedFinish = this.convertDate(data.exceptedFinish);
          data.startDate = this.convertDate(data.startDate);
        });
        this.setState({ data: data });
      }.bind(this),
      error() {
        alert('Veriler Alınamadı');
      },
    });
  }
 ccc
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
  handleRowSelect(row) {
    this.setState({ selectedId: row.projectId, selectedSaleId: row.saleId });
  }
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
          Değiştir
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
      deleteBtn: this.createCustomDeleteButton,
    };
    const selectRowProp = {
      mode: 'radio',
      onSelect: this.handleRowSelect,
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
              <div className="col-lg-12">
                <BootstrapTable
                  data={this.state.data}
                  pagination
                  options={options}
                  deleteRow
                  search
                  selectRow={selectRowProp}
                >
                  <TableHeaderColumn isKey dataField="projectId" width="150" hidden>
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
                    Start Dae
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="exceptedFinish" width="110">
                  Estimated End
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField="button"
                    width="100"
                    dataFormat={this.cellButtonDetay.bind(this)}
                  >
                    Details{' '}
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="button"
                    width="100"
                    dataFormat={this.cellButtonSatis.bind(this)}
                  >
                    Sale Information{' '}
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

export default IptalProje;
