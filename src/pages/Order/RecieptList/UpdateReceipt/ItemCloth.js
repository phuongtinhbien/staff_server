import renderField from 'components/FormInputs/renderField';
import React from 'react';
import { Field } from 'redux-form';

const renderItemOrderDetail = ({ fields, product,service,status,  meta: { error, submitFailed } }) =>(
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
                <th style={{width:"15%"}}>Số lượng</th>
                <th style={{width:"20%"}}>SL đã nhận</th>
                <th style={{width:"20%"}}>SL đã trả</th>
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
                        component={renderField}
                        />
                  </td>
                  
                 
                    <td>
                            
                    
                    <Field
                        name={`${orderDetail}.amount`}
                        type="text"
                        disabled="true"
                        placeholder={"amount/weight"}
                        component={renderField}
                        />
                        <Field
                            name={`${orderDetail}.unit`}
                            type="text"
                            disabled="true"
                            component={renderField}
                            />
                    </td>
                    <td>

                    <Field
                        name={`${orderDetail}.receivedAmount`}
                        type="text"
                        className="form-control"
                        disabled = {!(status === 'PENDING')}
                        placeholder = "Nhập số lượng lấy"
                        component={renderField}
                        />
                    </td>
                    <td>

                    <Field
                        name={`${orderDetail}.deliveryAmount`}
                        type="text"
                        disabled = {!(status === "PENDING_DELIVERY")}
                        className="form-control"
                        placeholder = "Nhập số lượng trả"
                        component={renderField}
                        />
                    </td>
                </tr>
              ))}
            </tbody>
            </table>
            </div>
  )
export default (renderItemOrderDetail)