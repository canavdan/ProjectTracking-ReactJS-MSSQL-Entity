import React from "react";
import HeaderAdmin from "../../containers/content/templates/HeaderAdmin";
import SideBar from "../../containers/content/templates/SideBar";

/* global $*/

class KategoriEkle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: {} };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
    document.title="Kategori Ekle";
  }
  handleSubmit() {
    $.ajax({
      url: "http://192.168.0.11:56019/Admin/AddCategory",
      type: "POST",
      data: JSON.stringify(this.state.category),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success() {
        alert("Eklendi");
      }
    });
  }
  handleChange(event) {
    const category = this.state.category;
    category[event.target.name] = event.target.value;
    //const categoryNamen=event.target.value;
    this.setState({ category: category });
    console.log(event.target.value);
  }
  render() {
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
                <form onSubmit={this.handleSubmit} className="form-horizontal">
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
                  <br />
                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-8">
                      <input
                        type="submit"
                        className="btn btn-default"
                        value="Ekle"
                        required
                        maxLength={50}
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

export default KategoriEkle;
