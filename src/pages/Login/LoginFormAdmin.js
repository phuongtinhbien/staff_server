import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Bắt buộc';
  } 
  if (!values.password) {
    errors.password = 'Bắt buộc';
  } else if (values.password.length < 4) {
    errors.password = 'Mật khẩu phải từ 6 kí tự trở lên';
  }
  return errors;
};

const LoginForm = ({
  submitting,
  handleSubmit,
  submitForm,
  errorContent
}) => (
  <div>
    <div className="header">
      <h4>Đăng nhập (ADMIN)</h4>
    </div>
    <div >
    
      <form onSubmit={handleSubmit}>
     { errorContent &&<label className="error" style={{color:"red",fontSize:11, fontWeight:"normal"}}>{errorContent}</label>}
        <div className="form-group">
          <label className="control-label">Tên đăng nhập</label>
          <Field
            name="email"
            type="text"
            component={renderField} />
        </div>

        <div className="form-group">
          <label className="control-label">Mật khẩu</label>
          <Field
            name="password"
            type="password"
            component={renderField} />
        </div>


      <div className="text-right">
        <button type="submit" className="btn btn-fill btn-info" disabled={submitting}>Đăng nhập</button>
        </div>
      </form>
    </div>
  </div>
);

export default reduxForm({
  form: 'loginFormAdmin',
  validate
})(LoginForm)