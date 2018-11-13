import React from 'react';
import { Field, reduxForm } from 'redux-form';
import gql  from "graphql-tag";
import renderField from 'components/FormInputs/renderField';

const ProfileForm = ({current_user}) => (
  <div className="card">
    <div className="header">
      <h4 className="title">Cập nhật thông tin <span className="badge badge-warning">...</span></h4>
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
              <Field type="text" className="form-control" name="fullName" placeholder="Company" defaultValue="Mike" component={renderField}/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Email</label>
              <Field type="text" className="form-control" name="email" disabled="true" placeholder="Last Name" defaultValue="Andrew" component={renderField} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Địa chỉ</label>
              <input type="text" className="form-control" name="staffAddress" placeholder="Home Address" defaultValue={current_user.address} />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-info btn-fill pull-right">Cập nhật</button>
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