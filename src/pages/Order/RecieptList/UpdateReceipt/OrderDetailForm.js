
import renderField from 'components/FormInputs/renderField';
import _ from 'lodash';
import React, { Component } from 'react';
import { Field, FieldArray, initialize, reduxForm } from 'redux-form';
import ItemCloth from './ItemCloth';
import status from './../../status';
const validate = values => {
  const errors = {};

  if (!values.pickUpDate){
    errors.pickUpDate = 'Pick up date is required';
  }
  if (!values.deliveryDate){
    errors.deliveryDate = 'Delivery date is required';
  }
 
  // if (!values.pickUpTime){
  //   errors.pickUpTime = 'Pick up time is required';
  // }
  // if (!values.deliveryTime){
  //   errors.deliveryTime = 'Delivery time is required';
  // }

  
  if (!values.receiptDetailsByReceiptId || !values.receiptDetailsByReceiptId.length) {
    errors.receiptDetailsByReceiptId = { _error: 'At least one item must be entered'}
  }
  else {
    const receiptDetailsByReceiptIdArrayErrors = []
    values.receiptDetailsByReceiptId.forEach((item, itemIndex) => {
      const itemErrors = {}

      if (!item || !item.amount) {
        itemErrors.amount = 'Required'
        receiptDetailsByReceiptIdArrayErrors[itemIndex] = itemErrors
      }
      else if (item.amount && _.isNaN(item.amount)) {
        itemErrors.amount = 'Please enter a number';
        receiptDetailsByReceiptIdArrayErrors[itemIndex] = itemErrors
      }

      if (!item || !item.receivedAmount){
        itemErrors.receivedAmount = 'Required'
        receiptDetailsByReceiptIdArrayErrors[itemIndex] = itemErrors
      }
      else if (item.receivedAmount && _.isNaN(item.receivedAmount)) {
        itemErrors.receivedAmount = 'Please enter a number';
        receiptDetailsByReceiptIdArrayErrors[itemIndex] = itemErrors
      }
      else if (item.receivedAmount && (item.receivedAmount> item.amount)) {
        itemErrors.receivedAmount = 'Must less than or equal amount';
        receiptDetailsByReceiptIdArrayErrors[itemIndex] = itemErrors
      }
      // if (!item || !item.deliveryAmount){
      //   itemErrors.deliveryAmount = 'Required'
      //   receiptDetailsByReceiptIdArrayErrors[itemIndex] = itemErrors
      // }
      // else if (item.deliveryAmount && _.isNaN(item.deliveryAmount)) {
      //   itemErrors.deliveryAmount = 'Please enter a number';
      //   receiptDetailsByReceiptIdArrayErrors[itemIndex] = itemErrors
      // }
      // else if (item.deliveryAmount && (item.deliveryAmount> item.amount)) {
      //   itemErrors.deliveryAmount = 'Must less than or equal amount';
      //   receiptDetailsByReceiptIdArrayErrors[itemIndex] = itemErrors
      // }

    })
    if (receiptDetailsByReceiptIdArrayErrors.length) {
      errors.receiptDetailsByReceiptId = receiptDetailsByReceiptIdArrayErrors
    }
  }

  return errors;
};
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
        id: data[i].id,
        nodeId: data[i].nodeId,
        productName: data[i].productByProductId != null ? data[i].productByProductId .productName: "undefine",
        serviceName: data[i].serviceTypeByServiceTypeId != null ? data[i].serviceTypeByServiceTypeId.serviceTypeName:"_",
        amount:data[i].amount,
        receivedAmount: data[i].recievedAmount,
        deliveryAmount: data[i].deliveryAmount,
        unit: data[i].unitByUnitId != null ? data[i].unitByUnitId.unitName: "_",
        unitPrice:data[i].unitPriceByUnitPrice!= null?  data[i].unitPriceByUnitPrice.price :"_",
        details: resultDetail(data),
        status: data[i].status
      }
      result.push(row);
  }
  return result;
};



class ReceiptForm extends Component {

  render () {
    
    let {receipt,handleSubmit, submitting} = this.props;
    this.props.dispatch(initialize('ReceiptEditForm',{
      id: receipt.id,
      pickUpTime: receipt.pickUpTime,
      deliveryTime: receipt.deliveryTime,
      pickUpDate: receipt.pickUpDate?receipt.pickUpDate:receipt.customerOrderByOrderId.pickUpDate,
      deliveryDate: receipt.deliveryDate?receipt.deliveryDate:receipt.customerOrderByOrderId.deliveryDate,
      receiptDetailsByReceiptId: proccessData(receipt.receiptDetailsByReceiptId.nodes)
    },{keepValues: true}));
      return(

          <form className="form-horizontal" onSubmit={handleSubmit} >
          <fieldset>
                <Field
                        name="id"
                        inputClassName="hidden"
                        disabled="true"
                        type="text"
                        component={renderField}
                        />
              <legend>
              <div style={{justifyContent: "space-between"}}>
                <span>Thông tin biên nhận - {receipt.id} - {receipt.customerOrderByOrderId.id} <span className="badge badge-warning">{status(receipt.status)}</span> </span>
                
              </div>
              </legend>
              
              <div className="row">
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4">Họ tên</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{receipt.customerOrderByOrderId.customerByCustomerId.fullName}</b></div>
                  <label className="control-label col-md-4">Số điện thoại</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>{receipt.customerOrderByOrderId.customerByCustomerId.phone}</div>
                </div>
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4">Email</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>{receipt.customerOrderByOrderId.customerByCustomerId.email}</div>
                  <label className="control-label col-md-4">Địa chỉ</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>{receipt.customerOrderByOrderId.customerByCustomerId.address}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4 mt-4">Chi nhánh</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                    <span className="btn btn-primary btn-sm btn-fill btn-linkedin">{receipt.customerOrderByOrderId.branchByBranchId.branchName}</span>
                  </div>
                </div>
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4 mt-4">Địa chỉ CN</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                    <span >{receipt.customerOrderByOrderId.branchByBranchId.address}</span>
                  </div>
                </div>
              </div>
              <div className="row"><br></br></div>
              <div className="row">
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4">Ngày lấy đồ </label>
                    <div className="col-md-8 mt-4">
                    <Field
                        name="pickUpDate"
                        type="date"
                        disabled={receipt.status === "PENDING"? false: true}
                        component={renderField}
                        />
                    </div>
                    <label className="control-label col-md-4 mt-6">Thời gian lấy đồ </label>
                    <div className="col-md-8 mt-6">
                    <Field
                        name="pickUpTime"
                        type="time"
                        id= "pickUpTime"
                        disabled={receipt.status === "PENDING"? false: true}
                        component={renderField}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                  <label className="control-label col-md-4 mt-4">Ngày trả đồ </label>
                    <div className="col-md-8 mt-4">
                    <Field
                        name="deliveryDate"
                        type="date"
                        disabled={receipt.status === "PENDING_DELIVERY"? false: true}
                        component={renderField}
                        />
                    </div>
                  <label className="control-label col-md-4 mt-6">Thời gian trả đồ </label>
                  <div className="col-md-8 mt-6">
                  <Field
                        name="deliveryTime"
                        type="time"
                        disabled={receipt.status === "PENDING_DELIVERY"? false: true}
                        component={renderField}
                        />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >Nơi lấy đồ </label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{receipt.customerOrderByOrderId.pickUpPlace !=null ?receipt.customerOrderByOrderId.pickUpPlace: "_" }</b></div>
                </div>
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >Nơi trả đồ </label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{receipt.customerOrderByOrderId.deliveryPlace !=null ?receipt.customerOrderByOrderId.deliveryPlace: "_" }</b></div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" > NV lấy đồ</label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{(receipt.staffByStaffPickUp) ?receipt.staffByStaffPickUp.fullName: "_" }</b></div>
                </div>
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >NV trả đồ </label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{(receipt.staffByStaffDelivery) ?receipt.staffByStaffDelivery.fullName: "_" }</b></div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 text-center">
                <br></br>
                <br></br>
                <button
                        type="submit"
                        className="btn btn-fill btn-info"
                        disabled={submitting}
                      >
                        Cập nhật
                      </button>
                </div>
                </div>
            
            </fieldset>
            <br></br><br></br>
            <fieldset>
              <legend>Chi tiết biên nhận</legend>
              <div className="col-sm-12">
                 <FieldArray name="receiptDetailsByReceiptId" status={receipt.status} orderDetailList={proccessData(receipt.receiptDetailsByReceiptId.nodes)} component={ItemCloth}></FieldArray>
              </div>
            </fieldset>
          
          </form>

      );

  }
}
export default reduxForm({
  form: 'ReceiptEditForm',validate})(ReceiptForm);
