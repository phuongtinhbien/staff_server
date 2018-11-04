import React, { Component } from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Link, withRouter } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import gql  from "graphql-tag";
import OrderDetailForm from './OrderDetailForm';
import Error from '../../../Error';

const ORDER_DETAIL = gql`query getCustomerOrderByNodeId ($nodeId: ID!){  customerOrder(nodeId: $nodeId){
  nodeId 
  id 
  status 
  pickUpPlace
  deliveryPlace
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

  render() {
    let {match,data} = this.props;
    const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
    console.log(this.props);
    return (
      <div className="container-fluid">
      <div className="card">
        <div className="header"></div>
            <Query     
      query={ORDER_DETAIL}
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
        <div className="text-right">
        </div>
                
          <OrderDetailForm customerOrder={data.customerOrder}></OrderDetailForm>
          <div className="row">
           
            
            <Mutation
                  mutation={UPDATE_ORDER_MUT}
                  update={(cache, { data: { updatestatuscustomerorder } }) => {
                    const { customerOrder } = cache.readQuery({ query: ORDER_DETAIL });
                    cache.writeQuery({
                      query: ORDER_DETAIL,
                      variables:{nodeId:match.params.nodeId },
                      data: { customerOrder: customerOrder.concat(updatestatuscustomerorder) }

                    });
                  }}
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
                          updatestatuscustomerorder({variables:{coId: data.customerOrder.id, pStatus:"PENDING", pUser: CURRENT_USER.id}});
                        }}
                      >
                        Order
                      </button>
                      <button
                        type="submit"
                        className="btn btn-fill btn-info"
                        disabled={!(data.customerOrder.status ==="PENDING")}
                        className={!(data.customerOrder.status ==="PENDING")? "btn btn-fill btn-info hidden": "btn btn-fill btn-info"}
                        onClick={e => {
                          e.preventDefault();
                          this.setState({approve: true, decline: false});
                          updatestatuscustomerorder({variables:{coId: data.customerOrder.id, pStatus:"APPROVED", pUser: CURRENT_USER.id}});
                        }}
                      >
                        Approve
                      </button>
                      <button
                        type="submit"
                        className="btn btn-fill btn-info"
                        disabled={!(data.customerOrder.status ==="PENDING_SERVING")}
                        className={(data.customerOrder.status ==="PENDING_SERVING")? "btn btn-fill btn-info ": "btn btn-fill btn-info hidden"}
                        onClick={e => {
                          e.preventDefault();
                          this.setState({approve: true, decline: false});
                          updatestatuscustomerorder({variables:{coId: data.customerOrder.id, pStatus:"SERVING", pUser: CURRENT_USER.id}});
                        }}
                      >
                        Start Serving
                      </button>
                      &nbsp;
                      &nbsp;
                      <button
                        type="submit"
                        className="btn btn-fill btn-info"
                        disabled={!(data.customerOrder.status ==="SERVING")}
                        className={(data.customerOrder.status ==="SERVING")? "btn btn-fill btn-info ": "btn btn-fill btn-info hidden"}
                        onClick={e => {
                          e.preventDefault();
                          this.setState({approve: true, decline: false});
                          updatestatuscustomerorder({variables:{coId: data.customerOrder.id, pStatus:"FINISHED_SERVING", pUser: CURRENT_USER.id}});
                        }}
                      >
                        Finished
                      </button>
                      &nbsp;
                      &nbsp;
                      <button
                      type="submit"
                      disabled={!(data.customerOrder.status ==="PENDING")}
                      className={!(data.customerOrder.status ==="PENDING")? "btn btn-fill btn-warning hidden": "btn btn-fill btn-warning"}
                      onClick={e => {
                        e.preventDefault();
                        this.setState({approve: false, decline: true});
                        updatestatuscustomerorder({variables:{coId: data.customerOrder.id, pStatus:"DECLINED", pUser: CURRENT_USER.id}});
                      }}
                    >
                      Decline
                    </button>
             
                      &nbsp;
                      &nbsp;
                    &nbsp;
                    <button className="btn btn-fill btn-danger" >
                    Cancel
                    </button>
                    </div>
                    }
                    </frameElement>
                  
                  )}
                </Mutation>
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
