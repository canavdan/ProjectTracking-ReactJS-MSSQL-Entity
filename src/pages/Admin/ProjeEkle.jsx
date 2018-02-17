import React from "react";
import HeaderAdmin from "../../containers/content/templates/HeaderAdmin";
import SideBar from "../../containers/content/templates/SideBar";

/* global $ */
class ProjeEkle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      statu: {},
      selectedValueStatu: null,
      selectedOptionsStatu: [],
      selectEmployeeList: [],
      selectCategory: [],
      selectMember: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    document.title = "Proje Ekle";
    this.fillStatuProject();
    this.fillEmployeeSelect();
    this.fillCategorySelect();
    this.fillMemberSelect();
  }
  fillMemberSelect() {
    $.ajax({
      url: "http://192.168.0.11:56019/Admin/GetMember",
      type: "GET",
      dataType: "JSON",
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        this.setState({
          selectMember: data
        });
        console.log(this.state.selectMember);
      }.bind(this),
      error() {
        alert("Error1");
      }
    });
  }
  fillCategorySelect() {
    $.ajax({
      url: "http://192.168.0.11:56019/Admin/GetCategories",
      type: "GET",
      dataType: "JSON",
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        this.setState({
          selectCategory: data
        });
      }.bind(this),
      error(xhr, ajaxOptions, thrownError) {
        alert(xhr.status);

        alert("Error2");
      }
    });
  }

  fillEmployeeSelect() {
    $.ajax({
      url: "http://192.168.0.11:56019/Admin/GetEmployees",
      type: "GET",
      dataType: "JSON",
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        this.setState({
          selectEmployeeList: data
        });
      }.bind(this),
      error() {
        alert("Error3");
      }
    });
  }
  fillStatuProject() {
    $.ajax({
      url: "http://192.168.0.11:56019/Admin/GetStatus",
      type: "GET",
      dataType: "JSON",
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        this.setState({
          selectedOptionsStatu: data
        });
      }.bind(this),
      error() {
        alert("Error4");
      }
    });
  }

  handleChange(event) {
    const project = this.state.project;
    project[event.target.name] = event.target.value;
    this.setState({ project: project });
    console.log(this.state.project);
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
  handleSubmit() {
    if (
      new Date(this.state.project.exceptedFinish).getTime() <
      new Date().getTime()
    ) {
      alert("Tahmini Bitiş ileri tarihte olmalıdır");
    } else {
      $.ajax({
        url: "http://192.168.0.11:56019/Admin/AddProject",
        type: "POST",
        data: JSON.stringify(this.state.project),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success() {
          alert("Eklendi");
        },
        error() {
          alert("Eklendi");
        }
      });
    }
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
                <form onSubmit={this.handleSubmit} className="form-horizontal">
                  <div className="form-group">
                    <label
                      htmlFor="projectName"
                      className="control-label col-sm-2"
                    >
                      Project Name:
                    </label>
                    <div className="col-sm-6">
                      <input
                        id="projectName"
                        type="text"
                        className="form-control"
                        name="projectName"
                        onChange={this.handleChange}
                        value={this.state.project.projectName}
                        required
                        maxLength={50}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-2">Descriptoin: </label>
                    <div className="col-sm-8">
                      <textarea
                        className="form-control"
                        name="description"
                        onChange={this.handleChange}
                        value={this.state.project.description}
                        maxLength={250}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-2">
                      Start Date:
                    </label>
                    <div className="col-sm-8">
                      {" "}<input
                        type="date"
                        className="form-control"
                        name="startDate"
                        onChange={this.handleChange}
                        value={this.state.project.startDate}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-2">
                    Estimated Expiration Date:
                    </label>
                    <div className="col-sm-8">
                      {" "}<input
                        type="date"
                        className="form-control"
                        name="exceptedFinish"
                        onChange={this.handleChange}
                        value={this.state.project.exceptedFinish}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-2">Statu:</label>
                    <div className="col-sm-8">
                      <select
                        required
                        className="form-control"
                        name="statuId"
                        onChange={this.handleChange}
                      >
                        <option key={0} value="">
                          Choose
                        </option>
                        {this.state.selectedOptionsStatu.map(selections =>
                          <option
                            key={selections.statuId}
                            value={selections.statuId}
                          >
                            {selections.statuName}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="from-group">
                    <label className="control-label col-sm-2">
                    Person in charge:
                    </label>
                    <div className="col-sm-8">
                      <select
                        required
                        className="form-control"
                        name="employeerId"
                        onChange={this.handleChange}
                      >
                        <option key={0} value="">
                        Choose
                        </option>
                        {this.state.selectEmployeeList.map(selections =>
                          <option
                            key={selections.empId}
                            value={selections.empId}
                          >
                            {selections.name}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div className="from-group">
                    <label className="control-label col-sm-2">
                    Company or Person to be Delivered
                    </label>
                    <div className="col-sm-8">
                      <select
                        required
                        className="form-control"
                        name="memberId"
                        onChange={this.handleChange}
                      >
                        <option key={0} value="">
                        Choose
                        </option>
                        {this.state.selectMember.map(selections =>
                          <option
                            key={selections.memberId}
                            value={selections.memberId}
                          >
                            {selections.name}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div className="from-group">
                    <label className="control-label col-sm-2">Category:</label>

                    <div className="col-sm-8">
                      <select
                        required
                        className="form-control"
                        name="categoryId"
                        onChange={this.handleChange}
                      >
                        <option key={0} value="">
                        Choose
                        </option>
                        {this.state.selectCategory.map(selections =>
                          <option
                            key={selections.categoryId}
                            value={selections.categoryId}
                          >
                            {selections.categoryName}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="from-group">
                    <label className="control-label col-sm-2">
                      Extra Info:{" "}
                    </label>

                    <div className="col-sm-8">
                      <textarea
                        className="form-control"
                        name="extra"
                        onChange={this.handleChange}
                        value={this.state.project.extra}
                        maxLength={250}
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-8">
                      <input
                        type="submit"
                        className="btn btn-default"
                        value="Add"
                      />
                    </div>
                  </div>
                </form>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjeEkle;
