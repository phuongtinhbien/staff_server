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

const UPDATE_RECEIPT_MUT= gql`mutation updatestatusreceipt($rId: BigFloat!, $pStatus: String!, $pUser: BigFloat) {
  updatestatusreceipt(input: {rId: $rId, pStatus: $pStatus, pUser: $pUser}) {
    receipt {
      id
      pickUpTime
      deliveryDate
      deliveryTime
      deliveryPlace
      pickUpDate
      status
      staffByStaffPickUp {
        id
        fullName
      }
      staffByStaffDelivery {
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
      receiptDetailsByReceiptId {
        nodes {
          id
          nodeId
          recievedAmount
          status
          amount
          colorByColorId {
            id
            colorName
          }
          labelByLabelId {
            id
            labelName
          }
          unitByUnitId {
            id
            unitName
          }
          materialByMaterialId {
            id
            materialName
          }
          serviceTypeByServiceTypeId {
            id
            serviceTypeName
          }
        }
      }
    }
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
                <Mutation
                  mutation={UPDATE_RECEIPT_MUT}
                  update={(cache, { data: { updatestatusreceipt } }) => {
                    const { receipt } = cache.readQuery({ query: RECEIPT_DETAIL });
                    cache.writeQuery({
                      query: RECEIPT_DETAIL,
                      variables:{nodeId:match.params.nodeId },
                      data: { receipt: receipt.concat(updatestatusreceipt.receipt) }

                    });
                  }}
                >
                  {updatestatuscustomerorder => (
                    <div className="col-md-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-fill btn-info"
                        disabled={!(data.receipt.status ==="PENDING")}
                        className={!(data.receipt.status ==="PENDING")? "btn btn-fill btn-info hidden": "btn btn-fill btn-info"}
                        onClick={e => {
                          e.preventDefault();
                          this.setState({approve: true, decline: false});
                          updatestatuscustomerorder({variables:{rId: data.receipt.id, pStatus:"RECEIVED", pUser: currUser}});
                        }}
                      >
                        Received
                      </button>
                      &nbsp;
                      <button
                        type="submit"
                        className="btn btn-fill btn-info"
                        disabled={!(data.receipt.status ==="PENDING_DELIVERY")}
                        className={(data.receipt.status ==="PENDING_DELIVERY")? "btn btn-fill btn-info ": "hidden btn btn-fill btn-info"}
                        onClick={e => {
                          e.preventDefault();
                          this.setState({approve: true, decline: false});
                          updatestatuscustomerorder({variables:{rId: data.receipt.id, pStatus:"DELIVERIED", pUser: currUser}});
                        }}
                      >
                        Deliveried
                      </button>
                    &nbsp;
                    <button className="btn btn-fill btn-danger" >
                    Cancel
                    </button>
                    </div>
                  
                  )}
                </Mutation>
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
