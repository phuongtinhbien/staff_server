import React, { Component } from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Link, withRouter } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import gql  from "graphql-tag";
import Error from './../../../Error';
import moment from 'moment';
import AssignForm from './AssignForm';

const RECEIPT_DETAIL = gql`query getCustomerReceiptByNodeId($nodeId: ID!) {
  receipt(nodeId: $nodeId) {
    id
    pickUpTime
    deliveryDate
    deliveryTime
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
        productByProductId{
            id
            productName
          }
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

const ASSIGN_PICKUP = gql`
mutation updateReceipt ($id: BigFloat!, $pickUp: BigFloat!, $updateDate:Datetime!, $updateBy: BigFloat! ){
 updateReceiptById(input:{
  id: $id,
  receiptPatch:{
    staffPickUp: $pickUp,
    updateDate: $updateDate,
    updateBy: $updateBy,
    
  }
}){
  receipt{
    id
    pickUpTime
    deliveryDate
    deliveryTime
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
        productByProductId{
            id
            productName
          }
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
}
}`;

const ASSIGN_DELIVERY = gql`mutation updateReceipt ($id: BigFloat!, $shipper: BigFloat!, $updateDate:Datetime!, $updateBy: BigFloat! ){
  updateReceiptById(input:{
   id: $id,
   receiptPatch:{
     staffDelivery: $shipper,
     updateDate: $updateDate,
     updateBy: $updateBy,
     
   }
 }){
   receipt{
     id
     pickUpTime
     deliveryDate
     deliveryTime
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
         productByProductId{
             id
             productName
           }
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
          productByProductId{
            id
            productName
          }
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
    const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
    console.log(this.props);
    return (
      <div className="container-fluid">
      <div className="card">
        <div className="header"> </div>
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
                 <AssignForm receipt={data.receipt}></AssignForm> 
                <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4 justify-content-center">
                <div className="col-md-12 text-center">
                </div>               
                
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
