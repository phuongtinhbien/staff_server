import renderField from 'components/FormInputs/renderField';
import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
const options = [
    { value: 'color', label: 'Màu sắc' },
    { value: 'label', label: 'Nhãn hiệu' },
    { value: 'colorGroup', label: 'Nhóm màu' },
    { value: 'material', label: 'Chất liệu' }
  ];

OptionForm = ({allService}) => {

  return (
    
    <div className="card">
      <div className="header">
        <h4>Thêm thuộc tính mới</h4>
      </div>
      <div className="content">
        <form className="form-horizontal" >
          
          <div className="form-group">
            <label className="control-label col-md-3">Loại thuộc tính</label>
            <div className="col-md-9 ">
              <Field
                name="latitude"
                type="select"
                
                options={options}
                placeholder=""
                hidden="true"
                className="form-control-hidden"
                component={renderField} />
                 
            </div>       
          </div>
          <div className="form-group">
            <label className="control-label col-md-3">Tên thuộc tính</label>
            <div className="col-md-9">
              <Field
                name="branchName"
                type="text"
                value=""
                placeholder ="Tên thuộc tính"
                component={renderField}
               />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-md-3">Giá trị thuộc tính</label>
            <div className="col-md-9">
              <Field
                name="branchName"
                type="text"
                value=""
                placeholder ="Giá trị thuộc tính"
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
OptionForm = reduxForm({
  form: 'OptionForm',
  enableReinitialize : true,
})(OptionForm)
  export default OptionForm;