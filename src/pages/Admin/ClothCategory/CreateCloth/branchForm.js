import renderField from 'components/FormInputs/renderField';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';



const required = value => (value ? undefined : 'Bắt buộc')


class  ClothForm extends Component{

  

  render(){
    let {handleSubmit,allProductType, history} = this.props;
    console.log(this.state)
    return (
    
      <div className="card">
        <div className="header">
          <h4>Thêm quần áo</h4>
        </div>
        <div className="content">
          <form className="form-horizontal" onSubmit={handleSubmit} >
            <div className="form-group">
    
              <label className="control-label col-md-3">Quần áo</label>
              <div className="col-md-9">
                <Field
                  name="productName"
                  type="text"
                  value=""
                  validate={required}
                  placeholder ="Tên quần áo"
                  component={renderField}
                 />
              </div>
            </div>
           
              
            <div className="form-group">
              <label className="control-label col-md-3">Nhóm quần áo</label>
              <div className="col-md-9 ">
                <Field
                  name="productType"
                  type="select"

                  validate={required}
                  options={allProductType}
                  placeholder="Chọn nhóm quần áo"
  
                  component={renderField} />
                   
              </div>       
            </div>
            <div className="form-group">
            <label className="control-label col-md-3">Hình ảnh</label>
              <div className="col-md-9">
                <Field
                  name="productAvatar"
                  type="file"
                  folder="product"
                
                  placeholder ="Thêm hình ảnh"
                  component={renderField}
                 />
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