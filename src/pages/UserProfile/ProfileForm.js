import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { SingleDatePicker, DateRangePicker } from 'react-dates';
import gql  from "graphql-tag";
import renderField from 'components/FormInputs/renderField';

const CURRENT_USER = localStorage.getItem("luandryStaffPage.curr_staff_desc");
const ProfileForm = () => (
  <div className="card">
    <div className="header">
      <h4 className="title">Edit Profile <span className="badge badge-warning">...</span></h4>
    </div>
    <div className="content">
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Store (disabled)</label>
              <Field type="text" className="form-control" name="store" disabled="true" placeholder="store" defaultValue="Creative Code Inc." 
              component={renderField}/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Branch</label>
              <Field type="text" className="form-control" name="branch" disabled="true" placeholder="Username" defaultValue="michael23" component={renderField}/>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Full Name</label>
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
              <label>Address</label>
              <input type="text" className="form-control" placeholder="Home Address" defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-info btn-fill pull-right">Update Profile</button>
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
    fullName: CURRENT_USER.name,
    email: CURRENT_USER.email

  }
})(ProfileForm);