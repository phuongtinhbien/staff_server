import renderField from 'components/FormInputs/renderField';
import React from 'react';
import { Field } from 'redux-form';


const SortCloth = ({ fields,  meta: { error, submitFailed } }) =>(
    <div>
      
      {submitFailed &&
        error &&
        <span className = "error">
        <label className="error" >{error}</label>
         
        </span>}
            {/* <span className="title"> Kết quả phân loại </span> */}
          <table className="table table-hover table-striped">
            <thead>

              <tr>
                <th style={{width:"5%"}}>S/N</th>
                <th style={{width:"15%"}}>WASH BAG</th>
                <th>SERVICE TYPE</th>
                <th style={{width:"15%"}}>COLOR GROUP</th>
                <th style={{width:"20%"}}>CLOTH</th>
                <th style={{width:"15%"}}>AMOUNT</th>
                <th style={{width:"15%"}}>Options</th>
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
                        viewMode ={true}
                        disabled="true"
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
                        name={`${item}.amount`}
                        type="text"
                        viewMode ={true}
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
              )): <tr><td colSpan="15" className="text-center">Không có dữ liệu</td></tr>}
            </tbody>
            </table>
            </div>
  )
export default (SortCloth)