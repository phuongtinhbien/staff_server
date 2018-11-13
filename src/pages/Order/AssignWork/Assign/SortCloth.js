import renderField from 'components/FormInputs/renderField';
import React from 'react';
import { Field } from 'redux-form';


const SortCloth = ({ fields, receiptDetail,serviceArrays,  meta: { error, submitFailed } }) =>(
    <div>
      
      {submitFailed &&
        error &&
        <span>
        
         
        </span>}
            {/* <span className="title"> Kết quả phân loại </span> */}
          <table className="table table-hover table-striped">
            <thead>

              <tr>
                <th style={{width:"5%"}}>STT</th>
                <th style={{width:"15%"}}>Túi giặt</th>
                <th>Loại DV</th>
                <th style={{width:"15%"}}>Nhóm màu</th>
                <th style={{width:"20%"}}>Quần áo</th>
                <th style={{width:"15%"}}>Số lượng</th>
                <th style={{width:"15%"}}>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
           
            { fields.length>0?
              fields.map((item, index) => (
                
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                      <Field
                        name={`${item}.washbagCode`}
                        type="text"
                        component={renderField}
                        />
                      
                    </td>
                  <td>
                      <Field
                        name={`${item}.serviceTypeId`}
                        type="text"
                        disabled="true"
                        inputClassName="hidden"
                        component={renderField}
                        />
                        <Field
                        name={`${item}.serviceName`}
                        type="text"
                        disabled="true"
                        viewMode ={true}
                        component={renderField}
                        />
                    </td>
                    <td>
                      <Field
                        name={`${item}.colorGroupId`}
                        type="text"
                        disabled="true"
                        inputClassName="hidden"
                        component={renderField}
                        />
                        <Field
                        name={`${item}.colorGroupName`}
                        type="text"
                        disabled="true"
                        viewMode ={true}
                        component={renderField}
                        />
                    </td>
                  <td>
                  <Field
                        name={`${item}.productId`}
                        type="text"
                        disabled="true"
                        inputClassName="hidden"
                        component={renderField}
                        />
                         <Field
                          name={`${item}.productName`}
                          type="text"
                          disabled="true"
                          viewMode ={true}
                          component={renderField}
                        />
                  </td>
                  
                 
                    <td>
                  
                    <Field
                        name={`${item}.receivedAmount`}
                        type="text"
                        disabled="true"
                        component={renderField}
                        />
                    </td>
                    <td>
                      <span><strong>- Label : </strong><Field
                          name={`${item}.labelName`}
                          type="text"
                          disabled="true"
                          viewMode ={true}
                          component={renderField}
                        /></span>
                      <span><strong>- Material :</strong>  <Field
                          name={`${item}.materialName`}
                          type="text"
                          disabled="true"
                          viewMode ={true}
                          component={renderField}
                        /></span>
                      <span><strong>- ColorName :</strong>  <Field
                          name={`${item}.colorName`}
                          type="text"
                          disabled="true"
                          viewMode ={true}
                          component={renderField}
                        /></span>
                   
                  <Field
                        name={`${item}.labelId`}
                        type="text"
                        disabled="true"
                        inputClassName="hidden"
                        component={renderField}
                        />
                  
                  <Field
                        name={`${item}.materialId`}
                        type="text"
                        disabled="true"
                        inputClassName="hidden"
                        component={renderField}
                        />
                   
                   
                    <Field
                        name={`${item}.colorId`}
                        type="text"
                        disabled="true"
                        inputClassName="hidden"
                        component={renderField}
                        />
                    </td>

                  
                  
                </tr>
              )): <tr><td colSpan="15" className="text-center">There are no records</td></tr>}
            </tbody>
            </table>
            </div>
  )
export default (SortCloth)