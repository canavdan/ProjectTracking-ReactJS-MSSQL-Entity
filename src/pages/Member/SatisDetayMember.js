import React from 'react';
import HeaderMember from '../../containers/content/templates/HeaderMember';
/* global $ */
class SatisDetayMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saleId: this.props.match.params.saleId,
      sale: {},
    };
  }
  componentWillMount() {
    $.ajax({
      url: `http://192.168.0.11:56019/Member/GetSale/${this.state.saleId}`,
      type: 'POST',
      dataType: 'JSON',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        data.dateSell = this.convertDate(data.dateSell);
        console.log(data);
        this.setState({
          sale: data,
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
    shortDate = `${monthString}/${dayString}/${year}`;
    return shortDate;
  }
  render() {
    return (
      <div>
        <HeaderMember />

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <br />
              <div className="col-lg-4">
                <div className="panel-group">
                  <div className="panel panel-primary">
                    <div className="panel-heading">Name Surname</div>
                    <div className="panel-body">
                      {this.state.sale.fullName}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="panel-group">
                  <div className="panel panel-primary">
                    <div className="panel-heading">Price</div>
                    <div className="panel-body">
                      {this.state.sale.price}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="panel-group">
                  <div className="panel panel-primary">
                    <div className="panel-heading">Number of Installments</div>
                    <div className="panel-body">
                      {this.state.sale.hirepurchase}
                    </div>
                  </div>
                </div>
              </div>{' '}
              <div className="col-lg-4">
                <div className="panel-group">
                  <div className="panel panel-primary">
                    <div className="panel-heading">Description</div>
                    <div className="panel-body">
                      {this.state.sale.description}
                    </div>
                  </div>
                </div>
              </div>{' '}
              <div className="col-lg-4">
                <div className="panel-group">
                  <div className="panel panel-primary">
                    <div className="panel-heading">Tax No</div>
                    <div className="panel-body">
                      {this.state.sale.taxno}{' '}
                    </div>
                  </div>
                </div>{' '}
              </div>
              <div className="col-lg-4">
                <div className="panel-group">
                  <div className="panel panel-primary">
                    <div className="panel-heading">Date</div>
                    <div className="panel-body">
                      {this.state.sale.dateSell}
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

export default SatisDetayMember;
