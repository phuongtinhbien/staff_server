import React, { Component } from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import OrderTable from './OrderTable';
import { Link, withRouter } from 'react-router-dom';
import {graphql } from 'react-apollo';
import {gql} from 'apollo-boost';
import { Query, Mutation } from 'react-apollo';
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
        amount: "_"
      }
      result.push(row);
  }
  return result;
};


class OrderProcessing extends Component {



  render() {
    let {match,data} = this.props;
    return (
      <Query
      query={ORDER_QUERY}
      fetchPolicy={"network-only"}
      variables = {{status: "FINISHED" }}
 
    >{({ loading, error, data, refetch, }) => {
      if (loading) return null;
      if (refetch) {
        console.log(refetch);
      }
      if (error){
      }
      if (data != null){
      return (
        <OrderTable tableName="Successful Orders" 
        tableDesc="All the list of successful orders" 
        orderList={proccessData(data.allCustomerOrders.nodes)}></OrderTable>
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
