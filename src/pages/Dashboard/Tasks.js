import React, { Component } from 'react';
import status from '../Order/status';
import {
  Link
} from "react-router-dom";
class Tasks extends Component {
  state = {
      todos:this.props.resultSearch
  };
  render() {
    console.log(this.props)
    let {resultSearch} = this.props;
    return (
      <div className="card ">
        <div className="header">
          <h4 className="title">Kết quả</h4>
          <p className="category">Kết quả tìm kiếm đơn hàng</p>
        </div>
        <div className="content">
          <form>
          {resultSearch && resultSearch.length>0?resultSearch.map(todo => (
            <div className={"todo-item"} key={todo.id}>
              <div className="todo-item-wrapper">
                <div className="todo-content">
                <Link to={"/order/order-list/view/"+ todo.nodeId} className="btn btn-fill btn-sm btn-success">{todo.customerByCustomerId.fullName} </Link>
                &nbsp;
                <i>{status(todo.status)}</i>
                <br></br>
                <strong>Email:&nbsp;</strong> {todo.customerByCustomerId.email}
                <br></br>
                <strong>Số điện thoại:&nbsp;</strong>  {todo.customerByCustomerId.phone}
                
                </div>
               
              </div>
            </div>
          )):<p className="error">Không có kết quả</p> }
          </form>


        </div>
        <div className="footer">
          <hr />
          <div className="stats">
            <i className="fa fa-history"> Tổng cộng: &nbsp;{resultSearch?resultSearch.length: "_"} &nbsp; kết quả</i>
              </div>
        </div>
      </div>
    );
  }
}

export default Tasks;