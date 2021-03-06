import gql from "graphql-tag";
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { withRouter } from 'react-router-dom';
import Error from '../../../Error';
import OrderDetailForm from './OrderDetailForm';
import NotificationSystem from 'react-notification-system';
import status from './../../status';

const ORDER_DETAIL = gql`query getCustomerOrderByNodeId ($nodeId: ID!){  customerOrder(nodeId: $nodeId){
  nodeId 
  id 
  status 
  pickUpPlace
  deliveryPlace
  tasksByCustomerOrder(condition:{previousTask:"N"}){
      nodes{
        id
        staffByCurrentStaff{
          id
          fullName
          staffTypeByStaffTypeId{
            staffCode
            id
            nodeId
          }
        }
      }
    }
  receiptsByOrderId{
    nodes{
      id
      nodeId
      staffByStaffPickUp{
        id
        fullName
      }
      staffByStaffDelivery{
        id
        fullName
      }
      billsByReceiptId {
          totalCount
          nodes{
            id
            nodeId
          }
        }
      
    }
  }
  customerByCustomerId{
    id
    nodeId
    fullName
    email
    phone
    address
  }
  branchByBranchId{
    nodeId
    id
    branchName
    address
  }
     deliveryDate,
  timeScheduleByDeliveryTimeId{
    nodeId
    id
    timeStart,
    timeEnd
  },
  pickUpDate,
  timeScheduleByPickUpTimeId{
    nodeId
    id
     timeStart,
    timeEnd
  }
  pickUpPlace,
  deliveryPlace,
  promotionByPromotionId{
    nodeId
    id
    promotionName
    promotionCode
    sale
  }
  orderDetailsByOrderId{
    nodes{
      nodeId
      id
      serviceTypeByServiceTypeId{
        id
        nodeId
        serviceTypeName
      }
      unitByUnitId{
        id
        nodeId
        unitName
      }
      productByProductId{
        id
        nodeId
        productName
      }
      materialByMaterialId{
        id
        materialName
        nodeId
      }
      labelByLabelId{
        id
        labelName
        nodeId
      }
      colorByColorId{
        id
        nodeId
        colorName
        colorGroupByColorGroupId{
          colorGroupName
          nodeId
        }
      }
      note
      amount
      unitPriceByUnitPrice{
        id
        price
        nodeId
      }
    }
  }
}}`;

const UPDATE_ORDER_MUT = gql`mutation updateCustomerOrder( $coId: BigFloat!,  $pStatus:String!, $pUser:BigFloat! ){
  updatestatuscustomerorder(input:{
    coId: $coId,
    pStatus: $pStatus
    pUser: $pUser
  }){
    customerOrder{
     nodeId 
  id 
  status 
  pickUpPlace
  deliveryPlace
  tasksByCustomerOrder(condition:{previousTask:"N"}){
      nodes{
        id
        staffByCurrentStaff{
          id
          fullName
        }
      }
    }
  receiptsByOrderId{
    nodes{
      id
      nodeId
      staffByStaffPickUp{
        id
        fullName
      }
      staffByStaffDelivery{
        id
        fullName
      }
    }
  }
  customerByCustomerId{
    id
    nodeId
    fullName
    email
    phone
    address
  }
  branchByBranchId{
    nodeId
    id
    branchName
    address
  }
     deliveryDate,
  timeScheduleByDeliveryTimeId{
    nodeId
    id
    timeStart,
    timeEnd
  },
  pickUpDate,
  timeScheduleByPickUpTimeId{
    nodeId
    id
     timeStart,
    timeEnd
  }
  pickUpPlace,
  deliveryPlace,
  promotionByPromotionId{
    nodeId
    id
    promotionName
    promotionCode
    sale
  }
  orderDetailsByOrderId{
    nodes{
      nodeId
      id
      serviceTypeByServiceTypeId{
        id
        nodeId
        serviceTypeName
      }
      unitByUnitId{
        id
        nodeId
        unitName
      }
      productByProductId{
        id
        nodeId
        productName
      }
      materialByMaterialId{
        id
        materialName
        nodeId
      }
      labelByLabelId{
        id
        labelName
        nodeId
      }
      colorByColorId{
        id
        nodeId
        colorName
        colorGroupByColorGroupId{
          colorGroupName
          nodeId
        }
      }
      note
      amount
      unitPriceByUnitPrice{
        id
        price
        nodeId
      }
    }
  }
  }
  }
}`;





class OrderPending extends Component {

  state= {
    approve: false,
    decline: false,
  }
  showNotification(message, level) {
    this.notificationSystem.addNotification({
      message: message,
      level: level,
      autoDismiss: 5,
      position: "tc"
    });
  }
  render() {
    let {match,data,history} = this.props;
    const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
    console.log(this.props);
    return (
      <div className="container-fluid">
      <div className="card">
        <div className="header"></div>
            <Query     
      query={ORDER_DETAIL}
      // fetchPolicy={"network-only"}
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
        <div className="text-right">
        </div>
          <OrderDetailForm  customerOrder={data.customerOrder}></OrderDetailForm>
          <div className="row">
           
            
            <Mutation
                  mutation={UPDATE_ORDER_MUT}
                  update={(cache, { data: { updatestatuscustomerorder:{customerOrder} } }) => {
                    // const { customerOrder } = cache.readQuery({ query: ORDER_DETAIL });
                    cache.writeQuery({
                      query: ORDER_DETAIL,
                      variables:{nodeId:match.params.nodeId },
                      data: { customerOrder: customerOrder }

                    });
                  }}
                  onCompleted={data=> {
                  
                    this.showNotification("Cập nhật thành công đơn hàng số " +data.updatestatuscustomerorder.customerOrder.id+" - " + status(data.updatestatuscustomerorder.customerOrder.status), "success") 
                   }}
                   onError={error => this.showNotification(error.message, "error")}
                >
                  {updatestatuscustomerorder => (
                    <frameElement>
                    {!(CURRENT_USER.staffType.staffCode ==='STAFF_03') &&
                    <div className="col-md-12 text-center">
                    <button
                        type="submit"
                        className="btn btn-fill btn-info"
                        disabled={!(data.customerOrder.status ==="DRAFT")}
                        className={!(data.customerOrder.status ==="DRAFT")? "btn btn-fill btn-info hidden": "btn btn-fill btn-info"}
                        onClick={e => {
                          e.preventDefault();
                          this.setState({approve: true, decline: false});
                          window.location.reload();
                          updatestatuscustomerorder({variables:{coId: data.customerOrder.id, pStatus:"PENDING", pUser: CURRENT_USER.id}});
                        }}
                      >
                        Đặt đơn
                      </button>
                      <button
                        type="submit"
                        className="btn btn-fill btn-info"
                        disabled={!(data.customerOrder.status ==="PENDING")}
                        className={!(data.customerOrder.status ==="PENDING")? "btn btn-fill btn-info hidden": "btn btn-fill btn-info"}
                        onClick={e => {
                          e.preventDefault();
                          this.setState({approve: true, decline: false});
                          window.location.reload();
                          updatestatuscustomerorder({variables:{coId: data.customerOrder.id, pStatus:"APPROVED", pUser: CURRENT_USER.id}});
                        }}
                      >
                        Chấp nhận
                      </button>
                      {(CURRENT_USER.staffType.staffCode ==='STAFF_02') &&
                      <button
                        type="submit"
                        className="btn btn-fill btn-info"
                        disabled={!(data.customerOrder.status ==="PENDING_SERVING")}
                        className={(data.customerOrder.status ==="PENDING_SERVING")? "btn btn-fill btn-info ": "btn btn-fill btn-info hidden"}
                        onClick={e => {
                          e.preventDefault();
                          this.setState({approve: true, decline: false});
                          window.location.reload();
                          updatestatuscustomerorder({variables:{coId: data.customerOrder.id, pStatus:"SERVING", pUser: CURRENT_USER.id}});
                        }}
                      >
                        Xử lí
                      </button>}
                      &nbsp;
                      &nbsp;
                      {CURRENT_USER.staffType.staffCode ==='STAFF_02' && data.customerOrder.tasksByCustomerOrder.nodes[0].staffByCurrentStaff.id === CURRENT_USER.id &&
                      <button
                        type="submit"
                        className="btn btn-fill btn-info"
                        disabled={!(data.customerOrder.status ==="SERVING")}
                        className={(data.customerOrder.status ==="SERVING")? "btn btn-fill btn-info ": "btn btn-fill btn-info hidden"}
                        onClick={e => {
                          e.preventDefault();
                          this.setState({approve: true, decline: false});
                          window.location.reload();
                          updatestatuscustomerorder({variables:{coId: data.customerOrder.id, pStatus:"FINISHED_SERVING", pUser: CURRENT_USER.id}});
                        }}
                      >
                        Hoàn tất
                      </button>
                    }
                      
                      &nbsp;
                      &nbsp;
                      <button
                      type="submit"
                      disabled={!(data.customerOrder.status ==="PENDING")}
                      className={!(data.customerOrder.status ==="PENDING")? "btn btn-fill btn-warning hidden": "btn btn-fill btn-warning"}
                      onClick={e => {
                        e.preventDefault();
                        this.setState({approve: false, decline: true});
                        window.location.reload();
                        updatestatuscustomerorder({variables:{coId: data.customerOrder.id, pStatus:"DECLINED", pUser: CURRENT_USER.id}});
                      }}
                    >
                      Hủy đơn
                    </button>
             
                      &nbsp;
                      &nbsp;
                    &nbsp;
                    <button className="btn btn-fill btn-danger" onClick={e=> history.goBack()}>
                    Trở lại
                    </button>
                    </div>
                    }
                    </frameElement>
                  
                  )}
                </Mutation>
                <NotificationSystem
                ref={ref => this.notificationSystem = ref} />
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
// const queryOptions = {
//   options: props => ({
//     variables: {
//       status: "PENDING",
//     },
//   }),
//  }

//  OrderPending = graphql(ORDER_QUERY,queryOptions) (OrderPending);
export default withRouter(OrderPending);
