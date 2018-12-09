import renderField from 'components/FormInputs/renderField';
import React from 'react';
import { Field } from 'redux-form';

const renderItemOrderDetail = ({ fields, product,service,status, 
  CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc")),
   meta: { error, submitFailed } }) =>(
  <div>
     
      {submitFailed &&
        error &&
        <span>
          <label className="error" >{error}</label>
        </span>}
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th style={{width:"5%"}}>STT</th>
                <th style={{width:"20%"}}>Loại dịch vụ</th>
                <th style={{width:"25%"}}>Quần áo</th>
                <th style={{width:"7%"}}>SL</th>
                <th style={{width:"7%"}}>ĐVT</th>
                <th style={{width:"20%"}}>SL đã nhận</th>
                {CURRENT_USER.staffType.staffCode === "STAFF_02" &&
                <th style={{width:"20%"}}>SL đã xử lí</th>
      }
                {CURRENT_USER.staffType.staffCode === "STAFF_03" && status ==="PENDING_DELIVERY" &&
                <th style={{width:"20%"}}>SL đã trả</th>
                }
              </tr>
            </thead>
            <tbody>
            { 
              fields.map((orderDetail, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                  <Field
                        name={`${orderDetail}.id`}
                        type="text"
                        inputClassName="hidden"
                        disabled="true"
                        options={service}
                        component={renderField}
                        />
                      <Field
                        name={`${orderDetail}.serviceName`}
                        type="text"
                        disabled="true"
                        viewMode="true"
                        options={service}
                        component={renderField}
                        />
                    </td>
                  <td>
                  <Field
                        name={`${orderDetail}.productName`}
                        type="text"
                        disabled="true"
                        options={product}
                        viewMode="true"
                        component={renderField}
                        />
                  </td>
                  
                 
                    <td>
                            
                    
                    <Field
                        name={`${orderDetail}.amount`}
                        type="text"
                        disabled="true"
                        viewMode="true"
                        placeholder={"amount/weight"}
                        component={renderField}
                        />
                        </td>
                        <td>
                        <Field
                            name={`${orderDetail}.unit`}
                            type="text"
                            disabled="true"
                            viewMode="true"
                            component={renderField}
                            />
                    </td>
                    <td>
                    
                    <Field
                        name={`${orderDetail}.receivedAmount`}
                        type="text"
                        className="form-control"
                        disabled = {!(status === 'PENDING')}
                        viewMode = {!(status === 'PENDING')}
                        placeholder = "Nhập SL lấy"
                        component={renderField}
                        />
                    </td>
                    {CURRENT_USER.staffType.staffCode === "STAFF_02" && 
                    <td>

                    <Field
                        name={`${orderDetail}.processedAmount`}
                        type="text"
                        className="form-control"
                        placeholder = "Nhập SL đã xử lí"
                        component={renderField}
                        />
                    </td>
                    }
                     {CURRENT_USER.staffType.staffCode === "STAFF_03" && status ==="PENDING_DELIVERY" && 
                    <td>

                    <Field
                        name={`${orderDetail}.deliveryAmount`}
                        type="text"
                        disabled = {!(status === "PENDING_DELIVERY")}
                        viewMode = {!(status === "PENDING_DELIVERY")}
                        className="form-control"
                        placeholder = "Nhập SL trả"
                        component={renderField}
                        />
                    </td>
                     }
                </tr>
              ))}
            </tbody>
            </table>
            </div>
  )
export default (renderItemOrderDetail)