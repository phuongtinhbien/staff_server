import React from 'react';
import ReactChartist from 'react-chartist';
import Chartist from 'chartist';

const dataPreferences = {
  labels: ['62%','32%'],
  series: [62, 32]
};

const optionsPreferences = {
  donut: true,
  donutWidth: 80,
  startAngle: 0,
  height: "245px",
  total: 100,
  showLabel: true,
  axisX: {
    showGrid: false,
    offset: 0
  },
  axisY: {
    offset: 0
  }
};

const PublicPreference = ({dataChart}) => (
  <div className="card">
    <div className="header">
      <h4>Thông tin xử lí</h4>
      <p className="category">Bao gồm: đơn hàng đã xử lí, đang chờ, ...</p>
    </div>
    <div className="content">
      <ReactChartist data={dataChart} options={optionsPreferences}  type="Pie" className="ct-chart" />
    </div>
    <div className="footer">
      <h6>Chú thích</h6>
      <i className="fa fa-circle text-info"></i> Đơn hàng đang chờ &nbsp;
      <i className="fa fa-circle text-danger"></i> Đơn hàng đã xử lí 
    </div>
  </div>
);

export default PublicPreference;