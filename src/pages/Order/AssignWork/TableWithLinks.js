import React, { Component } from 'react';
import generateData from '../generateData';
import { Link } from 'react-router-dom';
class TableWithLinks extends Component {
  state = {
    items: generateData()
  };

  deleteItem = itemId => {
    this.setState({
      items: this.state.items.filter(item => item.id !== itemId)
    });
  }

  render() {
    let { items, isShowingAlert } = this.state;
    let {assignWork} = this.props;
    return (
      <div className="card">
        <div className="header">
          <h4 className="title">Đơn hàng chờ xử lí</h4>
          <p className="category">Tất cả đơn hàng chưa được phân chia xử lí</p>
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Khách hàng</th>
                <th>Thời gian trả</th>
                <th className="text-right">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {assignWork.map((item,index) => (
                <tr key={item.id}>
                  <td>{index+1}</td>
                  <td>{item.customerName}</td>
                  <td><strong>{item.deliveryDate}</strong> <br>
                  </br>
                  {item.deliveryTimeStart} &nbsp; - &nbsp; {item.deliveryTimeEnd}
                  </td>
                  <td className="text-right">
                    <Link rel="tooltip"
                      className="btn btn-warning btn-simple btn-xs"
                      data-original-title="View Profile"
                      to={"/order/assign-work/assign/"+ item.nodeId}
                     >
                        Phân chia
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link rel="tooltip"
                      className="btn btn-warning btn-fill btn-wd"
                      data-original-title="View Profile"
                      to={"/order/assign-work/assign/"}
                     >
                       Tự động phân chia
                    </Link>

        </div>
      </div>
    )
  }
}

export default TableWithLinks;