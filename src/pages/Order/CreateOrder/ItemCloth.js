import renderField from 'components/FormInputs/renderField';
import React from 'react';
import { Field } from 'redux-form';

const renderItemOrderDetail = ({ fields, color, label, material, product,service, unit,  meta: { error, submitFailed } }) =>(
  <div>
      <button
      type="button"
        className={"btn btn-fill btn-warning"}
        onClick={() => fields.push({})}
        >
        Thêm quần áo
    </button> &nbsp;
      {submitFailed &&
        error &&
        <span>
          <label className="error" >{error}</label>
        </span>}
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th style={{width:"5%"}}>STT</th>
                <th>Loại DV</th>
                <th style={{width:"25%"}}>Quần áo</th>
                <th style={{width:"15%"}}>Số lượng</th>
                <th style={{width:"20%"}}>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
            { fields.length>0?
              fields.map((orderDetail, index) => (
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
              )): <tr><td colSpan="15" className="text-center">Không có quần áo trong đơn hàng</td></tr>}
            </tbody>
            </table>
            </div>
  )
export default (renderItemOrderDetail)