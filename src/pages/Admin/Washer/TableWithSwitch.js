import React, { Component } from 'react';
import Switch from 'components/Switch';
import gql from 'graphql-tag';
import status from '../../Order/status';
import { Mutation } from 'react-apollo';
import NotificationSystem from 'react-notification-system';
import { Link} from 'react-router-dom';



class TableWithSwitch extends Component {
  state ={
    success: null,
    errorContent: null
  }
  toggleActive = (itemId,washer) => {
      washer = washer.map(item => {
        if (item.id === itemId) {
          item.status = item.status ==="ACTIVE"?"INACTIVE":"ACTIVE";
        }
        return item;
      });
  }

  showNotification(message, level) {
    this.notificationSystem.addNotification({
      message: message,
      level: level,
      autoDismiss: 1,
      position: "tc"
    });
  }

  render() {
    let {washer,history} = this.props;
    let {success} = this.state;
    let CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
    console.log(washer);
    return (
      <div className="card">
        <div className="header">
          <h4 className="title">Máy giặt của chi nhánh</h4>
          <p className="category">Xem thông tin các máy ở các chi nhánh</p>
          <p className="error">{success}</p>
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Chi nhánh</th>
                <th>Mã máy giặt</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {washer.map((item,index)=> (
                <tr key={item.id}>
                  <td>{index+1}</td>
                  <td>{item.branchByBranchId.branchName}</td>
                  <td><span rel="tooltip"
                      className={(item.status === 'INACTIVE'?" btn btn-fill btn-sm btn-xs btn-danger" :" btn btn-fill btn-sm btn-xs btn-success")}
                      data-original-title="View Profile" ><strong>{item.washerCode}</strong> </span></td>
                  <td>{status(item.status)}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
          <NotificationSystem
                ref={ref => this.notificationSystem = ref} />
        </div>
      </div>
    )
  }
}

export default TableWithSwitch;