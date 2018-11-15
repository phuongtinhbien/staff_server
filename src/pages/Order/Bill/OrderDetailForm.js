
import moment from 'moment';
import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';



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

const sum = (tableData) => {
  let label = 0;
  let serviceName = {};
  for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
    if (!serviceName[tableData[i].serviceName] && tableData[i].unit === "Kg"){
        let subList = tableData.filter(value => value.serviceName === tableData[i].serviceName && tableData[i].unit === "Kg");
        label += tableData[i].unitPrice*tableData[i].amount;
        serviceName[tableData[i].serviceName] = tableData[i].serviceName;
    }
    else{
      label += tableData[i].unitPrice*tableData[i].amount;
    }
  
  }
  return (
    <strong>{ label.toLocaleString('vi-VI', { style: 'currency', currency: 'VND' }) }</strong>
  );
}



class OrderDetailForm extends Component {
  state = {
    date: moment(),
    startDate: moment(),
    endDate: moment(),
    dateRangeFocusedInput: null,
    viewMode: false
  
  };
  render () {
    
    let {bill} = this.props;
    const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
      return(

        <div className="content table-full-width"  >
        
        <table  style={{width:"100%"}} ref={el => (this.componentRef = el)}>
      
          <tbody>
              <tr>
                <td>
                  <h4>THÔNG TIN HÓA ĐƠN #{bill.id}</h4>
                </td>
                <td className="text-right">
                  <span > {bill.createDate.toLocaleString('vi-VI', { style: 'datetime' })}</span>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                    <table  style={{border:"none", width:"100%"}} cellSpacing="10px" cellPadding="5px">
                    <thead>
                    <th style={{width:"50%"}}></th>
                    <th style={{width:"50%"}}></th>
                    </thead>
                    
                        <tbody>
                            <tr>
                              <td className="td-name">
                              <strong>Họ tên KH: &nbsp;</strong>
                                <span>{bill.receiptByReceiptId.customerOrderByOrderId.customerByCustomerId.fullName}</span>
                              </td>
                              <td>
                              <strong>Số điện thoại: &nbsp;</strong>
                                <span>{bill.receiptByReceiptId.customerOrderByOrderId.customerByCustomerId.phone}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                              <strong>Chi nhánh: &nbsp;</strong>
                                <span>{bill.receiptByReceiptId.customerOrderByOrderId.branchByBranchId.branchName}</span>
                              </td>
                              <td>
                              <strong>Địa chỉ CN: &nbsp;</strong>
                                <span>{bill.receiptByReceiptId.customerOrderByOrderId.branchByBranchId.address}</span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                              <strong>Nơi lấy đồ: &nbsp;</strong>
                                <span>{bill.receiptByReceiptId.customerOrderByOrderId.pickUpPlace}</span>
                              </td>
                              <td>
                              <strong>Nơi trả đồ: &nbsp;</strong>
                                <span>{bill.receiptByReceiptId.customerOrderByOrderId.deliveryPlace}</span>
                              </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
              </tr>
              <tr><td>&nbsp;</td></tr>
              <tr><td>&nbsp;</td></tr>
              <tr>
                <td colSpan="2">
                  <table className="table table-bigboy">
                    <thead>
                      <th>STT</th>
                      <th>Loại dịch vụ</th>
                      <th>Quần áo</th>
                      <th className="text-right">ĐVT</th>
                      <th className="text-right">Đơn giá</th>
                      <th className="text-right">Số lượng/ Khối lượng</th>
                      <th className="text-right">Tổng tạm</th>
                    </thead>
                    <tbody>
                      {
                        bill.billDetailsByBillId.nodes.length>0 &&
                        bill.billDetailsByBillId.nodes.map ((value, i)=>(
                          <tr key={i}>
                          <td>
                            {i+1}
                          </td>
                          <td>
                            {value.serviceTypeByServiceTypeId.serviceTypeName}
                          </td>
                          <td>
                            {value.productByProductId.productName}
                          </td>
                          <td className="text-right">
                            {value.unitByUnitId.unitName}
                          </td>
                          <td className="text-right">
                            {value.unitPriceByUnitPrice?value.unitPriceByUnitPrice.price.toLocaleString('vi-VI', { style: 'currency', currency: 'VND' }):"" }
                          </td>
                          <td className="text-right">
                            {value.amount}
                          </td>
                          <td className="text-right">
                            {value.unitPriceByUnitPrice?(value.amount * value.unitPriceByUnitPrice.price).toLocaleString('vi-VI', { style: 'currency', currency: 'VND' }):""}
                          </td>
                        </tr>
                        ))
                      }
                      <tr>
                    <td colSpan="6" className="text-right"><h5> Tổng tiền: &nbsp;</h5></td>
                      <td  className="text-right"><h5> {sum(proccessData(bill.billDetailsByBillId.nodes))}</h5></td>
                    </tr>

                    </tbody>
                    </table>
                </td>
              </tr>
              <tr><td><br></br></td></tr>
             <tr>
               <td className="text-center"><strong>Người lập hóa đơn</strong>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <strong>{bill.staffByCreateBy.fullName}</strong>
               </td>
               <td className="text-center"><strong>Khách hàng</strong>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <strong>{bill.receiptByReceiptId.customerOrderByOrderId.customerByCustomerId.fullName}</strong>
               </td>
               </tr>
          </tbody>
        </table>
        
        
        </div>
      );

  }
}
export default (OrderDetailForm);
