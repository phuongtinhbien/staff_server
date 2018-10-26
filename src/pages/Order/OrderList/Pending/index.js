import React, { Component } from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import OrderTable from '../OrderTable';
import { Link, withRouter } from 'react-router-dom';
import {graphql,compose } from 'react-apollo';
import { Query, Mutation } from 'react-apollo';
import gql  from "graphql-tag";
import Error from '../../../Error';

const ORDER_QUERY = gql`
query getCustomerOrder ($status: String!){
  allCustomerOrders (condition:{
    status: $status
  }){
    nodes{
      nodeId,
      id
      branchByBranchId{
        id
        branchName
      },
      customerByCustomerId{
        id
        fullName
      },
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
        customerName: data[i].customerByCustomerId.fullName,
        branch: data[i].branchByBranchId.branchName.replace("CHI NHANH ",""),
        deliveryDate: data[i].deliveryDate,
        deliveryTime: data[i].timeScheduleByDeliveryTimeId.timeStart + " - " +data[i].timeScheduleByDeliveryTimeId.timeEnd,
        pickUpDate: data[i].pickUpDate,
        pickUpTime: data[i].timeScheduleByDeliveryTimeId.timeStart + " - " +data[i].timeScheduleByDeliveryTimeId.timeEnd,
        amount: calAmount(data[i].customerByCustomerId.id,data[i].id )
      }
      result.push(row);
  }
  return result;
};


class OrderPending extends Component {


  render() {
    let {match,data} = this.props;
    return (
      <Query
      query={ORDER_QUERY}
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
        <OrderTable tableName="Pending Orders" tableDesc="All the list of pending orders" orderList={proccessData(data.allCustomerOrders.nodes)}></OrderTable>
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
//       status: "PENDING",
//     },
//   }),
//  }

//  OrderPending = graphql(ORDER_QUERY,queryOptions) (OrderPending);
export default withRouter(OrderPending);
