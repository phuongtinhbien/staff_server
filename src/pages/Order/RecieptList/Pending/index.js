import React, { Component } from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ReceiptTable from '../ReceiptTable';
import { Link, withRouter } from 'react-router-dom';
import {graphql,compose } from 'react-apollo';
import { Query, Mutation } from 'react-apollo';
import gql  from "graphql-tag";
import Error from '../../../Error';

const RECEIPT_QUERY = gql`
query getCustomerReceipt ($status: String!){
  allReceipts(condition:{
    status: $status
  }){
    nodes{
      nodeId
      id
      customerOrderByOrderId{
        id
        customerByCustomerId{
          id
          fullName
        }
        deliveryDate,
     	timeScheduleByDeliveryTimeId{
         id
        timeStart,
        timeEnd
      },
      pickUpDate,
      timeScheduleByPickUpTimeId{
        id
         timeStart,
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

const proccessData = (data)=>{
  let result = [];
  
  for (let i = 0;i<data.length;i++){
      let row =null;
      row = {
        sn: i+1,
        nodeId: data[i].nodeId,
        customerName: data[i].customerOrderByOrderId.customerByCustomerId.fullName,
        deliveryDate: data[i].customerOrderByOrderId.deliveryDate,
        deliveryTime: data[i].customerOrderByOrderId.timeScheduleByDeliveryTimeId.timeStart + " - " +data[i].customerOrderByOrderId.timeScheduleByDeliveryTimeId.timeEnd,
        pickUpDate: data[i].customerOrderByOrderId.pickUpDate,
        pickUpTime: data[i].customerOrderByOrderId.timeScheduleByDeliveryTimeId.timeStart + " - " +data[i].customerOrderByOrderId.timeScheduleByDeliveryTimeId.timeEnd,
      
      }
      result.push(row);
  }
  return result;
};


class ReceiptPending extends Component {


  render() {
    let {match,data} = this.props;
    return (
      <Query
      query={RECEIPT_QUERY}
      fetchPolicy={"network-only"}
      variables = {{status: "PENDING" }}

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
        <ReceiptTable tableName="Pending Receipts" tableDesc="All the list of pending receipts" orderList={proccessData(data.allReceipts.nodes)}></ReceiptTable>
      );
      }
    }}
    </Query>
    );
  }
}

export default withRouter(ReceiptPending);
