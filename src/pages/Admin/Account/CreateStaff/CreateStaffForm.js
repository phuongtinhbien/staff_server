import renderField from 'components/FormInputs/renderField';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field,reduxForm } from 'redux-form';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const required = value => (value ? undefined : 'Bắt buộc')

class  StaffForm extends Component{

  

  render(){
    let {handleSubmit,allService,allStaffType} = this.props;
    return (
    
      <div className="card">
        <div className="header">
          <h4>Thêm nhân viên mới</h4>
        </div>
        <div className="content">
          <form className="form-horizontal" onSubmit={handleSubmit} >
            <div className="form-group">
    
              <label className="control-label col-md-3">Tên nhân viên</label>
              <div className="col-md-9">
                <Field
                  name="fullName"
                  type="text"
                  value=""
                  validate={required}
                  placeholder ="Tên nhân viên"
                  component={renderField}
                 />
              </div>
             </div>
             <div className="form-group">
    
              <label className="control-label col-md-3">Số điện thoại</label>
              <div className="col-md-9">
                <Field
                  name="phone"
                  type="text"
                  value=""
                  validate={required}
                  placeholder ="Số điện thoại"
                  component={renderField}
                 />
              </div>
             </div>
             <div className="form-group">
    
              <label className="control-label col-md-3">Địa chỉ</label>
              <div className="col-md-9">
                <Field
                  name="address"
                  type="text"
                  value=""
                  validate={required}
                  placeholder ="Địa chỉ"
                  component={renderField}
                 />
              </div>
             </div>
             <div className="form-group">
    
              <label className="control-label col-md-3">Email</label>
              <div className="col-md-9">
                <Field
                  name="email"
                  type="email"
                  value=""
                  validate={required}
                  placeholder ="Địa chỉ email"
                  component={renderField}
                 />
              </div>
             </div>
             <div className="form-group">
    
              <label className="control-label col-md-3">Mật khẩu</label>
              <div className="col-md-9">
                <Field
                  name="password"
                  type="password"
                  value=""
                  validate={required}
                  placeholder ="Mật khẩu"
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
                <label className="control-label col-md-3">Giới tính</label>
                <div className="col-md-9 checkbox-group">
                    <Field
                    name="gender"
                    type="checkbox"
                    value="ACTIVE"
                    label="Nữ?"
                    component={renderField} />
                </div>
             
             </div>
            <div className="form-group">
              <label className="control-label col-md-3">Loại nhân viên</label>
              <div className="col-md-9 ">
                <Field
                  name="staffType"
                  type="select"
                  
                  validate={required}
                  options={allStaffType}
                  placeholder="Chọn loại nhân viên"
                  hidden="true"
                  className="form-control-hidden"
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
  }
  
StaffForm = reduxForm({
  form: 'StaffForm',
  enableReinitialize : false,
})(StaffForm)
  export default StaffForm;