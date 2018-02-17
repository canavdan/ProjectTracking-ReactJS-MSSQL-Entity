import React from "react";
import HeaderAdmin from "../../containers/content/templates/HeaderAdmin";
import SideBar from "../../containers/content/templates/SideBar";
/* global $*/
class KategoriDuzenle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      selectCategory: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleChange(event) {
    const category = this.state.category;
    category[event.target.name] = event.target.value;
    this.setState({ category: category });
    console.log(event.target.value);
    console.log(this.state.category);
    if (event.target.name == "categoryId") {
      const { options, selectedIndex } = event.target;
      const category = this.state.category;
      if (options[selectedIndex].innerHTML == "Choose") {
        category["categoryName"] = null;
        this.setState({ category: category });
      } else {
        category["categoryName"] = options[selectedIndex].innerHTML;
        this.setState({ category: category });
      }
    }
  }
  handleDelete() {
    $.ajax({
      url:
        "http://192.168.0.11:56019/Admin/DeleteCategory/" +
        this.state.category.categoryId,
      type: "POST",
      data: JSON.stringify(this.state.category.categoryId),
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
  handleSubmit() {
    $.ajax({
      url: "http://192.168.0.11:56019/Admin/UpdateCategory",
      type: "POST",
      data: JSON.stringify(this.state.category),
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
  componentWillMount() {
    document.title = "Kategori Düzenle";
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
                        <option value="" key={0}>
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
                      Category Name:
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        name="categoryName"
                        onChange={this.handleChange}
                        value={this.state.category.categoryName}
                        required
                      />
                    </div>
                  </div>
                  <br />

                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-8">
                      <input
                        type="submit"
                        className="btn btn-default"
                        value="Düzenle"
                      />
                      <input
                        type="button"
                        className="btn btn-primary"
                        value="Sil"
                        onClick={this.handleDelete}
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

export default KategoriDuzenle;
