import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';

const CreateClothCategory = () => (
  <div className="card">
    <div className="header">
      <h4>Add new Cloth Category</h4>
    </div>
    <div className="content">
      <form className="form-horizontal">
        <div className="form-group">
          <label className="control-label col-md-3">Category Name</label>
          <div className="col-md-9">
            <Field
              name="categoryName"
              type="text"
              component={renderField}
              helpText="Category Name is unique" />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Status</label>
          <div className="col-md-9 checkbox-group">
            <Field
              name="status"
              type="checkbox"
              value="true"
              label="Active"
              component={renderField} />
          </div>
        </div>
        <button type="submit" className="btn btn-fill btn-info" >Save</button>
      </form>
    </div>
  </div>
);

export default reduxForm({
  form: 'createClothCategory'
})(CreateClothCategory);