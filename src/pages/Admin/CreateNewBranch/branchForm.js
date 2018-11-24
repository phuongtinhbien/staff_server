import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import renderField from 'components/FormInputs/renderField';
import VectorMap from './VectorMap';
import { reducer as formReducer } from 'redux-form/immutable';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

let BranchForm = ({allService}) => {

  return (
    
    <div className="card">
      <div className="header">
        <h4>Thêm chi nhánh mới</h4>
      </div>
      <div className="content">
        <form className="form-horizontal" >
          <div className="form-group">
  
            <label className="control-label col-md-3">Tên chi nhánh</label>
            <div className="col-md-9">
              <Field
                name="branchName"
                type="text"
                value=""
                placeholder ="Tên chi nhánh"
                component={renderField}
               />
            </div>
          </div>
         
            <div className="form-group">
            <label className="control-label col-md-3">Trạng thái</label>
            <div className="col-md-9 checkbox-group">
              <Field
                name="status"
                type="checkbox"
                value="ACTIVE"
                label="Hoạt động?"
                component={renderField} />
            </div>
           
          </div>
          <div className="form-group">
            <label className="control-label col-md-3">Dịch vụ hỗ trợ</label>
            <div className="col-md-9 ">
              <Field
                name="serviceType"
                type="select"
                isMulti={true}
                options={allService}
                placeholder="Chọn các dịch vụ hỗ trợ"
                hidden="true"
                className="form-control-hidden"
                component={renderField} />
                 
            </div>       
          </div>
          
          <div className="form-group">
            <label className="control-label col-md-3">Vị trí chi nhánh</label>
            <div className="col-md-9 ">
              <Field
                name="latitude"
                type="text"
                placeholder=""
                hidden="true"
                className="form-control-hidden"
                component="input" />
                 <Field
                name="longtitude"
                type="text"
                hidden="true"
                className="form-control-hidden"
                component="input" />
                <VectorMap></VectorMap>
            </div>       
          </div>
          <div className="form-group">
              <label className="control-label col-md-3"></label>
              <div className="col-md-9">
                      <button type="submit" className="btn btn-fill btn-info" >Lưu lại</button>
                      &nbsp;
                      &nbsp;
                      <Link className="btn btn-fill btn-danger" to="/admin/branch-management">
                      Hủy
                      </Link>
              </div>
          </div>
        </form>
      </div>
    </div>
  )
};
BranchForm = reduxForm({
  form: 'BranchForm',
  enableReinitialize : true,
})(BranchForm)
  export default BranchForm;