import React from 'react';
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';

const CreateClothCategory = (props) => (
  <div className="card">
    <div className="header">
      <h4>Edit Cloth Category</h4>
    </div>
    <div className="content">
      <form className="form-horizontal">
        <div className="form-group">
          <label className="control-label col-md-3">Category Name</label>
          <div className="col-md-9">
            <input type="hidden" name="id" value={props.productType.id}/>
            <Field
              name="categoryName"
              type="text"
              component={renderField}
              value = {props.productType.productTypeName}/>
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-md-3">Status</label>
          <div className="col-md-9 checkbox-group">
            <Field
              name="status"
              type="checkbox"
              value={props.productType.status}
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