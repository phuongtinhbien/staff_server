
import Tags from 'components/Tags';
import moment from 'moment';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import OrderDetailTable from './OrderDetailTable';
import status from './../../status';


const resultDetail = (data) =>{

  return (
    <p>
      <span style={{fontSize:"12px"}}> - Chất liệu : {data.materialByMaterialId!= null?data.materialByMaterialId.materialName: "Undefine"} </span>
      <br></br>
      <span style={{fontSize:"12px"}}> - Nhãn hiệu : {data.labelByLabelId!= null?data.labelByLabelId.labelName: "Undefine"} </span>
      <br></br>
      <span style={{fontSize:"12px"}}> - Màu : {data.colorByColorId!= null?data.colorByColorId.colorName: "Undefine"} </span>
      <br></br>
      <span style={{fontSize:"12px"}}> - Ghi chú : {data.note!= null?data.note: "_"} </span>
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
        deliveryAmount: data[i].deliveryAmount,
        unit: data[i].unitByUnitId != null ? data[i].unitByUnitId.unitName: "_",
        unitPrice:data[i].unitPriceByUnitPrice!= null?  data[i].unitPriceByUnitPrice.price :"_",
        details: resultDetail(data[i])
      }
      result.push(row);
  }
  return result;
};



class ReceiptForm extends Component {
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
                    <label className="control-label col-md-4 mt-4">NGÀY LẤY ĐỒ </label>
                    <div className="col-md-8 mt-4">
                      <Tags
                        tags={ [
                          {
                            id: 1,
                            text: receipt.pickUpDate?receipt.pickUpDate:receipt.customerOrderByOrderId.pickUpDate
                          }
                        ]}
                        disabled={true}

                        theme="azure"
                        fill />
                    </div>
                    <label className="control-label col-md-4 mt-6">THỜI GIAN LẤY ĐỒ </label>
                    <div className="col-md-8 mt-6">
                      <Tags
                        tags={ [
                          {
                            id: 1,
                            text: receipt.pickUpTime?receipt.pickUpTime:receipt.customerOrderByOrderId.timeScheduleByPickUpTimeId.timeStart +" - "+receipt.customerOrderByOrderId.timeScheduleByPickUpTimeId.timeEnd
                          }
                        ]}
                        disabled={true}
                        theme="azure"
                        fill />
                    </div>
                </div>
                <div className="col-sm-6">
                  <label className="control-label col-md-4 mt-4">NGÀY TRẢ ĐỒ
</label>
                    <div className="col-md-8 mt-4">
                      <Tags
                        tags={[
                          {
                            id: 1,
                            text: receipt.deliveryDate?receipt.deliveryDate: receipt.customerOrderByOrderId.deliveryDate
                          }
                        ]}
                        disabled={true}
                        theme="azure"
                        fill />
                    </div>
                  <label className="control-label col-md-4 mt-6">THỜI GIAN TRẢ ĐỒ </label>
                  <div className="col-md-8 mt-6">
                    <Tags
                      tags={ [
                        {
                          id: 1,
                          text: receipt.deliveryTime?receipt.deliveryTime:receipt.customerOrderByOrderId.timeScheduleByDeliveryTimeId.timeStart +" - "+receipt.customerOrderByOrderId.timeScheduleByDeliveryTimeId.timeEnd
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
                    <label className="control-label col-md-4 mt-4" >NƠI LẤY ĐỒ </label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{receipt.customerOrderByOrderId.pickUpPlace !=null ?receipt.customerOrderByOrderId.pickUpPlace: "_" }</b></div>
                </div>
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >NƠI TRẢ ĐỒ </label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{receipt.customerOrderByOrderId.deliveryPlace !=null ?receipt.customerOrderByOrderId.deliveryPlace: "_" }</b></div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" > NV LẤY ĐỒ</label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{(receipt.staffByStaffPickUp) ?receipt.staffByStaffPickUp.fullName: "_" }</b></div>
                </div>
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >NV TRẢ ĐỒ</label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{(receipt.staffByStaffDelivery) ?receipt.staffByStaffDelivery.fullName: "_" }</b></div>
                </div>
              </div>
            
            </fieldset>
            <br></br><br></br>
            <fieldset>
              <legend>Chi tiết biên nhận</legend>
              <div className="col-sm-12">
                 <OrderDetailTable orderDetailList={proccessData(receipt.receiptDetailsByReceiptId.nodes)}></OrderDetailTable>
              </div>
            </fieldset>
          
          </form>

      );

  }
}
export default reduxForm({
  form: 'ReceiptForm'})(ReceiptForm);
