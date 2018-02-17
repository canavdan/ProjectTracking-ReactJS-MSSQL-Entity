import React from "react";
import HeaderAdmin from "../../containers/content/templates/HeaderAdmin";
import SideBar from "../../containers/content/templates/SideBar";

/* global $*/

class KatOzDegistir extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryValue: {
        categoryId: null,
        categoryValueId: null,
        name: ""
      },
      selectCategory: [],
      selectCategoryValue: [],
      nameValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    document.title = "Change Category Features";
    this.fillCategorySelect();
    console.log(this.state.categoryValue);
  }
  fillCategoryValueSelect() {
    $.ajax({
      url: `http://192.168.0.11:56019/Admin/GetCategoryValue/${this.state
        .categoryValue.categoryId}`,
      type: "POST",
      dataType: "JSON",
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        // const categoryValue = this.state.categoryValue;
        // categoryValue["name"] = data[0].name;

        this.setState({
          selectCategoryValue: data
          // categoryValue: categoryValue
        });
      }.bind(this)
    });
  }
  fillCategorySelect() {
    $.ajax({
      url: "http://192.168.0.11:56019/Admin/GetCategories",
      type: "GET",
      dataType: "JSON",
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        // const categoryValue = this.state.categoryValue;
        // categoryValue["categoryId"] = data[0].categoryId;
        this.setState({
          selectCategory: data
          // categoryValue: categoryValue
        });
      }.bind(this),
      error() {
        alert("Error");
      }
    });
  }
  handleSubmit() {
    const catVal = this.state.categoryValue;
    console.log(catVal);
    if (
      catVal.categoryId == null ||
      catVal.categoryId == 0 ||
      catVal.categoryValueId == null ||
      catVal.categoryValueId == null ||
      catVal.name == ""
    ) {
      alert("Tüm alanlar doldurulmalıdır.");
    } else {
      $.ajax({
        url: "http://192.168.0.11:56019/Admin/UpdateCategoryValue",
        type: "POST",
        data: JSON.stringify(this.state.categoryValue),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success() {
          alert("Güncellendi");
        },
        error() {
          alert("Hata,tekrar kontrol ediniz.");
        }
      });
    }
  }
  handleChange(event) {
    const categoryValue = this.state.categoryValue;
    categoryValue[event.target.name] = event.target.value;
    this.setState({ categoryValue: categoryValue });
    console.log(this.state.categoryValue);
    if (event.target.name == "categoryId") {
      this.fillCategoryValueSelect();
    }
    if (event.target.name == "categoryValueId") {
      const { options, selectedIndex } = event.target;
      const categoryValue = this.state.categoryValue;
      if (options[selectedIndex].innerHTML == "Choose") {
        categoryValue.name = null;
        this.setState({ categoryValue: categoryValue });
      } else {
        categoryValue.name = options[selectedIndex].innerHTML;
        this.setState({ categoryValue: categoryValue });
      }
    }
  }
  fillInputName() {
    console.log(`Name${this.state.selectCategoryValue[1]}`);
  }
  handleDelete() {
    $.ajax({
      url: `http://192.168.0.11:56019/Admin/DeleteCategoryValue/${this.state
        .categoryValue.categoryValueId}`,
      type: "POST",
      data: JSON.stringify(this.state.categoryValue.categoryValueId),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success(response) {
        if (response.success) alert(response.responseText);
        else {
          alert(response.responseText);
        }
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
                  <div className="from-group">
                    <label className="control-label col-sm-2">
                      Choose Category Attribute:
                    </label>

                    <div className="col-sm-8">
                      <select
                        className="form-control"
                        name="categoryValueId"
                        onChange={this.handleChange}
                        required
                      >
                        <option key={0} value="">
                          Choose
                        </option>
                        {this.state.selectCategoryValue.map(selections =>
                          <option
                            key={selections.categoryValueId}
                            value={selections.categoryValueId}
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
                        value={this.state.categoryValue.name}
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-8">
                      <input
                        type="submit"
                        className="btn btn-default"
                        value="Güncelle"
                      />
                      {this.state.categoryValue.categoryValueId > 0
                        ? <input
                            type="button"
                            className="btn btn-primary"
                            value="Sil"
                            onClick={this.handleDelete}
                          />
                        : ""}
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

export default KatOzDegistir;
