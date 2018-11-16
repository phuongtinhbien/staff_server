import gql from "graphql-tag";
import moment from 'moment';
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { withRouter } from 'react-router-dom';
import Error from '../../../Error';
import ReceiptForm from './OrderDetailForm';

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





const UPDATE_RECEIPT_MUT= gql`mutation updatereceiptanddetail($pRe: ReceiptInput!, $rd: [ReceiptDetailInput!]) {
    updatereceiptanddetail(input: {pRe: $pRe, rd: $rd}) {
      receipt {
        nodeId
        id
        pickUpTime
        deliveryDate
        deliveryTime
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
            productByProductId {
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

const handleUpdateReceipt = ( updateReceipt,values, errorCreate, success)=>{
    errorCreate= null;
    success = null;
    const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));

    let ReceiptInput = {
        id : values.id,
        updateBy: CURRENT_USER.id,
        updateDate: moment(),
        pickUpDate: values.pickUpDate,
        deliveryDate: values.deliveryDate,
        pickUpTime: values.pickUpTime,
        deliveryTime: values.deliveryTime,

    }

    let ReceiptDetailInputs = []

    for (let i=0;i<values.receiptDetailsByReceiptId.length;i++){
        let ReceiptDetailInput = {
            id: values.receiptDetailsByReceiptId[i].id,
            updateBy: CURRENT_USER.id,
            updateDate: moment(),
            recievedAmount: values.receiptDetailsByReceiptId[i].receivedAmount,
            deliveryAmount: values.receiptDetailsByReceiptId[i].deliveryAmount
        }
        ReceiptDetailInputs.push(ReceiptDetailInput)
    }
    updateReceipt({variables:{pRe:ReceiptInput, rd: ReceiptDetailInputs }});
    alert(JSON.stringify({pRe:ReceiptInput, rd: ReceiptDetailInputs }));
  
  }
const handleOnCompleted = (data,history)=>{
  
    console.log(data);
    history.push("/order/reciept-list/view/"+data.updatereceiptanddetail.receipt.nodeId);
  }
 
class ReceiptUpdate extends Component {
    state= {
        errorUpdate: null,
        success: null
      }
  render() {
    let {match,data,history} = this.props;
    let {errorUpdate, success} = this.state;
    const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
    console.log(this.props);
    return (
      <div className="container-fluid">
      <div className="card">
        <div className="header"> </div>
        <div className="content">
        <div className="text-right">
        {errorUpdate &&  <label className="btn btn-wd btn-fill  btn-danger" >{errorUpdate}</label>}
        {success &&  <label className="btn btn-wd btn-fill  btn-success" >{success}</label>}
        </div>
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
            
               
                <Mutation
                  mutation={UPDATE_RECEIPT_MUT}
                  onCompleted={data=> {handleOnCompleted(data,history);
                    this.setState({success: "Update successfully"})
                  }}
                  onError={error => {
                   console.log(error)
                    this.setState({
                        errorUpdate: "Can't update this receipt"
                    });
                }}
                  
                >
                  {updateReceipt => (
                    <div className="content">
                    <ReceiptForm 
                     onSubmit={values=>handleUpdateReceipt(updateReceipt,values, errorUpdate, success)}
                    receipt={data.receipt}></ReceiptForm> 
                    </div>
                  )}
                </Mutation>

                  
                
             

      );
      }
    }}
    </Query>
    </div>
    </div>
    </div>
    );
  }
}

export default withRouter(ReceiptUpdate);
