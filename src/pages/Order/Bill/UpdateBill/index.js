import gql from "graphql-tag";
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { withRouter } from 'react-router-dom';
import Error from '../../../Error';
import OrderDetailForm from './OrderDetailForm';
import NotificationSystem from 'react-notification-system';
const BILL_DETAIL = gql`query billDetail($nodeId: ID!) {
  bill(nodeId: $nodeId) {
    nodeId
    id
    createDate
    staffByCreateBy{
        nodeId
        fullName
        id
      }
    receiptByReceiptId {
      nodeId
      id
      customerOrderByOrderId {
        nodeId
        customerByCustomerId {
          nodeId
          id
          fullName
          phone
          email
        }
        pickUpPlace
        deliveryPlace
        branchByBranchId{
          id
          branchName
          address
        }
      }

    }
    billDetailsByBillId {
      nodes {
        nodeId
        id
        serviceTypeByServiceTypeId {
          id
          nodeId
          serviceTypeName
        }
        unitByUnitId {
          id
          nodeId
          unitName
        }
        productByProductId {
          id
          nodeId
          productName
        }
        materialByMaterialId {
          id
          materialName
          nodeId
        }
        labelByLabelId {
          id
          labelName
          nodeId
        }
        colorByColorId {
          id
          nodeId
          colorName
          colorGroupByColorGroupId {
            colorGroupName
            nodeId
          }
        }
        note
        receivedAmount
        amount
        unitPriceByUnitPrice {
          id
          price
          nodeId
        }
      }
    }
  }
}`;

 

const UPDATE_BILL_AMOUNT = gql`mutation updateAmountBill($pB: BillInput!, $bd: [BillDetailInput!]) {
  updateAmountBill(input: {pB: $pB, bd: $bd}) {
    bill {
      nodeId
      id
      createDate
      staffByCreateBy {
        nodeId
        fullName
        id
      }
      receiptByReceiptId {
        nodeId
        id
        customerOrderByOrderId {
          nodeId
          customerByCustomerId {
            nodeId
            id
            fullName
            phone
            email
          }
          pickUpPlace
          deliveryPlace
          branchByBranchId {
            id
            branchName
            address
          }
        }
      }
      billDetailsByBillId {
        nodes {
          nodeId
          id
          serviceTypeByServiceTypeId {
            id
            nodeId
            serviceTypeName
          }
          unitByUnitId {
            id
            nodeId
            unitName
          }
          productByProductId {
            id
            nodeId
            productName
          }
          materialByMaterialId {
            id
            materialName
            nodeId
          }
          labelByLabelId {
            id
            labelName
            nodeId
          }
          colorByColorId {
            id
            nodeId
            colorName
            colorGroupByColorGroupId {
              colorGroupName
              nodeId
            }
          }
          note
          receivedAmount
          amount
          unitPriceByUnitPrice {
            id
            price
            nodeId
          }
        }
      }
    }
  }
}
`;
const handleComplete = (data,history)=>{
  if(data.updateAmountBill.bill)
      history.push("/order/bill/view/"+ data.updateAmountBill.bill.nodeId)
}


const handleSubmit = (values, updateAmountBill,base, curr_user) => {
  console.log(values)
  let BillInput = {
    id: base.id,
    updateBy: curr_user.id,

  }
  console.log(BillInput)
  let BillDetailInput = []
  for (let i=0;i<values.billDetail.length;i++){
    BillDetailInput.push({
      id:base.billDetailsByBillId.nodes[i].id,
      amount: values.billDetail[i].amount,
      updateBy: curr_user.id,
    })
  }
  console.log(BillDetailInput)
  updateAmountBill({variables:{pB:BillInput, bd:BillDetailInput }});
}


class BillingForm extends Component {

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
      query={BILL_DETAIL}
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
          
           
          <Mutation
                  mutation={UPDATE_BILL_AMOUNT}
                  onCompleted={data=> {
                  
                    this.showNotification("Cập nhật hóa đơn thành công","success"); 
                    handleComplete(data,history);
                   }}
                   onError={error => this.showNotification(error.message, "error")}
                >
                  {updateBill => (
                     <div >
                    {CURRENT_USER.staffType.staffCode ==='STAFF_01' &&
                  <OrderDetailForm  onSubmit={values=>handleSubmit(values,updateBill, data.bill, CURRENT_USER)}
                  bill={data.bill} ref={el => (this.componentRef = el) }></OrderDetailForm>
                  }
                   </div>
                  )}

                </Mutation>
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

export default withRouter(BillingForm);
