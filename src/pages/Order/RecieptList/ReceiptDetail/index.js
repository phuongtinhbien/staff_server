import React, { Component } from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Link, withRouter } from 'react-router-dom';
import {graphql,compose } from 'react-apollo';
import { Query, Mutation } from 'react-apollo';
import gql  from "graphql-tag";
import OrderDetailForm from './OrderDetailForm';
import Error from '../../../Error';

const RECEIPT_DETAIL = gql`query getCustomerReceiptByNodeId($nodeId: ID!) {
  receipt(nodeId: $nodeId) {
    id
    pickUpTime
    deliveryDate
    deliveryTime
    deliveryPlace
    pickUpDate
    status
    staffByStaffPickUp{
      id
      fullName
    }
    staffByStaffDelivery{
      id
      fullName
    }
    customerOrderByOrderId {
      nodeId
      id
      status
      pickUpPlace
      deliveryPlace
      customerByCustomerId {
        id
        nodeId
        fullName
        email
        phone
        address
      }
      branchByBranchId {
        nodeId
        id
        branchName
        address
      }
      deliveryDate
      timeScheduleByDeliveryTimeId {
        nodeId
        id
        timeStart
        timeEnd
      }
      pickUpDate
      timeScheduleByPickUpTimeId {
        nodeId
        id
        timeStart
        timeEnd
      }
      pickUpPlace
      deliveryPlace
      promotionByPromotionId {
        nodeId
        id
        promotionName
        promotionCode
      }
    }
    receiptDetailsByReceiptId{
      nodes{
        id
        nodeId
        recievedAmount
        status
        amount
        colorByColorId{
          id
          colorName
        }
        labelByLabelId{
          id
          labelName
        }
        unitByUnitId{
          id
          unitName
        }
        materialByMaterialId{
          id
          materialName
        }
        serviceTypeByServiceTypeId{
          id
          serviceTypeName
        }  
      }
    }
  }
}`;



const CURR_USER = gql `query{
  currentUser{
    id
    userType
    lastName

  }
}`;

class ReceiptPending extends Component {

  render() {
    let {match,data} = this.props;
    let currUser;
    console.log(this.props);
    return (
      <div className="container-fluid">
      <div className="card">
        <div className="header"></div>
          <Query query={CURR_USER}>
          {({loading, error,data, refetch}) => {
            if (loading) return null;
            if (data){
                console.log(data);
                currUser =  data.currentUser.id;
                return null;
            }
            return null;
          
          }
          }

          </Query>
          <Query     
            query={RECEIPT_DETAIL}
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
                 <OrderDetailForm receipt={data.receipt}></OrderDetailForm> 
                <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4 justify-content-center">
                <button
                        type="submit"
                        className="btn btn-fill btn-info"
                        // onClick={e => {
                        //   e.preventDefault();
                        //   this.setState({approve: true, decline: false});
                        //   updatestatuscustomerorder({variables:{coId: data.customerOrder.id, pStatus:"APPROVED", pUser: currUser}});
                        // }}
                      >
                        Recieved
                      </button>
                </div>
                <div className="col-sm-4"></div>
                  
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

export default withRouter(ReceiptPending);
