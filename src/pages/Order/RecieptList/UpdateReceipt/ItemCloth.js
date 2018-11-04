import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import renderField from 'components/FormInputs/renderField';

const renderItemOrderDetail = ({ fields, color, label, material, product,service, unit,  meta: { error, submitFailed } }) =>(
  <div>
     
      {submitFailed &&
        error &&
        <span>
          <label className="error" >{error}</label>
        </span>}
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th style={{width:"5%"}}>S/N</th>
                <th style={{width:"20%"}}>SERVICE TYPE</th>
                <th style={{width:"25%"}}>CLOTH</th>
                <th style={{width:"15%"}}>AMOUNT</th>
                <th style={{width:"20%"}}>Recieved Amount</th>
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
                        placeholder = "Enter Received Amount"
                        component={renderField}
                        />
                    </td>

                  
                  {/* <td className="text-right">
                    <a rel="tooltip"
                      className="btn btn-danger btn-simple btn-xs"
                      data-original-title="View Profile"
                      onClick={() => fields.remove(index)}>
                      <i className="fa fa-remove"></i>
                    </a>
                  </td> */}
                </tr>
              ))}
            </tbody>
            </table>
            </div>
  )
export default (renderItemOrderDetail)