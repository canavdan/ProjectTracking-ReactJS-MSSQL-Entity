import React from 'react';
import { Circle } from 'rc-progress';
import Progress from 'react-progressbar';
import { Link } from 'react-router-dom';
import HeaderMember from '../../containers/content/templates/HeaderMember';
/* global $ */

class ProjeDetayMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.projectId,
      project: {},
      categoryValues: {},
      col: [],
      imagesHTML: [],
    };
  }
  componentWillMount() {
    this.fillProject();
    this.fillCategoryValues();
    this.fillImages();
  }
  fillImages() {
    const imgS = {
      width: '100%',
      height: '250px',
    };
    const imagesHTMLL = [];
    $.ajax({
      url: `http://192.168.0.11:56019/Member/GetPictures/${this.state.projectId}`,
      type: 'POST',
      dataType: 'JSON',
      contentType: 'application/json; charset=utf-8',
      success(data) {
        const count = Object.keys(data).length;
        console.log(count);
        data.forEach((data) => {
          data.image = `http://192.168.0.11:56019/Pictures/${data.image1}`;
          imagesHTMLL.push(
            <div className="col-md-4" key={data.imageId}>
              <div className="thumbnail">
                <a href={data.image}>
                  <img src={data.image} alt="Lights" style={imgS} />

                  <div className="caption">
                    <p>
                      {data.description}
                    </p>
                  </div>
                </a>
              </div>
            </div>,
          );
        });
      },
      error() {
        alert('Hata,tekrar kontrol ediniz.');
      },
    });
    this.setState({ imagesHTML: imagesHTMLL });
  }
  fillProject() {
    $.ajax({
      url: `http://192.168.0.11:56019/Member/GetProjectDetail/${this.state.projectId}`,
      type: 'POST',
      dataType: 'JSON',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        data.exceptedFinish = this.convertDate(data.exceptedFinish);
        data.startDate = this.convertDate(data.startDate);
        this.setState({
          project: data,
        });
      }.bind(this),
      error() {
        alert('Hata,tekrar kontrol ediniz.');
      },
    });
  }

  fillCategoryValues() {
    const style = {
      height: '150px',
    };
    const style2 = {
      color: 'blue',
    };
    const cols = [];
    $.ajax({
      url: `http://192.168.0.11:56019/Member/GetCategoryValues/${this.state.projectId}`,
      type: 'POST',
      dataType: 'JSON',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        const count = Object.keys(data).length;
        // console.log(count);
        if (count === 1) {
          data.forEach((data) => {
            cols.push(
              <div key={data.valueId} className="col-lg-12">
                {' '}<Circle
                  percent={data.statu}
                  trailWidth={10}
                  strokeColor={'#0BD318'}
                  strokeWidth={10}
                  style={style}
                />
                <br />
                {data.valueName}
              </div>,
            );
          });
        } else if (count === 2) {
          data.forEach((data) => {
            cols.push(
              <div key={data.valueId} className="col-lg-6">
                {' '}<Circle
                  percent={data.statu}
                  trailWidth={10}
                  strokeColor={'#0BD318'}
                  strokeWidth={10}
                  style={style}
                />
                <br />
                <div className="col-lg-6 col-md-offset-1" style={style2}>
                  {data.valueName}
                </div>
              </div>,
            );
          });
        } else if (count === 3) {
          data.forEach((data) => {
            cols.push(
              <div key={data.valueId} className="col-lg-4">
                {' '}<Circle
                  gapDegree={2}
                  style={style}
                  percent={data.statu}
                  trailWidth={7}
                  strokeColor={'#0BD318'}
                  strokeWidth={7}
                />
                <br />
                <div className="col-md-5 col-md-offset-1">{data.valueName}</div>
              </div>,
            );
          });
        } else {
          data.forEach((data) => {
            cols.push(
              <div key={data.valueId} className="col-lg-3">
                {' '}<Circle
                  percent={data.statu}
                  trailWidth={10}
                  strokeColor={'#0BD318'}
                  strokeWidth={10}
                  style={style}
                />
                <br />
                <div className="col-lg-3">{data.valueName}</div>
              </div>,
            );
          });
        }

        this.setState({
          categoryValues: data,
        });
      }.bind(this),
      error() {
        alert('Error');
      },
    });

    this.setState({ col: cols });
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
    const styleBut = {
      height: '35px',
    };
    const styleB = {
      color: 'green',
    };
    return (
      <div>
        <HeaderMember />

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div>
                <Progress height={30} completed={this.state.project.percentStatu} />
                <div className="row">
                  <div className="col-md-7 col-md-offset-5">
                    <h4>
                      Percent <b style={styleB}> {this.state.project.percentStatu}</b> completed.
                    </h4>
                  </div>
                </div>
                <br />
                <div className="row">
                  {this.state.col}
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="panel panel-success">
                      <div className="panel-heading">Project Status</div>
                      <div className="panel-body">
                        {this.state.project.statuName}
                      </div>
                    </div>
                  </div>{' '}
                  <div className="col-lg-4">
                    <div className="panel panel-success">
                      <div className="panel-heading">Start Date</div>
                      <div className="panel-body">
                        {this.state.project.startDate}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="panel panel-success">
                      <div className="panel-heading">Estimated End Date</div>
                      <div className="panel-body">
                        {' '}{this.state.project.exceptedFinish}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="panel panel-success">
                      <div className="panel-heading">Project Name</div>
                      <div className="panel-body">
                        {' '}{this.state.project.projectName}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="panel panel-success">
                      <div className="panel-heading">Sold Person Name</div>
                      <div className="panel-body">
                        <Link to={`/profilim/${this.state.project.memberId}`}>
                          {this.state.project.memberFull}
                        </Link>{' '}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="panel panel-success">
                      <div className="panel-heading">Authorized person
</div>
                      <div className="panel-body">
                        {' '}{this.state.project.empFull}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="panel panel-success">
                      <div className="panel-heading">Description</div>
                      <div className="panel-body">
                        {' '}{this.state.project.description}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <Link
                      to={`/satisdetaymember/${this.state.project.saleId}`}
                      className="btn btn-info"
                      style={styleBut}
                    >
                      Sale Detail
                    </Link>
                  </div>
                </div>

                <div className="row">
                  {this.state.imagesHTML}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProjeDetayMember;
