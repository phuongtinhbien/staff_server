import gql from "graphql-tag";
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { withRouter } from 'react-router-dom';
import Error from './../../Error';
import OrderDetailForm from './OrderDetailForm';
import PrintTempalte from "react-print";

const BILL_DETAIL = gql`query billDetail($nodeId: ID!) {
    bill(nodeId: $nodeId) {
      nodeId
      id
      createDate
      staffByCreateId {
        nodeId
        id
        fullName
      }
      receiptByReceiptId {
        nodeId
        id
        customerOrderByOrderId {
          nodeId
          customerByCustomerId {
            nodeId
            id
            fullName
            phone
            email
          }
        }

      }
      billDetailsByBillId {
        nodes {
          nodeId
          id
          serviceTypeByServiceTypeId {
            id
            nodeId
            serviceTypeName
          }
          unitByUnitId {
            id
            nodeId
            unitName
          }
          productByProductId {
            id
            nodeId
            productName
          }
          materialByMaterialId {
            id
            materialName
            nodeId
          }
          labelByLabelId {
            id
            labelName
            nodeId
          }
          colorByColorId {
            id
            nodeId
            colorName
            colorGroupByColorGroupId {
              colorGroupName
              nodeId
            }
          }
          note
          amount
          unitPriceByUnitPrice {
            id
            price
            nodeId
          }
        }
      }
    }
  }`;

 





class OrderPending extends Component {

  render() {
    let {match,data,history} = this.props;
    const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
    console.log(this.props);
    return (
      <div className="container-fluid">
      <div className="card">
        <div className="header"></div>
        <Query     
      query={BILL_DETAIL}
      fetchPolicy={"network-only"}
      variables = {{nodeId:match.params.nodeId }}

    >{({ loading, error, data, refetch }) => {
      
      if (loading) return null;
      if (error){
        return (<Error errorContent= {error.message}></Error>);
      }
      if (data != null){
        console.log(data)
      return (
        <div className="content">
          <OrderDetailForm  customerOrder={data.customerOrder}></OrderDetailForm>
      </div>
      
        
      );
      }
    }}
    </Query>
    </div>
    </div>
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
