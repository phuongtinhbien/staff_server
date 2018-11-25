import renderField from 'components/FormInputs/renderField';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const required = value => (value ? undefined : 'Bắt buộc')


class  ClothForm extends Component{

  

  render(){
    let {handleSubmit,allProduct,allServiceType,allUnit, history} = this.props;
    return (
    
      <div className="card">
        <div className="header">
          <h4>Thêm đơn giá</h4>
        </div>
        <div className="content">
          <form className="form-horizontal" onSubmit={handleSubmit} >
            <div className="form-group">
    
              <label className="control-label col-md-3">Quần áo</label>
              <div className="col-md-9">
              <Field
                  name="product"
                  type="select"
                 
                  validate={required}
                  options={allProduct}
                  placeholder="Chọn quần áo"
  
                  component={renderField} />
              </div>
            </div>
           
              
            <div className="form-group">
              <label className="control-label col-md-3">Loại dịch vụ</label>
              <div className="col-md-9 ">
                <Field
                  name="serviceType"
                  type="select"
                  
                  validate={required}
                  options={allServiceType}
                  placeholder="Chọn loại dịch vụ"
  
                  component={renderField} />
                   
              </div>       
            </div>
            <div className="form-group">
            <label className="control-label col-md-3">Đơn vị tính</label>
              <div className="col-md-9">
              <Field
                  name="unit"
                  type="select"
                  validate={required}
                  options={allUnit}
                  placeholder="Chọn đơn vị tính"
  
                  component={renderField} />
              </div>
            </div>
            <div className="form-group">
            <label className="control-label col-md-3">Giá</label>
              <div className="col-md-9">
              <Field
                  name="price"
                  type="number"
      
                  validate={required}
                
                  placeholder="Nhập giá"
  
                  component={renderField} />
              </div>
            </div>
            
            <div className="form-group">
                <label className="control-label col-md-3"></label>
                <div className="col-md-9">
                        <button type="submit" className="btn btn-fill btn-info" >Lưu lại</button>
                        &nbsp;
                        &nbsp;
                        <button className="btn btn-fill btn-danger" onClick={e=>history.goBack()}>
                        Hủy
                        </button>
                </div>
            </div>
          </form>
        </div>
      </div>
    )
  };
  }
ClothForm = reduxForm({
  form: 'ClothForm',
})(ClothForm)
  export default ClothForm;