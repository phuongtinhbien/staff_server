import renderField from 'components/FormInputs/renderField';
import React from 'react';
import { Field } from 'redux-form';

const renderItemOrderDetail = ({ fields,product, disabled, unit,  meta: { error, submitFailed } }) =>(
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
          <label className="error" style={{color:"red",fontSize:11, fontWeight:"normal"}} >{error}</label>
        </span>}
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th style={{width:"5%"}}>STT</th>
                <th style={{width:"25%"}}>Quần áo</th>
                <th style={{width:"15%"}}>ĐVT</th>
                <th style={{width:"20%"}}>Đơn giá</th>
                <th style={{width:"3%"}}>Xóa</th>
              </tr>
            </thead>
            <tbody>
            { fields.length>0?
              fields.map((orderDetail, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  
                  <td>
                  <Field
                        name={`${orderDetail}.product`}
                        type="select"
                        options={product}
                        disabled = {disabled}
                        placeholder={"Chọn quần áo"}
                        component={renderField}
                        />
                  </td>
                  
                 
                    <td>
                    <Field
                        name={`${orderDetail}.unit`}
                        type="select"
                        placeholder= {"Chọn đơn vị tính"}
                        options={unit}
                        component={renderField}
                        />
                   
                    </td>
                    <td>
                 
                    <Field
                        name={`${orderDetail}.price`}
                        type="text"
                        className="form-control"
                        placeholder = "Nhập đơn giá"
                        component={renderField}
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
              )): <tr><td colSpan="15" className="text-center">Không có quần áo</td></tr>}
            </tbody>
            </table>
            </div>
  )
export default (renderItemOrderDetail)