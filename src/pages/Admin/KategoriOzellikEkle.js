import React from "react";
import HeaderAdmin from "../../containers/content/templates/HeaderAdmin";
import SideBar from "../../containers/content/templates/SideBar";
/* global $*/
class KategoriOzellikEkle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryValue: {},
      selectCategory: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const categoryValue = this.state.categoryValue;
    categoryValue[event.target.name] = event.target.value;
    this.setState({ categoryValue: categoryValue });
    console.log(event.target.value);
    console.log(this.state.categoryValue);
  }
  handleSubmit() {
    $.ajax({
      url: "http://192.168.0.11:56019/Admin/AddCategoryValue",
      type: "POST",
      data: JSON.stringify(this.state.categoryValue),
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
  componentWillMount() {
    document.title = "Category Add Attribute";
    this.fillCategorySelect();
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
      error() {
        alert("Error");
      }
    });
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
                  <div className="from-group">
                    <label className="control-label col-sm-2">
                      Choose Category:
                    </label>

                    <div className="col-sm-8">
                      <select
                        className="form-control"
                        name="categoryId"
                        onChange={this.handleChange}
                        required
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
                  <div className="form-group">
                    <label className="control-label col-sm-2">
                    Category Features Name:
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={this.handleChange}
                        required
                        maxLength={50}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-sm-2">Description: </label>
                    <div className="col-sm-8">
                      <textarea
                        className="form-control"
                        name="description"
                        onChange={this.handleChange}
                        maxLength={50}
                      />
                    </div>
                  </div>
                  <br />

                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-8">
                      <input
                        type="submit"
                        className="btn btn-default"
                        value="Ekle"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default KategoriOzellikEkle;
