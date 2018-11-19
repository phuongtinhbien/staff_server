
import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { FieldArray, reduxForm } from 'redux-form';
import renderItemBill from './updateAmount';







class BillForm extends Component {
  state = {
    date: moment(),
    startDate: moment(),
    endDate: moment(),
    dateRangeFocusedInput: null,
    viewMode: false
  
  };
  render () {
    
    let {bill,handleSubmit} = this.props;
    const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
      return(

        <div className="content table-full-width"  >
        <form className="form-horizontal" onSubmit={handleSubmit}>
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
                    <tr>
                    <th style={{width:"50%"}}></th>
                    <th style={{width:"50%"}}></th>
                    </tr>
                    
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
                
                    <FieldArray name="billDetail" billDetail={bill.billDetailsByBillId.nodes} component={renderItemBill} />
                    
                </td>
              </tr>
              <tr><td><br></br></td></tr>
            
          </tbody>
        </table>
        <div className = "text-center">

        <button
                      type="submit"
                      className="btn btn-fill btn-info"
                     
                      onClick={e => {
                        
                      
                      }}
                    >
                      Cập nhật hóa đơn
                    </button>
                    </div>
        </form>

        </div>
      );

  }
}
export default reduxForm({
  form: 'BillForm'})(BillForm);
