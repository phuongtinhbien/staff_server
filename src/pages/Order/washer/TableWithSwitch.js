import React, { Component } from 'react';
import Switch from 'components/Switch';
import gql from 'graphql-tag';
import status from '../status';
import { Mutation } from 'react-apollo';
import NotificationSystem from 'react-notification-system';
import { Link} from 'react-router-dom';
import assign from '../AssignWork/AssignToWash/assign';

const UPDATE_WASHER_STATUS = gql `mutation updateStatusWasher($brId: BigFloat!, $id: BigFloat!, $status: String!, $currUser: BigFloat!) {
  updateWashingMachineById(input: {id: $id, washingMachinePatch: {status: $status, updateBy: $currUser}}) {
    washingMachine {
      nodeId
      id
      washerCode
      status
    }
  }
  updateServingWash(input: {brId: $brId, washerId: $id, currUser: $currUser}) {
    washingMachine {
      nodeId
      id
      washerCode
      status
    }
  }
}
`;

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
          <p className="category">Quản lí trạng thái máy giặt. Thay đổi khi có vấn đề với máy giặt</p>
          <p className="error">{success}</p>
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã máy giặt</th>
                <th>Trạng thái</th>

                {(CURRENT_USER.staffType.staffCode === "STAFF_01" ||CURRENT_USER.staffType.staffCode === "STAFF_02") && <th>Chức năng</th>}
              </tr>
            </thead>
            <tbody>
              {washer.map((item,index)=> (
                <tr key={item.id}>
                  <td>{index+1}</td>
                  <td><Link rel="tooltip"
                      className="btn btn-success btn-fill btn-sm btn-xs"
                      data-original-title="View Profile" to={"assign-work/assignWorkDetail/"+item.washerCode}><strong>{item.washerCode}</strong> </Link></td>
                  <td>{status(item.status)}</td>
                  {(CURRENT_USER.staffType.staffCode === "STAFF_01" ||CURRENT_USER.staffType.staffCode === "STAFF_02") &&
                  <td>
                  <Mutation
                    mutation={UPDATE_WASHER_STATUS}
                    onCompleted={data=> {
                      
                      this.showNotification("Cập nhật thành công " + data.updateWashingMachineById.washingMachine.washerCode, "success") ;
                      assign(CURRENT_USER.branch.id, CURRENT_USER.id);
                      this.showNotification("Phân công xử lí đã thay đổi với " + data.updateWashingMachineById.washingMachine.washerCode, "info") ;
                     }}
                    onError={error => this.showNotification(error.message, "error")}
                  >
                  {
                    (updateStatusWasher) =>(
                    <div>

                      <Switch value={item.status==="ACTIVE"?true: false}   onChange={() => {updateStatusWasher({variables:{brId: CURRENT_USER.branch.id, id:item.id,currUser: CURRENT_USER.id, status: item.status ==="ACTIVE"?"INACTIVE":"ACTIVE" }});
                     }} />
                      
                    </div>
                    )
                  }
          
          </Mutation>
                  </td>}
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