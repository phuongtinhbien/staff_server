
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
        unit: data[i].unitByUnitId != null ? data[i].unitByUnitId.unitName: "_",
        unitPrice:data[i].unitPriceByUnitPrice!= null?  data[i].unitPriceByUnitPrice.price :"_",
        details: resultDetail(data[i])
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
    
    let {customerOrder} = this.props;
  
      return(

          <form className="form-horizontal" >
          <fieldset>
              
              <legend>
              <div style={{justifyContent: "space-between"}}>
                <span>Order's Information - {customerOrder.id} <span className="badge badge-warning">{customerOrder.status}</span> </span>
                
              </div>
              </legend>
              
              <div className="row">
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4">Full name</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{customerOrder.customerByCustomerId.fullName}</b></div>
                  <label className="control-label col-md-4">Phone number</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>{customerOrder.customerByCustomerId.phone}</div>
                </div>
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4">Email</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>{customerOrder.customerByCustomerId.email}</div>
                  <label className="control-label col-md-4">Address</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>{customerOrder.customerByCustomerId.address}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4 mt-4">Branch</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                    <span className="btn btn-primary btn-sm btn-fill btn-linkedin">{customerOrder.branchByBranchId.branchName}</span>
                  </div>
                </div>
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4 mt-4">Branch's Address</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                    <span >{customerOrder.branchByBranchId.address}</span>
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
                            text: customerOrder.pickUpDate
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
                            text: customerOrder.timeScheduleByPickUpTimeId.timeStart +" - "+customerOrder.timeScheduleByPickUpTimeId.timeEnd
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
                            text: customerOrder.deliveryDate
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
                          text: customerOrder.timeScheduleByDeliveryTimeId.timeStart +" - "+customerOrder.timeScheduleByDeliveryTimeId.timeEnd
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
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{customerOrder.pickUpPlace !=null ?customerOrder.pickUpPlace: "_" }</b></div>
                </div>
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >Delivery place </label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{customerOrder.pickUpPlace !=null ?customerOrder.deliveryPlace: "_" }</b></div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" > Pick up Staff</label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{(customerOrder.receiptsByOrderId.nodes[0] !=null && customerOrder.receiptsByOrderId.nodes[0].staffByStaffPickUp !=null) ?customerOrder.receiptsByOrderId.nodes[0].staffByStaffPickUp.fullName: "_" }</b></div>
                </div>
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >Delivery Staff </label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{(customerOrder.receiptsByOrderId.nodes[0] !=null && customerOrder.receiptsByOrderId.nodes[0].staffByStaffDelivery !=null) ?customerOrder.receiptsByOrderId.nodes[0].staffByStaffDelivery.fullName: "_" }</b></div>
                </div>
              </div>
            
            </fieldset>
            <br></br><br></br>
            <fieldset>
              <legend>Order Detail</legend>
              <div className="col-sm-12">
                <OrderDetailTable orderDetailList={proccessData(customerOrder.orderDetailsByOrderId.nodes)}></OrderDetailTable>
              </div>
            </fieldset>
          
          </form>

      );

  }
}
export default reduxForm({
  form: 'OrderDetailForm'})(OrderDetailForm);
