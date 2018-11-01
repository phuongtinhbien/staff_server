import React, { Component } from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import OrderTable from './OrderTable';
import { Link, withRouter } from 'react-router-dom';
import {graphql } from 'react-apollo';
import {gql} from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';

const ORDER_QUERY = gql`
query getCustomerOrder($taskType: String!, $status: [String!], $branch: BigFloat!) {
  allTasks(filter: {taskType: {equalTo: $taskType}, currentStatus: {in: $status},previousTask: {
    equalTo:"N"}, branchId:{
    equalTo: $branch
  }}) {
    nodes {
      id
      currentStatus
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
const AMOUNT_QUERY = gql`query calAmount ($customerid : BigFloat!, $customerorder: BigFloat!){
    getamountoforderbycustomerid(customerid: $customerid,
    customerorder: $customerorder)
  }`;
const calAmount = (customerId, customerOrder)=>{
    return(
      <Query
      query={AMOUNT_QUERY}
      variables = {{customerid: customerId, customerorder:customerOrder  }}>
        {({ loading, error, data, refetch }) => {
          if (loading) return  null;
          if (data != null){
            return (<p>{data.getamountoforderbycustomerid}</p>);
           
          }
        }
        }
        </Query>
    );
}

const proccessData = (pdata)=>{
  let result = [];
  
  for (let i = 0;i<pdata.length;i++){
      let row =null;
      let data = pdata[i].customerOrderByCustomerOrder;
      
      row = {
        sn: i+1,
        nodeId: data.nodeId,
        customerName: data.customerByCustomerId.fullName,
        branch: data.branchByBranchId.branchName.replace("CHI NHANH ",""),
        deliveryDate: data.deliveryDate,
        deliveryTime: data.timeScheduleByDeliveryTimeId.timeStart + " - " +data.timeScheduleByDeliveryTimeId.timeEnd,
        pickUpDate: data.pickUpDate,
        pickUpTime: data.timeScheduleByDeliveryTimeId.timeStart + " - " +data.timeScheduleByDeliveryTimeId.timeEnd,
        amount: calAmount(data.customerByCustomerId.id,data.id ),
        status: pdata[i].currentStatus
      }
      result.push(row);
      console.log(row);
  }
  return result;
};


class OrderDeclined extends Component {



  render() {
    let {match,data} = this.props;
    const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
    return (
      <Query
      query={ORDER_QUERY}
      fetchPolicy={"network-only"}
      variables = {{taskType:"TASK_CUSTOMER_ORDER",status: ["DECLINED"], branch: CURRENT_USER.branch.id }}
 
    >{({ loading, error, data, refetch, }) => {
      if (loading) return null;
      if (refetch) {
        console.log(refetch);
      }
      if (error){
      }
      if (data != null){
      return (
        <OrderTable tableName="Declined Orders" 
        tableDesc="All the list of delcined orders" 
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
export default withRouter(OrderDeclined);
