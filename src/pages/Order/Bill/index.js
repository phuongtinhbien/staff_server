import gql from "graphql-tag";
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { withRouter,Link } from 'react-router-dom';
import Error from './../../Error';
import OrderDetailForm from './OrderDetailForm';

import ReactToPrint from 'react-to-print';

const BILL_DETAIL = gql`query billDetail($nodeId: ID!) {
  bill(nodeId: $nodeId) {
    nodeId
    id
    createDate
    status
    staffByCreateBy {
      nodeId
      fullName
      id
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
        promotionByPromotionId{
          nodeId
          id
          promotionCode
          sale
        }
        pickUpPlace
        deliveryPlace
        branchByBranchId {
          id
          branchName
          address
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
        receivedAmount
        amount
        unitPriceByUnitPrice {
          id
          price
          nodeId
        }
      }
    }
  }
}
`;

 





class Billing extends Component {

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
          <OrderDetailForm  bill={data.bill} ref={el => (this.componentRef = el)}></OrderDetailForm>
           <div className="text-center">
           {CURRENT_USER.staffType.staffCode ==='STAFF_01' &&<ReactToPrint
              pageStyle={"margin:'20px'"}
              trigger={() => 
              
              
              <button
                type="button"
                className="btn btn-fill btn-success"
              >
                In hóa đơn
              </button>
            }
          
              content={() => this.componentRef}
          />} &nbsp;
            
            {CURRENT_USER.staffType.staffCode ==='STAFF_01' &&<Link
            to={"/order/bill/edit/"+match.params.nodeId}
              type="button"
              className="btn btn-fill btn-warning"
            >
              Cập nhật hóa đơn
            </Link>}
          </div>
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

export default withRouter(Billing);
