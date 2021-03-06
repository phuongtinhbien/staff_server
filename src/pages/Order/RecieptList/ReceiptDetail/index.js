import gql from "graphql-tag";
import moment from 'moment';
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Link, withRouter } from 'react-router-dom';
import Error from '../../../Error';
import ReceiptForm from './OrderDetailForm';
import NotificationSystem from 'react-notification-system';
import status from './../../status';

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
      tasksByCustomerOrder(condition:{previousTask:"N", currentStatus: "FINISHED_SERVING"}){
        nodes{
           staffByCurrentStaff{
            id
          }
        }
      }
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
        sale
      }
    }
    receiptDetailsByReceiptId{
      nodes{
        id
        nodeId
        recievedAmount
        status
        deliveryAmount
        processedAmount
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
        unitPriceByUnitPrice{
        id
        price
        nodeId
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
        sale
      }
    }
    receiptDetailsByReceiptId{
      nodes{
        id
        nodeId
        recievedAmount
        deliveryAmount
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

const canUpdate = (data)=>{
    let res;
    if (status === 'PENDING')
      res = data.filter (value => !value.recieved_amount).length;
    if (status === 'PENDING_DELIVERY')
      res = data.filter (value => !value.deliveryAmount).length;
    return res;
}

class ReceiptPending extends Component {

  showNotification(message, level) {
    this.notificationSystem.addNotification({
      message: message,
      level: level,
      autoDismiss: 5,
      position: "tc"
    });
  }
  render() {
    let {match,data, history} = this.props;
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
                 <ReceiptForm receipt={data.receipt}></ReceiptForm> 
                <div className="row">
                <div className="col-sm-4"></div>
                {CURRENT_USER.staffType.staffCode === 'STAFF_02' && 
                data.receipt.customerOrderByOrderId.tasksByCustomerOrder.nodes[0] && 
                     data.receipt.customerOrderByOrderId.tasksByCustomerOrder.nodes[0].staffByCurrentStaff.id === CURRENT_USER.id &&
                     !data.receipt.staffByStaffDelivery &&

                     <div className="col-sm-4 text-center">
                      <Link
                      to={"/order/reciept-list/edit/"+match.params.nodeId}
                    
                      className =  "btn btn-fill btn-warning "
                    >
                      Cập nhật biên nhận
              </Link>
              </div>
                  }
                {(CURRENT_USER.staffType.staffCode ==='STAFF_03') && <div className="col-sm-4 justify-content-center">
                <div className="col-md-12 text-center">
                <Mutation
                  mutation={ASSIGN_PICKUP}
                 
                  onCompleted={data=> {
                  
                    this.showNotification("Cập nhật thành công " +data.receipt.id+" - " + status(data.receipt.status), "success") 
                   }}
                   onError={error => console.log(error.graphQLErrors)}
                >
                  {assignPickUp=>(
                    <button
                      type="submit"
                      className="btn btn-fill btn-info"
                      disabled={!((data.receipt.status ==="PENDING") && !(data.receipt.staffByStaffPickUp))}
                      className={((data.receipt.status ==="PENDING") && !(data.receipt.staffByStaffPickUp))? "btn btn-fill btn-info ": "btn btn-fill btn-info hidden"}
                      onClick={e => {
                        e.preventDefault();
                        this.setState({approve: true, decline: false});
                        assignPickUp({variables:{id: data.receipt.id, pickUp: CURRENT_USER.id, updateDate: moment(), updateBy: CURRENT_USER.id }});
                      }}
                    >
                      Lấy đồ
                    </button>
                  )}

                </Mutation>
                &nbsp;
                <Mutation
                  mutation={ASSIGN_DELIVERY}
                  update={(cache, { data: { receipt } }) => {
                    const { receipt1 } = cache.readQuery({ query: RECEIPT_DETAIL });
                    cache.writeQuery({
                      query: RECEIPT_DETAIL,
                      variables:{nodeId:match.params.nodeId },
                      data: { receipt: receipt.concat(receipt1) }

                    });
                  }}
                  onCompleted={data=> {
                  
                    this.showNotification("Cập nhật thành công " +data.receipt.id+" - " + status(data.receipt.status), "success") 
                   }}
                   onError={error => console.log(error.graphQLErrors)}
                >
                  {assignPickUp=>(
                    <button
                      type="submit"
                      className="btn btn-fill btn-info"
                      disabled={!((data.receipt.status ==="PENDING_DELIVERY") && !(data.receipt.staffByStaffDelivery))}
                      className={((data.receipt.status ==="PENDING_DELIVERY") && !(data.receipt.staffByStaffDelivery))? "btn btn-fill btn-info ": "btn btn-fill btn-info hidden"}
                      onClick={e => {
                        e.preventDefault();
                        this.setState({approve: true, decline: false});
                        assignPickUp({variables:{id: data.receipt.id, shipper: CURRENT_USER.id, updateDate: moment(), updateBy: CURRENT_USER.id }});
                      }}
                    >
                      Trả đồ
                    </button>
                  )}

                </Mutation>
                  
                 
                </div>
                          
                <Mutation
                  mutation={UPDATE_RECEIPT_MUT}
                  
                  onCompleted={data=> {
                  
                    this.showNotification("Cập nhật thành công " +data.receipt.id+" - " + status(data.receipt.status), "success") 
                   }}
                   onError={error => {
                  console.log(error.graphQLErrors)}}
                >
                  {updatestatuscustomerorder => (

                    <div className="col-md-12 text-center">
                    
                   
                      <Link
                          to={"/order/reciept-list/edit/"+match.params.nodeId}
                        
                          disabled={!(((data.receipt.status ==="PENDING") ||(data.receipt.status ==="PENDING_DELIVERY")) && (data.receipt.staffByStaffPickUp))}
                          className={(((data.receipt.staffByStaffPickUp && data.receipt.staffByStaffPickUp.id=== CURRENT_USER.id)&&(data.receipt.status ==="PENDING")&& (data.receipt.staffByStaffPickUp)) || 
                          (( data.receipt.staffByStaffDelivery && data.receipt.staffByStaffDelivery.id=== CURRENT_USER.id) && (data.receipt.status ==="PENDING_DELIVERY")  && data.receipt.staffByStaffDelivery)) 
                          ? "btn btn-fill btn-warning ": "btn btn-fill btn-warning hidden"}
                        >
                          Cập nhật biên nhận
                  </Link>
                  &nbsp;
                      {data.receipt.receiptDetailsByReceiptId.nodes.filter (value => !value.recievedAmount).length==0 && <button
                        type="submit"
                        className="btn btn-fill btn-info"
                        disabled={!((data.receipt.status ==="PENDING")&& (data.receipt.staffByStaffPickUp) && (data.receipt.staffByStaffPickUp.id  === CURRENT_USER.id))}
                        className={(data.receipt.status ==="PENDING")&& (data.receipt.staffByStaffPickUp) && (data.receipt.staffByStaffPickUp.id  === CURRENT_USER.id)? "btn btn-fill btn-info ": "btn btn-fill btn-info hidden"}
                        onClick={e => {
                          e.preventDefault();
                          this.setState({approve: true, decline: false});
                          updatestatuscustomerorder({variables:{rId: data.receipt.id, pStatus:"RECEIVED", pUser: CURRENT_USER.id}});
                        }}
                      >
                        Đã lấy đồ
                      </button>}
                      
                      &nbsp;
                      {data.receipt.receiptDetailsByReceiptId.nodes.filter (value => !value.deliveryAmount).length==0 &&<button
                        type="submit"
                        className="btn btn-fill btn-info"
                        disabled={!((data.receipt.status ==="PENDING_DELIVERY") && (data.receipt.staffByStaffDelivery) && (data.receipt.staffByStaffDelivery.id === CURRENT_USER.id))}
                        className={((data.receipt.status ==="PENDING_DELIVERY")&& (data.receipt.staffByStaffDelivery) && (data.receipt.staffByStaffDelivery.id  === CURRENT_USER.id ))? "btn btn-fill btn-info ": "hidden btn btn-fill btn-info"}
                        onClick={e => {
                          e.preventDefault();
                          this.setState({approve: true, decline: false});
                          updatestatuscustomerorder({variables:{rId: data.receipt.id, pStatus:"DELIVERIED", pUser: CURRENT_USER.id}});
                        }}
                      >
                        Đã giao đồ
                      </button>}
                    &nbsp;
                    
                    </div>
                  
                  )}
                </Mutation>
                </div>}
              
                  
                </div>
                <NotificationSystem
                ref={ref => this.notificationSystem = ref} />
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
