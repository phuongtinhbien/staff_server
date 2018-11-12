import React, { Component } from 'react';
import generateData from '../generateData';
import { Link, withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import assign from './AssignToWash/assign';

const AUTO_ASSIGN = gql `mutation autoAssignToWash ($brId: BigFloat!, $currUser: BigFloat!){
  assignAutoToWash(input:{
    brId: $brId,
    currUser: $currUser
  }){
    boolean
  }
}`;

const handleOnCompleted = (data,history)=>{
  
  console.log(data);
  // history.push("/order/assign-work");
}

class TableWithLinks extends Component {
  state = {
    items: generateData(),
    errorContent: null,
    successContent: null,
    
  };

  deleteItem = itemId => {
    this.setState({
      items: this.state.items.filter(item => item.id !== itemId)
    });
  }

  render() {
    let { items, isShowingAlert,errorContent,successContent } = this.state;
    let {assignWork, history} = this.props;
    let CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
    return (
      <div className="card">
        <div className="header">
          <h4 className="title">Đơn hàng chờ xử lí</h4>
          <p className="category">Tất cả đơn hàng chưa được phân chia xử lí</p>
        </div>
        <div className="content table-responsive table-full-width">
        <label className="error">{errorContent} </label>
        
         <label className="title">{successContent} </label>
         <br></br>
              <button 
                    type="button"
                    className="btn btn-warning btn-fill btn-wd"
                    data-original-title="View Profile"
                    onClick = {e => (assign(CURRENT_USER.branch.id, CURRENT_USER.id, 'TYPE_1'))}
                  >
                    Phân công loại 1
                  </button> &nbsp;
                    <button 
                    type="button"
                    className="btn btn-warning btn-fill btn-wd"
                    data-original-title="View Profile"
                    onClick = {e => (assign(CURRENT_USER.branch.id, CURRENT_USER.id,'TYPE_2'))}
                  >
                   Phân công loại 2
                  </button>

          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Khách hàng</th>
                <th>Thời gian trả</th>
                <th>Status</th>
                <th className="text-right">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {assignWork.length>0?assignWork.map((item,index) => (
                <tr key={item.id}>
                  <td>{index+1}</td>
                  <td>{item.customerName}</td>
                  <td><strong>{item.deliveryDate}</strong> <br>
                  </br>
                  {item.deliveryTimeStart} &nbsp; - &nbsp; {item.deliveryTimeEnd}
                  </td>
                  <td>
                    {!item.isAssignToWash? (item.washbag>0 ? "Đã phân loại": "Chưa phân loại"): "Đã phân công"}
                    
                  </td>
                  <td className="text-right">
                  {item.washbag<=0 && !item.isAssignToWash &&
                    <Link rel="tooltip"
                      className="btn btn-warning btn-simple btn-xs"
                      data-original-title="View Profile"
                      to={"/order/assign-work/assign/"+ item.nodeId}
                     >
                        Phân loại
                    </Link>
                  }
                  {item.washbag>0 && (!item.isAssignToWash?
                    <Link rel="tooltip"
                      className="btn btn-warning btn-simple btn-xs"
                      data-original-title="View Profile"
                      to={"/order/assign-work/assigntoWash/"+ item.nodeId}
                     >
                        Phân công
                    </Link>:<Link rel="tooltip"
                      className="btn btn-info btn-simple btn-xs"
                      data-original-title="View Profile"
                      to={"/order/assign-work/assigntoWash/"+ item.nodeId}
                     >
                        Xem
                    </Link>
                  )}
                  </td>
                </tr>
              )): <tr><td colSpan="15" className="text-center" >Không có dữ liệu</td></tr>}
            </tbody>
          </table>
         
        </div>
      </div>
    )
  }
}

export default withRouter(TableWithLinks);