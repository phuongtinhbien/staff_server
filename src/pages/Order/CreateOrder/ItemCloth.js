import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import validate from './validate';
import renderField from 'components/FormInputs/renderField';

const renderItemOrderDetail = ({ fields, color, label, material, product,service, unit,  meta: { error, submitFailed } }) =>(
  <div>
      <button
      type="button"
        className={"btn btn-fill btn-warning"}
        onClick={() => fields.push({})}
        >
        Add to bag
    </button>
      {submitFailed &&
        error &&
        <span>
          {error}
        </span>}
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th style={{width:"5%"}}>S/N</th>
                <th>SERVICE TYPE</th>
                <th style={{width:"25%"}}>CLOTH</th>
                <th style={{width:"15%"}}>AMOUNT</th>
                <th style={{width:"20%"}}>Options</th>
              </tr>
            </thead>
            <tbody>
            {fields.map((orderDetail, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                      <Field
                        name={`${orderDetail}.serviceTypeId`}
                        type="select"
                        options={service}
                        component={renderField}
                        />
                    </td>
                  <td>
                  <Field
                        name={`${orderDetail}.productId`}
                        type="select"
                        options={product}
                        component={renderField}
                        />
                  </td>
                  
                 
                    <td>
                    {
                        unit.map(i =>(
                            <Field
                            name={`${orderDetail}.unitId`}
                            type="radio"
                            value={i.value}
                            label= {i.label}

                            component={renderField}
                            />
                        ))
                    }
                    <Field
                        name={`${orderDetail}.amount`}
                        type="text"
                        placeholder={"amount/weight"}
                        component={renderField}
                        />
                    </td>
                    <td>
                   
                  <Field
                        name={`${orderDetail}.labelId`}
                        type="select"
                        placeholder ="Choose label"
                        options={label}
                        component={renderField}
                        />
                  
                  <Field
                        name={`${orderDetail}.materialId`}
                        type="select"
                        options={material}
                        placeholder = "Choose material"
                        component={renderField}
                        />
                   
                   
                    <Field
                        name={`${orderDetail}.colorId`}
                        type="select"
                        options={color}
                        placeholder = "Choose color"
                        component={renderField}
                        />
                   
                    <Field
                        name={`${orderDetail}.note`}
                        type="text"
                        className="form-control"
                        placeholder = "Enter note"
                        component="textarea"
                        />
                    </td>

                  
                  <td className="text-right">
                    <a rel="tooltip"
                      className="btn btn-danger btn-simple btn-xs"
                      data-original-title="View Profile"
                      onClick={() => fields.remove(index)}>
                      <i className="fa fa-remove"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
            </div>
  )
export default (renderItemOrderDetail)