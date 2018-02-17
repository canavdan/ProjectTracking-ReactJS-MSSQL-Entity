import React from "react";
/* global $, angular, React */
class OptionStatu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValueStatus: null,
      selectedOptionsStatu: {}
    };
  }

  componentWillMount() {
    $.ajax({
      url: "http://192.168.0.11:56019/Admin/GetStatu",
      type: "GET",
      dataType: "JSON",
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        this.setState({
          selectedOptionsStatus: data,
          selectedValueStatu: data[0].statuName
        });
      }.bind(this),
      error() {
        alert("Error");
      }
    });
    console.log(this.state.selectedValueStatus);
  }
ListOptions(selections) {
  console.log("asdaasdsad");
  return( <option value={selections.statuId}>
        {selections.statuName}</option>);
}
  render() {
    //const options = [];
    //console.log(this.state.selectedOptionsStatu);
    //const datas = this.state.selectedOptionsStatu.map(selections =>
      //<option value={selections.statuId}>
      //  {selections.statuName}
      //</option>
   // );
    

    return (
      <select
        className="form-control"
        name="statuId"
        onChange={this.handleChange}
      >
      { this.state.selectedOptionsStatus.map(selections =>
      {this.ListOptions(selections)}
      )}
      </select>
    );
  }
}


export default OptionStatu;
