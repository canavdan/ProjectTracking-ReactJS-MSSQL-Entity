import React from 'react';
import Dropzone from 'react-dropzone';
import HeaderAdmin from '../../containers/content/templates/HeaderAdmin';
import SideBar from '../../containers/content/templates/SideBar';
/* global $ */
class ProjeOzellikDegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      saleId: this.props.match.params.saleId,
      project: {},
      sale: {},
      categoryValues: {},
      categoryValueProject: {},
      SelectEmployeer: [],
      SelectMember: [],
      SelectStatu: [],
      SelectCategory: [],
      col: [],
      file: [],
      isFinish: false,
    };
    this.handleChangeProject = this.handleChangeProject.bind(this);
    this.handleSubmitProject = this.handleSubmitProject.bind(this);
    this.handleChangeSale = this.handleChangeSale.bind(this);
    this.handleSubmitSale = this.handleSubmitSale.bind(this);
    this.handleChangeProjectValue = this.handleChangeProjectValue.bind(this);
    this.handleSubmitProjectValue = this.handleSubmitProjectValue.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.fillCategoryValues = this.fillCategoryValues.bind(this);
  }
  componentWillMount() {
    document.title = 'Change Project Features';
  }
  componentDidMount() {
    this.fillProjectInfo();
    this.fillSelectEmployeer();
    this.fillSelectMember();
    this.fillStatuProject();
    this.fillCategorySelect();
    this.fillSaleInfo();
    this.fillCategoryValues();
  }
  onDrop(file) {
    this.setState({
      file,
    });
    const data = new FormData();
    file.forEach((x) => {
      data.append('file', x);
    });
    console.log(data);
    $.ajax({
      url: 'http://192.168.0.11:56019/Admin/UploadPictures',
      type: 'POST',
      data,
      processData: false,
      contentType: false,
      success(response) {
        if (response.success) alert(response.responseText);
        else {
          alert(response.responseText);
        }
      },
      error() {
        alert('Hata,tekrar kontrol ediniz.');
      },
    });
  }
  fillCategoryValues() {
    const cols = [];
    $.ajax({
      url: `http://192.168.0.11:56019/Admin/GetCategoryValues/${this.state.projectId}`,
      type: 'POST',
      dataType: 'JSON',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        this.setState({
          categoryValueProject: data,
        });
        data.forEach((x) => {
          cols.push(
            <div className="form-group row" key={x.valueId}>
               {x.valueName} Percent : {x.statu} <br />
              <label htmlFor={x.valueId} className="col-2 col-form-label">
                {x.valueName}
              </label>
              <div className="col-10" key={x.valueId}>
                <input
                  className="form-control"
                  type="number"
                  name="statu"
                  value={this.state.categoryValueProject.statu || ''}
                  id={x.valueId}
                  onChange={this.handleChangeProjectValue}
                />
              </div>
            </div>,
          );
        });

        this.setState({
          categoryValueProject: data,
        });
      }.bind(this),
      error() {
        alert('Error');
      },
    });

    this.setState({ col: cols });
  }
  fillSaleInfo() {
    $.ajax({
      url: `http://192.168.0.11:56019/Admin/GetSale/${this.state.saleId}`,
      dataType: 'JSON',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        this.setState({
          sale: data,
        });
      }.bind(this),
      error() {
        alert('Error');
      },
    });
  }
  fillCategorySelect() {
    $.ajax({
      url: 'http://192.168.0.11:56019/Admin/GetCategories',
      type: 'GET',
      dataType: 'JSON',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        // const categoryValue = this.state.categoryValue;
        // categoryValue["categoryId"] = data[0].categoryId;
        this.setState({
          SelectCategory: data,
          // categoryValue: categoryValue
        });
      }.bind(this),
      error() {
        alert('Error');
      },
    });
  }
  fillStatuProject() {
    $.ajax({
      url: 'http://192.168.0.11:56019/Admin/GetStatus',
      type: 'GET',
      dataType: 'JSON',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        this.setState({
          SelectStatu: data,
        });
      }.bind(this),
      error() {
        alert('Error4');
      },
    });
  }
  fillSelectMember() {
    $.ajax({
      url: 'http://192.168.0.11:56019/Admin/GetMember',
      type: 'GET',
      dataType: 'JSON',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        this.setState({
          SelectMember: data,
        });
      }.bind(this),
      error() {
        alert('Error1');
      },
    });
  }
  fillSelectEmployeer() {
    $.ajax({
      url: 'http://192.168.0.11:56019/Admin/GetEmployees',
      type: 'GET',
      dataType: 'JSON',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        this.setState({
          SelectEmployeer: data,
        });
      }.bind(this),
      error() {
        alert('Error3');
      },
    });
  }
  handleChangeProjectValue(event) {
    const categoryValueProject = this.state.categoryValueProject;
    categoryValueProject.forEach((x) => {
      if (x.valueId == event.target.id) {
        x.statu = event.target.value;
      }
    });
    console.log(this.state.categoryValueProject);
    this.setState({ categoryValueProject });
    console.log(event.target.value);
  }
  handleSubmitProjectValue() {
    $.ajax({
      url: 'http://192.168.0.11:56019/Admin/UpdateProjectValue',
      type: 'POST',
      data: JSON.stringify(this.state.categoryValueProject),
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success(response) {
        if (response.success) alert(response.responseText);
        else {
          alert(response.responseText);
        }
      },
      error() {
        alert('Hata,tekrar kontrol ediniz.');
      },
    });
    this.handleSubmitProject();
  }
  handleChangeSale(event) {
    console.log(this.state.categoryValueProject);
    const saleD = this.state.sale;
    saleD[event.target.name] = event.target.value;
    this.setState({ sale: saleD });
    console.log(event.target.value);
  }
  handleSubmitSale() {
    $.ajax({
      url: 'http://192.168.0.11:56019/Admin/UpdateSaleAll',
      type: 'POST',
      data: JSON.stringify(this.state.sale, this.state.saleId),
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success(response) {
        if (response.success) alert(response.responseText);
        else {
          alert(response.responseText);
        }
      },
      error() {
        alert('Hata,tekrar kontrol ediniz.');
      },
    });
  }
  handleChangeProject(event) {
    const project = this.state.project;
    project[event.target.name] = event.target.value;
    this.setState({ project });
    console.log(event.target.value);
  }
  handleSubmitProject() {
    $.ajax({
      url: 'http://192.168.0.11:56019/Admin/UpdateProject',
      type: 'POST',
      data: JSON.stringify(this.state.project),
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success(response) {
        if (response.success) alert(response.responseText);
        else {
          alert(response.responseText);
        }
      },
      error() {
        alert('Hata,tekrar kontrol ediniz.');
      },
    });
  }
  fillProjectInfo() {
    $.ajax({
      url: `http://192.168.0.11:56019/Admin/GetProject/${this.state.projectId}`,
      dataType: 'JSON',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        if (data.exceptedFinish != null) {
          data.exceptedFinish = this.convertDate(data.exceptedFinish);
        }
        if (data.startDate != null) {
          data.startDate = this.convertDate(data.startDate);
        }
        if (data.finishDate != null) {
          this.setState({ isFinish: true });
          data.finishDate = this.convertDate(data.finishDate);
        }

        this.setState({
          project: data,
        });
      }.bind(this),
      error() {
        alert('Error');
      },
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
    shortDate = `${year}-${monthString}-${dayString}`;
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
              <div className="col-lg-12">
                <div className="container">
                  <ul className="nav nav-pills">
                    <li className="active">
                      <a data-toggle="pill" href="#home">
                      Change Project Information
                      </a>
                    </li>
                    <li>
                      <a data-toggle="pill" href="#menu1">
                      Update Project Status
                      </a>
                    </li>
                    <li>
                      <a data-toggle="pill" href="#menu2">
                      Update Project Sales Info
                      </a>
                    </li>
                    <li>
                      <a data-toggle="pill" href="#menu3">
                      Add Picture
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div id="home" className="tab-pane fade in active">
                      <form onSubmit={this.handleSubmitProject}>
                        <h3>Project Information</h3>
                        <div className="form-group row">
                          <label htmlFor="projectName" className="col-2 col-form-label">
                          Project Name
                          </label>
                          <div className="col-10">
                            <input
                              className="form-control"
                              type="text"
                              name="projectName"
                              value={this.state.project.projectName || ''}
                              id="projectName"
                              onChange={this.handleChangeProject}
                              required
                              maxLength={50}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="startDate" className="col-2 col-form-label">
                          Starting date
                          </label>
                          <div className="col-8">
                            <input
                              className="form-control"
                              type="date"
                              name="startDate"
                              value={this.state.project.startDate || ''}
                              id="startDate"
                              onChange={this.handleChangeProject}
                              required
                            />
                          </div>
                        </div>
                        {this.state.isFinish
                          ? <div className="form-group row">
                            <label htmlFor="exceptedFinish" className="col-2 col-form-label">
                            End Date
                              </label>
                            <div className="col-8">
                              <input
                                className="form-control"
                                type="date"
                                name="finishDate"
                                value={this.state.project.finishDate || ''}
                                id="finishDate"
                                onChange={this.handleChangeProject}
                                required
                              />
                            </div>
                          </div>
                          : <div className="form-group row">
                            <label htmlFor="exceptedFinish" className="col-2 col-form-label">
                            Expected End Date
                              </label>
                            <div className="col-8">
                              <input
                                className="form-control"
                                type="date"
                                name="exceptedFinish"
                                value={this.state.project.exceptedFinish || ''}
                                id="exceptedFinish"
                                onChange={this.handleChangeProject}
                                required
                              />
                            </div>
                          </div>}

                        <div className="form-group row">
                          <label htmlFor="description" className="col-2 col-form-label">
                          Explanation
                          </label>
                          <div className="col-10">
                            <input
                              className="form-control"
                              type="text"
                              name="description"
                              value={this.state.project.description || ''}
                              id="description"
                              onChange={this.handleChangeProject}
                              maxLength={250}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="extra" className="col-2 col-form-label">
                          Other informations
                          </label>
                          <div className="col-10">
                            <input
                              className="form-control"
                              type="text"
                              name="extra"
                              value={this.state.project.extra || ''}
                              id="extra"
                              onChange={this.handleChangeProject}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-2 col-form-label">Authorized person</label>
                          <div className="col-10">
                            <select
                              className="form-control"
                              name="employeerId"
                              onChange={this.handleChangeProject}
                              value={this.state.project.employeerId}
                              required
                            >
                              {this.state.SelectEmployeer.map(selections =>
                                <option key={selections.empId} value={selections.empId}>
                                  {selections.name}
                                </option>,
                              )}
                            </select>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-2 col-form-label">Company</label>
                          <div className="col-10">
                            <select
                              className="form-control"
                              name="memberId"
                              onChange={this.handleChangeProject}
                              value={this.state.project.memberId}
                              required
                            >
                              {this.state.SelectMember.map(selections =>
                                <option key={selections.memberId} value={selections.memberId}>
                                  {selections.name}
                                </option>,
                              )}
                            </select>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-2 col-form-label">Statu</label>
                          <div className="col-10">
                            <select
                              className="form-control"
                              name="statuId"
                              onChange={this.handleChangeProject}
                              value={this.state.project.statuId}
                              required
                            >
                              {this.state.SelectStatu.map(selections =>
                                <option key={selections.statuId} value={selections.statuId}>
                                  {selections.statuName}
                                </option>,
                              )}
                            </select>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-2 col-form-label">Category</label>
                          <div className="col-10">
                            <select
                              className="form-control"
                              name="categoryId"
                              onChange={this.handleChangeProject}
                              value={this.state.project.categoryId}
                              required
                            >
                              {this.state.SelectCategory.map(selections =>
                                <option key={selections.categoryId} value={selections.categoryId}>
                                  {selections.categoryName}
                                </option>,
                              )}
                            </select>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="col-2 col-form-label">Percent</label>
                          <div className="col-10">
                            <input
                              type="number"
                              value={this.state.project.percentStatu || ''}
                              onChange={this.handleChangeProject}
                              className="form-control"
                              name="percentStatu"
                              max="100"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <input type="submit" className="btn btn-default" value="Güncelle" />
                        </div>
                      </form>
                    </div>
                    <div id="menu1" className="tab-pane fade">
                      <h3>Project Status Information</h3>
                      <form onSubmit={this.handleSubmitProjectValue}>
                        <div className="form-group row">
                          <label className="col-2 col-form-label">Percent</label>
                          <div className="col-10">
                            <input
                              type="number"
                              value={this.state.project.percentStatu || ''}
                              onChange={this.handleChangeProject}
                              className="form-control"
                              name="percentStatu"
                            />
                          </div>
                        </div>
                        {this.state.col}
                        <div className="form-group row">
                          <input type="submit" className="btn btn-default" value="Güncelle" />
                        </div>
                      </form>
                    </div>
                    <div id="menu2" className="tab-pane fade">
                      <form onSubmit={this.handleSubmitSale}>
                        <h3>Project Sales Information</h3>
                        <div className="form-group row">
                          <label htmlFor="price" className="col-2 col-form-label">
                            Price
                          </label>
                          <div className="col-10">
                            <input
                              className="form-control"
                              type="number"
                              name="price"
                              value={this.state.sale.price || ''}
                              id="price"
                              onChange={this.handleChangeSale}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="hirepurchase" className="col-2 col-form-label">
                          Number of Installments
                          </label>
                          <div className="col-10">
                            <input
                              className="form-control"
                              type="number"
                              name="hirepurchase"
                              value={this.state.sale.hirepurchase || ''}
                              id="hirepurchase"
                              onChange={this.handleChangeSale}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="name" className="col-2 col-form-label">
                          Sold Person Name
                          </label>
                          <div className="col-10">
                            <input
                              className="form-control"
                              type="text"
                              name="name"
                              value={this.state.sale.name || ''}
                              id="name"
                              onChange={this.handleChangeSale}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="surname" className="col-2 col-form-label">
                          Sold Person Surame
                          </label>
                          <div className="col-10">
                            <input
                              className="form-control"
                              type="text"
                              name="surname"
                              value={this.state.sale.surname || ''}
                              id="surname"
                              onChange={this.handleChangeSale}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="description" className="col-2 col-form-label">
                            Descrition
                          </label>
                          <div className="col-10">
                            <input
                              className="form-control"
                              type="text"
                              name="description"
                              value={this.state.sale.description || ''}
                              id="description"
                              onChange={this.handleChangeSale}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="taxno" className="col-2 col-form-label">
                            Tax Number
                          </label>
                          <div className="col-10">
                            <input
                              className="form-control"
                              type="text"
                              name="taxno"
                              value={this.state.sale.taxno || ''}
                              id="taxno"
                              onChange={this.handleChangeSale}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <input type="submit" className="btn btn-default" value="Güncelle" />
                        </div>
                      </form>{' '}
                    </div>
                    <div id="menu3" className="tab-pane fade">
                      <h3>Add Picture</h3>
                      <br />
                      <section>
                        <div className="dropzone">
                          <Dropzone onDrop={this.onDrop}>
                            <p>Drag</p>
                          </Dropzone>
                        </div>
                        <aside>
                          <h2>Dropped files</h2>
                          <ul>
                            {this.state.file.map(f =>
                              <li key={f.size}>
                                <img src={f.preview} width={300} height={300} />
                              </li>,
                            )}
                          </ul>
                        </aside>
                      </section>
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

export default ProjeOzellikDegister;
