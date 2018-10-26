import React, { Component } from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { gql } from 'apollo-boost';
import { Link, withRouter } from 'react-router-dom';
import {graphql} from 'react-apollo';
import { Query, Mutation } from 'react-apollo';

import OrderDetailForm from './OrderDetailForm';
import Error from '../../../Error';


const ORDER_DETAIL = gql`query getCustomerOrderByNodeId ($nodeId: ID!){ customerOrder(nodeId: $nodeId){
  nodeId id status pickUpPlace
  deliveryPlace
  customerByCustomerId{
    fullName
    email
    phone
    address
  }
  branchByBranchId{
    branchName
    address
  }
     deliveryDate,
  timeScheduleByDeliveryTimeId{
    timeStart,
    timeEnd
  },
  pickUpDate,
  timeScheduleByPickUpTimeId{
     timeStart,
    timeEnd
  }
  pickUpPlace,
  deliveryPlace,
  promotionByPromotionId{
    promotionName
    promotionCode
  }
  orderDetailsByOrderId{
    nodes{
      nodeId
      serviceTypeByServiceTypeId{
        serviceTypeName
      }
      unitByUnitId{
        nodeId
        unitName
      }
      productByProductId{
        nodeId
        productName
      }
      materialByMaterialId{
        materialName
        nodeId
      }
      labelByLabelId{
        labelName
        nodeId
      }
      colorByColorId{
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
        price
        nodeId
      }
    }
  }
}}`;
class ViewOrderDetail extends Component {
      render(){
        let {match} = this.props;
        console.log(this.props);
        return(  
          <Query
              query={ORDER_DETAIL}
              variables={{nodeId: match.params.nodeId}}
              
              >{({ loading, error, data, refetch }) => {
              if (error){
                return (
                  <Error errorContent={error}></Error>
                );
              }
              if (loading){
                console.log('Loding.......')
              }
              if (refetch) {
                console.log(refetch);
              }
              if (data != {}){
                  console.log(data);
                  return (
                  <div className="container-fluid">
                      <OrderDetailForm customerOrder={data.customerOrder}></OrderDetailForm>
                  </div>
                );
              }
              else{
                return (
                  <Error errorContent={error}></Error>
                );
              }
              }}
          </Query>
         );
       }
}
// const queryOptions = {
//     options: props => ({
//       variables: {
//         nodeId: props.match.params.nodeId,
//     },
//   }),
// }

// ViewOrderDetail = graphql(ORDER_DETAIL,queryOptions) (ViewOrderDetail);
export default withRouter(ViewOrderDetail);