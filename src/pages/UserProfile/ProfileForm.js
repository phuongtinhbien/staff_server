import React from 'react';
import { Field, reduxForm } from 'redux-form';
import gql  from "graphql-tag";
import renderField from 'components/FormInputs/renderField';

const ProfileForm = ({current_user, history}) => (
  <div className="card">
    <div className="header">
      <h4 className="title">Thông tin người dùng <span className="badge badge-warning">{current_user.staffType.staffType}</span></h4>
    </div>
    <div className="content">
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
            <label>Chi nhánh</label>
              <br></br>
              <strong>{current_user.branch.branchName}</strong>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
            <label>Địa chỉ chi nhánh</label>
              <br></br>
              <strong>{current_user.branch.address}</strong>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Họ tên</label>
              <br></br>
              <strong>{current_user.name}</strong>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Email</label>
              <br></br>
              <strong>{current_user.email}</strong>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Địa chỉ</label>
              <br></br>
              <strong>{current_user.address}</strong>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Số điện thoại</label>
              <br></br>
              <strong>{current_user.phone}</strong>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-info btn-fill pull-right" onClick={e=> history.goBack()}>Back</button>
        <div className="clearfix"></div>
      </form>
    </div>
  </div>
);
export default reduxForm({
  form: 'ProfileForm',
  initialValues:{
    store: "Creative Code Inc.",
    branch: "",


  }
})(ProfileForm);