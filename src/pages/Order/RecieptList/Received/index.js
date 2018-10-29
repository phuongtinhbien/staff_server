import React, { Component } from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ReceiptTable from '../ReceiptTable';
import { Link, withRouter } from 'react-router-dom';
import {graphql,compose } from 'react-apollo';
import { Query, Mutation } from 'react-apollo';
import gql  from "graphql-tag";
import Error from '../../../Error';

const RECEIPT_QUERY = gql`
query getCustomerOrder($taskType: String!, $status: [String!]) {
  allTasks(filter: {taskType: {equalTo: $taskType}, currentStatus: {in: $status},previousTask: {
    equalTo:"N"
  }}) {
    nodes {
      id
      currentStatus
      receiptByReceipt {
        nodeId
        id
        customerOrderByOrderId {
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
      variables = {{taskType:"TASK_RECEIPT",status: ["PENDING"] }}>
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
      let data = pdata[i].receiptByReceipt;
      row = {
        sn: i+1,
        nodeId: data.nodeId,
        customerName: data.customerOrderByOrderId.customerByCustomerId.fullName,
        deliveryDate: data.customerOrderByOrderId.deliveryDate,
        deliveryTime: data.customerOrderByOrderId.timeScheduleByDeliveryTimeId.timeStart + " - " +data.customerOrderByOrderId.timeScheduleByDeliveryTimeId.timeEnd,
        pickUpDate: data.customerOrderByOrderId.pickUpDate,
        pickUpTime: data.customerOrderByOrderId.timeScheduleByDeliveryTimeId.timeStart + " - " +data.customerOrderByOrderId.timeScheduleByDeliveryTimeId.timeEnd,
      
      }
      result.push(row);
  }
  return result;
};


class ReceiptReceived extends Component {


  render() {
    let {match,data} = this.props;
    return (
      <Query
      query={RECEIPT_QUERY}
      fetchPolicy={"network-only"}
      variables = {{taskType:"TASK_RECEIPT",status: ["RECEIVED"] }}
 

    >{({ loading, error, data, refetch }) => {
      if (loading) return null;
      if (refetch) {
        console.log(refetch);
      }
      if (error){
       return (<Error errorContent= {error.message}></Error>);
      }
      if (data != null){

      return (
        <ReceiptTable tableName="Recieved Receipts" tableDesc="All the list of recieved receipts" orderList={proccessData(data.allTasks.nodes)}></ReceiptTable>
      );
      }
    }}
    </Query>
    );
  }
}

export default withRouter(ReceiptReceived);
