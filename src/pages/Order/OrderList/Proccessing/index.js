import { gql } from 'apollo-boost';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { withRouter } from 'react-router-dom';
import OrderTable from './OrderTable';
import Error from '../../../Error';
const ORDER_QUERY = gql`
query getCustomerOrder($taskType: String!, $status: [String!], $branch: BigFloat!) {
  allTasks(filter: {taskType: {equalTo: $taskType}, currentStatus: {in: $status},previousTask: {
    equalTo:"N"}, branchId:{
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

const proccessData = (pdata)=>{
  let result = [];
  
  for (let i = 0;i<pdata.length;i++){
      let row =null;
      let data = pdata[i].customerOrderByCustomerOrder;
      
      row = {
        sn: i+1,
        id: data.id,
        nodeId: data.nodeId,
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


class OrderProcessing extends Component {



  render() {
    let {match,data} = this.props;
    const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
    return (
      <Query
      query={ORDER_QUERY}
      fetchPolicy={"network-only"}
      variables = {{taskType:"TASK_CUSTOMER_ORDER",status: ["APPROVED", "PENDING_SERVING","SERVING"], branch: CURRENT_USER.branch.id }}
 
    >{({ loading, error, data, refetch, }) => {
      if (loading) return null;
      if (refetch) {
        console.log(refetch);
      }
      if (error){
        return <Error errorContent= {error.message}></Error>
      }
      if (data != null){
      return (
        <OrderTable tableName="Đơn hàng đang xử lí" 
        tableDesc="Bao gồm các đơn hàng có trạng thái đã xác nhận, đang chờ xử lí, đang xử lí,... " 
        orderList={proccessData(data.allTasks.nodes)}></OrderTable>
      );
      }
    }}
    </Query>
    );
  }
}
// const queryOptions = {
//   options: props => ({
//     variables: {
//       status: "APPROVED",
//     },
//   }),
//  }

//  OrderProcessing =  graphql(ORDER_QUERY,queryOptions)(OrderProcessing);
export default withRouter(OrderProcessing);
