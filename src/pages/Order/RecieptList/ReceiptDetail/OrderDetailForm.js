
import React, { Component } from 'react';
import moment from 'moment';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import Tags from 'components/Tags';
import OrderDetailTable from './OrderDetailTable';



const resultDetail = (data) =>{

  return (
    <p>
      <span style={{fontSize:"12px"}}> - Material : {data.materialByMaterialId!= null?data.materialByMaterialId.materialName: "Undefine"} </span>
      <br></br>
      <span style={{fontSize:"12px"}}> - Label : {data.labelByLabelId!= null?data.labelByLabelId.labelName: "Undefine"} </span>
      <br></br>
      <span style={{fontSize:"12px"}}> - Color : {data.colorByColorId!= null?data.colorByColorId.colorName: "Undefine"} </span>
      <br></br>
      <span style={{fontSize:"12px"}}> - Note : {data.note!= null?data.note: "_"} </span>
    </p>
  );

}


const proccessData = (data)=>{
  let result = [];
  
  for (let i = 0;i<data.length;i++){
      let row =null;
      row = {
        sn: i+1,
        nodeId: data[i].nodeId,
        productName: data[i].productByProductId != null ? data[i].productByProductId .productName: "undefine",
        serviceName: data[i].serviceTypeByServiceTypeId != null ? data[i].serviceTypeByServiceTypeId.serviceTypeName:"_",
        amount:data[i].amount,
        receivedAmount: data[i].recievedAmount,
        unit: data[i].unitByUnitId != null ? data[i].unitByUnitId.unitName: "_",
        unitPrice:data[i].unitPriceByUnitPrice!= null?  data[i].unitPriceByUnitPrice.price :"_",
        details: resultDetail(data)
      }
      result.push(row);
  }
  return result;
};



class OrderDetailForm extends Component {
  state = {
    date: moment(),
    startDate: moment(),
    endDate: moment(),
    dateRangeFocusedInput: null,
    viewMode: false
  
  };
  render () {
    
    let {receipt} = this.props;
      return(

          <form className="form-horizontal" >
          <fieldset>
              
              <legend>
              <div style={{justifyContent: "space-between"}}>
                <span>Receipt's Information - {receipt.id} <span className="badge badge-warning">{receipt.status}</span> </span>
                
              </div>
              </legend>
              
              <div className="row">
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4">Full name</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{receipt.customerOrderByOrderId.customerByCustomerId.fullName}</b></div>
                  <label className="control-label col-md-4">Phone number</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>{receipt.customerOrderByOrderId.customerByCustomerId.phone}</div>
                </div>
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4">Email</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>{receipt.customerOrderByOrderId.customerByCustomerId.email}</div>
                  <label className="control-label col-md-4">Address</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>{receipt.customerOrderByOrderId.customerByCustomerId.address}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4 mt-4">Branch</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                    <span className="btn btn-primary btn-sm btn-fill btn-linkedin">{receipt.customerOrderByOrderId.branchByBranchId.branchName}</span>
                  </div>
                </div>
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4 mt-4">Branch's Address</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                    <span >{receipt.customerOrderByOrderId.branchByBranchId.address}</span>
                  </div>
                </div>
              </div>
              <div className="row"><br></br></div>
              <div className="row">
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4">Pick up date </label>
                    <div className="col-md-8 mt-4">
                      <Tags
                        tags={ [
                          {
                            id: 1,
                            text: receipt.customerOrderByOrderId.pickUpDate
                          }
                        ]}
                        disabled={true}
                        theme="azure"
                        fill />
                    </div>
                    <label className="control-label col-md-4 mt-6">Pick up time </label>
                    <div className="col-md-8 mt-6">
                      <Tags
                        tags={ [
                          {
                            id: 1,
                            text: receipt.customerOrderByOrderId.timeScheduleByPickUpTimeId.timeStart +" - "+receipt.customerOrderByOrderId.timeScheduleByPickUpTimeId.timeEnd
                          }
                        ]}
                        disabled={true}
                        theme="azure"
                        fill />
                    </div>
                </div>
                <div className="col-sm-6">
                  <label className="control-label col-md-4 mt-4">Delivery date </label>
                    <div className="col-md-8 mt-4">
                      <Tags
                        tags={[
                          {
                            id: 1,
                            text: receipt.customerOrderByOrderId.deliveryDate? receipt.customerOrderByOrderId.deliveryDate: "_"
                          }
                        ]}
                        disabled={true}
                        theme="azure"
                        fill />
                    </div>
                  <label className="control-label col-md-4 mt-6">Delivery time </label>
                  <div className="col-md-8 mt-6">
                    <Tags
                      tags={ [
                        {
                          id: 1,
                          text: receipt.customerOrderByOrderId.timeScheduleByDeliveryTimeId.timeStart +" - "+receipt.customerOrderByOrderId.timeScheduleByDeliveryTimeId.timeEnd
                        }
                      ]}
                      disabled={true}
                      theme="azure"
                      fill />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >Pick up place </label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{receipt.pickUpPlace !=null ?receipt.pickUpPlace: "_" }</b></div>
                </div>
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >Delivery place </label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{receipt.pickUpPlace !=null ?receipt.deliveryPlace: "_" }</b></div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" > Pick up Staff</label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{(receipt.staffByStaffPickUp) ?receipt.staffByStaffPickUp.fullName: "_" }</b></div>
                </div>
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >Delivery Staff </label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{(receipt.staffByStaffDelivery) ?receipt.staffByStaffDelivery.fullName: "_" }</b></div>
                </div>
              </div>
            
            </fieldset>
            <br></br><br></br>
            <fieldset>
              <legend>Receipt Detail</legend>
              <div className="col-sm-12">
                 <OrderDetailTable orderDetailList={proccessData(receipt.receiptDetailsByReceiptId.nodes)}></OrderDetailTable>
              </div>
            </fieldset>
          
          </form>

      );

  }
}
export default reduxForm({
  form: 'OrderDetailForm'})(OrderDetailForm);
