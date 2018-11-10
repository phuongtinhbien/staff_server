import gql from "graphql-tag";
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { withRouter } from 'react-router-dom';
import Error from './../../../Error';
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
          colorGroupByColorGroupId {
            id
            nodeId
            colorGroupName
          }
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

const handleOnCompleted = (data,history)=>{
  
  if (data){
    history.push("/order/assign-work");
  }
 
}

const MUT_SAVE_WASH_BAG = gql`mutation createWashBagForReceipt($reId: BigFloat!, $currUser: BigFloat!, $washCode: [BigFloat!], $wb: [WashBagDetailInput!]) {
  createWashBagForReceipt(input: {reId: $reId, currUser: $currUser, washCode: $washCode, wb: $wb}) {
    receipt {
      nodeId
      id
      washBagsByReceiptId {
        nodes {
          nodeId
          id
          washBagName
          washBagDetailsByWashBagId {
            nodes {
              nodeId
              id
              amount
              productByProductId {
                id
                productName
              }
              colorByColorId {
                id
                colorName
                colorGroupByColorGroupId {
                  id
                  nodeId
                  colorGroupName
                }
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
    }
  }
}
`;


const ALL_WASHER = gql `query washer ($branch: BigFloat!){
  allWashingMachines (condition:{
    branchId: $branch,
    status: "ACTIVE"
  }){
    nodes{
      nodeId
      id
      washerCode
    }
  }
}`;

const handleSubmit = (create, data,currUser)=>{
  let reId = data.receiptId;
  console.log(reId)
  let washBagCode =[]
  let wb = [];
  for (let i =0;i<data.resultSortedCloth.length;i++){
    wb.push({
      serviceTypeId: data.resultSortedCloth[i].serviceTypeId,
      unitId: data.resultSortedCloth[i].unitId,
      labelId: data.resultSortedCloth[i].labelId,
      colorId: data.resultSortedCloth[i].colorId,
      productId: data.resultSortedCloth[i].productId,
      materialId: data.resultSortedCloth[i].materialId,
      amount: data.resultSortedCloth[i].receivedAmount,
      washBagId: data.resultSortedCloth[i].washbagCode
    })
    if (washBagCode.indexOf(data.resultSortedCloth[i].washbagCode)<0){
      washBagCode.push(data.resultSortedCloth[i].washbagCode)
    }
    
  }
  console.log(JSON.stringify(washBagCode));
  create({variables:{reId:reId,currUser:currUser, washCode:washBagCode,wb:wb }});
}






class ReceiptPending extends Component {

  state={
    allWasher: null
  }
  render() {
    let {match,data,history} = this.props;
    let allWasher = null;
   
    const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));

    return (
      <div className="container-fluid">
      <div className="card">
        <div className="header"> </div>
         
    <Mutation
                    mutation={MUT_SAVE_WASH_BAG}
                    onCompleted={data=> {handleOnCompleted(data,history);
                  
                      // this.setState({isLogined: true})
                     }}
                    update={(cache, { data: { receipt } }) => {
                      const { jwt } = cache.readQuery({ query: MUT_SAVE_WASH_BAG });
                    }}
                    onError={error => this.setState({errorContent:error.message})}

                  >
                  {
                    (washbag) =>(
        <Query query={ALL_WASHER}
              variables = {{branch: CURRENT_USER.branch.id}}>
              {({ loading, error, data, refetch }) => {
                if (loading) return null;
                if (error){
                  return (<Error errorContent= {error.message}></Error>);
                }
                if (data && data.allWashingMachines.nodes.length>0){
                      console.log(data)
                      allWasher = data.allWashingMachines.nodes;
                     
                }
                return(
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
                 <AssignForm washer={allWasher} receipt={data.receipt} onSubmit={values => handleSubmit(washbag, values,CURRENT_USER.id )}></AssignForm> 
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
          </Query>);
           }}
            
           </Query> 
                     )
                    }
                    </Mutation>
    </div>
    </div>
    );
  }
}

export default withRouter(ReceiptPending);
