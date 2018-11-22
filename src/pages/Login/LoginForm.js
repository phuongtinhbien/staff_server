import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Bắt buộc';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email chưa đúng'
  }
  if (!values.password) {
    errors.password = 'Bắt buộc';
  } else if (values.password.length < 6) {
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
  <div className="card">
    <div className="header">
      <h4>Đăng nhập</h4>
    </div>
    <div className="content">
    
      <form onSubmit={handleSubmit}>
     { errorContent &&<label className="error" style={{color:"red",fontSize:11, fontWeight:"normal"}}>{errorContent}</label>}
        <div className="form-group">
          <label className="control-label">Email</label>
          <Field
            name="email"
            type="email"
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
  form: 'loginForm',
  validate
})(LoginForm)