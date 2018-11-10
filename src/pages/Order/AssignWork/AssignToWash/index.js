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
      nodeId
      washBagsByReceiptId {
        nodes {
          id
          nodeId
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
  `;

const handleOnCompleted = (data,history)=>{
  
  if (data){
    history.push("/order/assign-work");
  }
 
}

const MUT_ASSIGN_WASH = gql`mutation assignToWash($reId: BigFloat!,$currUser: BigFloat, $washerId: BigFloat!){
    assignToWash(input:{
      reId:$reId,
      currUser: $currUser,
      washerId: $washerId
    }){
      receipt{
        id
        nodeId
        washBagsByReceiptId{
          totalCount
          nodes{
            id
            nodeId
            washesByWashBagId{
              nodes{
                id
                nodeId
                washingMachineByWashingMachineId{
                  id
                  nodeId
                  washerCode
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
  create({variables:{reId:reId,currUser:currUser, washerId: data.wash.value }});
}






class ReceiptPending extends Component {

  state={
    allWasher: null,
    errorContent: null,
    success: null
  }
  render() {
    let {match,data,history} = this.props;
    let allWasher = null;
   
    const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));

    return (
      <div className="container-fluid">
      <div className="card">
        <div className="header"></div>
         <label className="error">{this.state.errorContent}</label>
         <label className="title">{this.state.success}</label>
    <Mutation
                    mutation={MUT_ASSIGN_WASH}
                    onCompleted={data=> {handleOnCompleted(data,history);
                      if (data)
                        this.setState({success: "Phân công thành công", errorContent:null})
                      else{
                        this.setState({success: null, errorContent:"Đã phân công. Không thể phân công lại"});
                      }
                     }}
                    update={(cache, { data: { receipt } }) => {
                      const { jwt } = cache.readQuery({ query: MUT_ASSIGN_WASH });
                    }}
                    onError={error => this.setState({errorContent:error.message})}

                  >
                  {
                    (assignWash) =>(
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
                 <AssignForm washer={allWasher} receipt={data.receipt} onSubmit={values => handleSubmit(assignWash, values,CURRENT_USER.id )}></AssignForm> 
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
