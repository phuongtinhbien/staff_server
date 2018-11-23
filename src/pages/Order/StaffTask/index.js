import { gql } from 'apollo-boost';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { withRouter } from 'react-router-dom';
import OrderTable from './OrderTable';
import ReceiptTable from './ReceiptTable';
import status from '../status';
const ORDER_QUERY = gql`
query getCustomerOrder($taskType: String!, $status: [String!], $branch: BigFloat!, $current_staff: BigFloat!) {
  allTasks(filter: {taskType: {equalTo: $taskType}, currentStatus: {in: $status},previousTask: {
    equalTo:"N"},currentStaff:{equalTo:$current_staff}, branchId:{
    equalTo: $branch
  }}) {
    nodes {
      id
      currentStatus
      staffByCurrentStaff{
        id
        fullName
      }
      customerOrderByCustomerOrder {
        nodeId
        id
        branchByBranchId {
          id
          branchName
        }
        customerByCustomerId {
          id
          fullName
        }
        deliveryDate
        timeScheduleByDeliveryTimeId {
          id
          timeStart
          timeEnd
        }
        pickUpDate
        timeScheduleByPickUpTimeId {
          id
          timeStart
          timeEnd
        }
      }
    }
  }
}`;

const RECEIPT_QUERY = gql`
query getReceiptShipper ($current_staff: BigFloat!){
  allReceipts(filter:{
    staffPickUp: {equalTo:$current_staff},
    status: {in:["PENDING", "PENDING_DELIVERY"]}
    or:{staffDelivery: {equalTo: $current_staff}}
    }){
    nodes{
      nodeId
        id
        status
        customerOrderByOrderId {
        nodeId
        id
        customerByCustomerId {
          id
          fullName
        }
        deliveryDate
        timeScheduleByDeliveryTimeId {
          id
          timeStart
          timeEnd
        }
        pickUpDate
        timeScheduleByPickUpTimeId {
          id
          timeStart
          timeEnd
        }
    }
  }
  }
}`;

const proccessData = (pdata)=>{
  let result = [];
  
  for (let i = 0;i<pdata.length;i++){
      let row =null;
      let data = pdata[i].customerOrderByCustomerOrder;
      
      row = {
        sn: i+1,
        nodeId: data.nodeId,
        cusstomerOrderId: data.id,
        customerName: data.customerByCustomerId.fullName,
        branch: data.branchByBranchId.branchName.replace("CHI NHANH ",""),
        deliveryDate: data.deliveryDate,
        deliveryTime: data.timeScheduleByDeliveryTimeId.timeStart + " - " +data.timeScheduleByDeliveryTimeId.timeEnd,
        pickUpDate: data.pickUpDate,
        pickUpTime: data.timeScheduleByPickUpTimeId.timeStart + " - " +data.timeScheduleByPickUpTimeId.timeEnd,
        amount: "_",
        status: pdata[i].currentStatus,
        currentStaff: pdata[i].staffByCurrentStaff.fullName
      }
      result.push(row);
  }
  return result;
};

const proccessData1 = (pdata)=>{
  let result = [];
  
  for (let i = 0;i<pdata.length;i++){
      let row =null;
      let data = pdata[i];
      row = {
        sn: i+1,
        nodeId: data.nodeId,
        id: data.id,
        customerName: data.customerOrderByOrderId.customerByCustomerId.fullName,
        deliveryDate: data.customerOrderByOrderId.deliveryDate,
        deliveryTime: data.customerOrderByOrderId.timeScheduleByDeliveryTimeId.timeStart + " - " +data.customerOrderByOrderId.timeScheduleByDeliveryTimeId.timeEnd,
        pickUpDate: data.customerOrderByOrderId.pickUpDate,
        pickUpTime: data.customerOrderByOrderId.timeScheduleByPickUpTimeId.timeStart + " - " +data.customerOrderByOrderId.timeScheduleByPickUpTimeId.timeEnd,
        status: status(data.status)
      }
      result.push(row);
  }
  return result;
};


class OrderProcessing extends Component {



  render() {
    let {match,data} = this.props;
    const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
    return (
      <div>
      {CURRENT_USER.staffType.staffCode === "STAFF_02" &&  <Query
      query={ORDER_QUERY}
      fetchPolicy={"network-only"}
      variables = {{taskType:"TASK_CUSTOMER_ORDER",status: ["SERVING", "FINISHED_SERVING"], branch: CURRENT_USER.branch.id, current_staff:CURRENT_USER.id  }}
 
    >{({ loading, error, data, refetch, }) => {
      if (loading) return null;
      if (refetch) {
        console.log(refetch);
      }
      if (error){
      }
      if (data != null){
      return (
        <OrderTable tableName="Đơn hàng của bạn" 
        tableDesc="Danh sách đang được xử lí bởi bạn" 
        orderList={proccessData(data.allTasks.nodes)}></OrderTable>
      );
      }
    }}
    </Query>}
    {CURRENT_USER.staffType.staffCode === "STAFF_03" && <Query
      query={RECEIPT_QUERY}
      fetchPolicy={"network-only"}
      variables = {{current_staff:CURRENT_USER.id  }}
 
    >{({ loading, error, data, refetch, }) => {
      if (loading) return null;
      if (refetch) {
        console.log(refetch);
      }
      if (error){
      }
      if (data != null){
      return (
        <ReceiptTable tableName="Biên nhận của bạn" 
        tableDesc="Danh sách đang được xử lí bởi bạn" 
        orderList={proccessData1(data.allReceipts.nodes)}></ReceiptTable>
      );
      }
    }}
    </Query>}
      </div>
      
     
    );
  }
}

export default withRouter(OrderProcessing);
