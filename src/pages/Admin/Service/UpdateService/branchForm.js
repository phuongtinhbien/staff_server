import renderField from 'components/FormInputs/renderField';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemCloth from './ItemCloth';
import { Field, reduxForm,formValueSelector,FieldArray, initialize } from 'redux-form';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const required = value => (value ? undefined : 'Bắt buộc')

const getPriceForKg = (data)=>{
  return data.filter(value => value.productByProductId == null)
}
const processDataDetail = (data)=>{
  let result= [];

  data.forEach(element => {
    if (element.productByProductId)
      result.push({
        product:{
            label: element.productByProductId.productName,
            value: element.productByProductId.id
        },
        price: element.price,
        unit: {
          label: element.unitByUnitId.unitName,
          value: element.unitByUnitId.id
        }
      })
  });
    return result;
}


class  ServiceForm extends Component{

  formatAmount = (input) => {
    if (!input) return;

    // Remove all existing commas before converting
    // This is not required if the normalize method is implemented and already removing commas
    const cleanedInput = input.replace(/,/g , ''); 

    // Convert to currency format
    const convertedInput = new Intl.NumberFormat().format(cleanedInput);

    return convertedInput;
}

normalizeAmount = (val) => {
  return val.replace(/,/g , '');
}
componentDidMount(){
  let {serviceType,allUnitPrice,allUnit} = this.props;
  this.props.dispatch(initialize("ServiceForm", {
    id: serviceType.id,
      serviceTypeName: serviceType.serviceTypeName,
      serviceTypeDesc: serviceType.serviceTypeDesc,
      serviceCloth: processDataDetail(allUnitPrice),
      priceKg:  allUnitPrice.filter(value => value.productByProductId == null)[0] && allUnitPrice.filter(value => value.productByProductId == null)[0].price,
      unitKg: allUnit.filter(value => value.label.toLowerCase() === "kg")[0],
      status: serviceType.status === "ACTIVE"? true:false

  }, {keepValues: true}))
}

  render(){
    let {handleSubmit,allProduct,serviceType,allUnit, history,hasUnit} = this.props;
    console.log(hasUnit)
    return (
    
      <div className="card">
        <div className="header">
          <h4>Cập nhật dịch vụ</h4>
        </div>
        <div className="content">
          <form className="form-horizontal" onSubmit={handleSubmit} >
          <div className="form-group">
            <label className="control-label col-md-3">Tên dịch vụ</label>
              <div className="col-md-9">
              <Field
                  name="serviceTypeName"
                  type="text"
      
                  validate={required}
              
                  placeholder="Nhập tên dịch vụ"
  
                  component={renderField} />
              </div>
            </div>
           
           
            <div className="form-group">
            <label className="control-label col-md-3">Chi tiết dịch vụ</label>
              <div className="col-md-9">
              <Field
                  name="serviceTypeDesc"
                  type="textarea"
      
                  validate={required}
                  className="form-control"
                  placeholder="Nhập nội dung chi tiết"
  
                  component="textarea" />
              </div>
            </div>
            <div className="form-group">
            <label className="control-label col-md-3">Đơn giá theo Kg</label>
              <div className="col-md-9">
              <Field
                  name="priceKg"
                  type="number"
      
                 
                  className="form-control"
                  placeholder="Nhập đơn giá"
  
                  component={renderField} />
              </div>
            </div>
            <div>
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
            <FieldArray validate={required} name="serviceCloth" unit = {allUnit} product= {allProduct} component={ItemCloth}></FieldArray>
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
ServiceForm = reduxForm({
  form: 'ServiceForm',
})(ServiceForm)

const selector = formValueSelector('ServiceForm') // <-- same as form name
// ServiceForm = connect(
//   state => {
//      const hasUnit = selector(state, 'unit')
//       return {
//        hasUnit

//      }
//   }
// )(ServiceForm)
  export default ServiceForm;