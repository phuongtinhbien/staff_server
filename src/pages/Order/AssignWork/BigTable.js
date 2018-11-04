import React from 'react';
import generateData from '../generateData';
import moment from 'moment';
const data = generateData(10);

const BigTable = () => (
  <div className="card">
    <div className="header text-center">
      <h4 className="title">Kết quả phân công</h4>
      <p className="category">Kết quả tự động lưu vào hệ thống</p>
      <br />
    </div>
    <div className="content table-responsive table-full-width">
      <table className="table table-bigboy">
        <thead>
          <tr>
            <th>Khách hàng</th>
            <th className="th-description">Đơn hàng</th>
            <th className="text-right">Biên nhận</th>
            <th className="text-right">Máy giặt</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr>
              <td>
                <div className="img-container">
                  <img src={item.avatar} alt={item.name} />
                </div>
              </td>
              <td className="td-name">
                {item.name}
              </td>
              <td>
                {item.description}
              </td>
              <td className="td-number">{moment(item.birthdate).format('YYYY-MM-DD')}</td>
              <td className="td-actions">
                <button type="button" rel="tooltip" data-placement="left" title="" className="btn btn-info btn-simple btn-icon" data-original-title="View Post">
                  <i className="fa fa-image"></i>
                </button>
                <button type="button" rel="tooltip" data-placement="left" title="" className="btn btn-success btn-simple btn-icon" data-original-title="Edit Post">
                  <i className="fa fa-edit"></i>
                </button>
                <button type="button" rel="tooltip" data-placement="left" title="" className="btn btn-danger btn-simple btn-icon " data-original-title="Remove Post">
                  <i className="fa fa-times"></i>
                </button>
              </td>
            </tr>
          ))}


        </tbody>
      </table>
    </div>
  </div>
);

export default BigTable;