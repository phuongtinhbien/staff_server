
import Tags from 'components/Tags';
import moment from 'moment';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import OrderDetailTable from './OrderDetailTable';
import status from './../status';
import gql from "graphql-tag";
import { Mutation, Query } from 'react-apollo';



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
        unit: data[i].unitByUnitId != null ? data[i].unitByUnitId.unitName: "_",
        unitPrice:data[i].unitPriceByUnitPrice!= null?  data[i].unitPriceByUnitPrice.price :"_",
        details: resultDetail(data[i])
      }
      result.push(row);
  }
  return result;
};

const GENERATE_BILL = gql `mutation generateBill($coId: BigFloat!, $currUser: BigFloat!) {
  generateBill(input: {coId: $coId, currUser: $currUser}) {
    bill {
      id
      nodeId
      receiptId
    }
  }
}
`;



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
    const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
      return(

          <form className="form-horizontal" >
          <fieldset>
              
              <legend>
              <div style={{justifyContent: "space-between"}}>
                <span>Thông tin đơn hàng - {customerOrder.id} <span className="badge badge-warning">{status(customerOrder.status)}</span> &nbsp;&nbsp;&nbsp;</span>
                {customerOrder.receiptsByOrderId.nodes[0] && <Link className="btn btn-warning btn-sm" to={"/order/reciept-list/view/"+customerOrder.receiptsByOrderId.nodes[0].nodeId}>Xem biên nhận</Link>}
              </div>
              </legend>
              
              <div className="row">
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4">Họ tên KH</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{customerOrder.customerByCustomerId.fullName}</b></div>
                  <label className="control-label col-md-4">Số điện thoại</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>{customerOrder.customerByCustomerId.phone}</div>
                </div>
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4">Email</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>{customerOrder.customerByCustomerId.email}</div>
                  <label className="control-label col-md-4">Địa chỉ</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>{customerOrder.customerByCustomerId.address}</div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4 mt-4">Chi nhánh</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                    <span className="btn btn-primary btn-sm btn-fill btn-linkedin">{customerOrder.branchByBranchId.branchName}</span>
                  </div>
                </div>
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4 mt-4">Địa chỉ CN</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                    <span >{customerOrder.branchByBranchId.address}</span>
                  </div>
                </div>
              </div>
              <div className="row"><br></br></div>
              <div className="row">
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4">Ngày lấy đồ </label>
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
                    <label className="control-label col-md-4 mt-6">Thời gian lấy đồ </label>
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
                  <label className="control-label col-md-4 mt-4">Ngày trả đồ </label>
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
                  <label className="control-label col-md-4 mt-6">Thời gian trả đồ </label>
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
                    <label className="control-label col-md-4 mt-4" >Nơi lấy đồ </label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{customerOrder.pickUpPlace !=null ?customerOrder.pickUpPlace: "_" }</b></div>
                </div>
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >Nơi trả đồ </label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{customerOrder.pickUpPlace !=null ?customerOrder.deliveryPlace: "_" }</b></div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >NV lấy đồ</label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{(customerOrder.receiptsByOrderId.nodes[0] !=null && customerOrder.receiptsByOrderId.nodes[0].staffByStaffPickUp !=null) ?customerOrder.receiptsByOrderId.nodes[0].staffByStaffPickUp.fullName: "_" }</b></div>
                </div>
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >NV trả đồ</label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b>{(customerOrder.receiptsByOrderId.nodes[0] !=null && customerOrder.receiptsByOrderId.nodes[0].staffByStaffDelivery !=null) ?customerOrder.receiptsByOrderId.nodes[0].staffByStaffDelivery.fullName: "_" }</b></div>
                </div>
              </div>
            
            </fieldset>
            <br></br><br></br>
            <Mutation
                  mutation={GENERATE_BILL}
                  
                >
                  {generateBill => (
                     <div className="text-center">
                    {CURRENT_USER.staffType.staffCode ==='STAFF_01' &&
                    <button
                      type="submit"
                      className="btn btn-fill btn-info"
                      disabled={!(customerOrder.status ==="FINISHED_SERVING")}
                      className={(customerOrder.status ==="FINISHED_SERVING")? "btn btn-fill btn-info ": "btn btn-fill btn-info hidden"}
                      onClick={e => {
                        e.preventDefault();
                        this.setState({approve: true, decline: false});
                        generateBill({variables:{coId: customerOrder.id, currUser: CURRENT_USER.id}});
                      }}
                    >
                      Tạo hóa đơn
                    </button>
                  }
                   </div>
                  )}

                </Mutation>
            <fieldset>
              <legend>Chi tiết đơn hàng</legend>
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
