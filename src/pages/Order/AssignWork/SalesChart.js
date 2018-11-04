import React from 'react';
import Chart from 'react-chartist';

let data = {
  labels: ['Washer 1','Washer 2', 'Washer 3','Washer 4'],
  series: [
    [100, 20, 10, 5],
    [20, 10, 50, 2]
  ]
};

let options = {
  seriesBarDistance: 10,
  axisX: {
    showGrid: false
  },
  height: "245px"
};

let responsiveOptions = [
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
];

const SalesChart = () => (
  <div className="card ">
    <div className="header">
      <h4 className="title">Tình trạng máy giặt</h4>
      <p className="category">Tất cả đơn hàng đang chờ và đã xử lí</p>
    </div>
    <div className="content">
      <Chart data={data} options={options} responsiveOptions={responsiveOptions} type="Bar" className="ct-chart" />

    </div>
    <div className="footer">
      <div className="legend">
        <div className="item">
          <i className="fa fa-circle text-info"></i> Đang chờ
        </div>
        <div className="item">
          <i className="fa fa-circle text-danger"></i> Hoàn tất
        </div>
      </div>
      <hr />
      <div className="stats">
        <i className="fa fa-check"></i> Data information certified
          </div>
    </div>
  </div>
);

export default SalesChart;