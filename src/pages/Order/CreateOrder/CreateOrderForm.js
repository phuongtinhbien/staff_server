
import renderField from 'components/FormInputs/renderField';
import gql from "graphql-tag";
import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Field, FieldArray, reduxForm } from 'redux-form';
import Error from '../../Error';
import ItemCloth from './ItemCloth';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.fullName) {
    errors.fullName = 'Full name is required';
  } else if (values.fullName.length < 6) {
    errors.fullName = 'Must be 6 characters or more';
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone number is required';
  } else if (values.phoneNumber.length < 10) {
    errors.phoneNumber = 'Must be 10 characters or more';
  }
  // if (!values.address) {
  //   errors.address = 'Address is required';
  // }

  if (!values.pickUpDate){
    errors.pickUpDate = 'Pick up date is required';
  }
  if (!values.deliveryDate){
    errors.deliveryDate = 'Delivery date is required';
  }
  else if ( !(values.pickUpDate && (values.deliveryDate>= values.pickUpDate ))){
     errors.deliveryDate = " Choose delivery date again!!!"
  }
  
  if (!values.pickUpTime){
    errors.pickUpTime = 'Pick up time is required';
  }
  if (!values.deliveryTime){
    errors.deliveryTime = 'Delivery time is required';
  }
  else if (values.pickUpDate && values.deliveryDate && values.pickUpDate == values.deliveryDate && !(values.pickUpTime && (values.deliveryTime.value > values.pickUpTime.value ))){
    errors.deliveryTime = " Choose delivery time again!!!"
  }


  if (!values.pickUpPlace) {
    errors.pickUpPlace = 'Pick up place is required';
  } else if (values.pickUpPlace.length < 30) {
    errors.pickUpPlace = 'Must be 30 characters or more';
  }
  if (!values.deliveryPlace) {
    errors.deliveryPlace = 'Delivery place is required';
  } else if (values.deliveryPlace.length < 30) {
    errors.deliveryPlace = 'Must be 30 characters or more';
  }

  if (!values.customerOrderDetail || !values.customerOrderDetail.length) {
    errors.customerOrderDetail = { _error: 'At least one item must be entered'}
  }
  else {
    const customerOrderDetailArrayErrors = []
    values.customerOrderDetail.forEach((item, itemIndex) => {
      const itemErrors = {}
      if (!item || !item.serviceTypeId) {
        itemErrors.serviceTypeId = 'Required'
        customerOrderDetailArrayErrors[itemIndex] = itemErrors
      }
      if (!item || !item.productId) {
        itemErrors.productId = 'Required'
        customerOrderDetailArrayErrors[itemIndex] = itemErrors
      }
      if (!item || !item.productId) {
        itemErrors.productId = 'Required'
        customerOrderDetailArrayErrors[itemIndex] = itemErrors
      }
      if (!item || !item.unitId) {
        itemErrors.unitId = 'Required'
        customerOrderDetailArrayErrors[itemIndex] = itemErrors
      }
      if (!item || !item.amount) {
        itemErrors.amount = 'Required'
        customerOrderDetailArrayErrors[itemIndex] = itemErrors
      }
      else if (item.amount && _.isNaN(item.amount)) {
        itemErrors.amount = 'Please enter a number';
        customerOrderDetailArrayErrors[itemIndex] = itemErrors
      }

    })
    if (customerOrderDetailArrayErrors.length) {
      errors.customerOrderDetail = customerOrderDetailArrayErrors
    }
  }

  return errors;
};




const SERVICE_TYPE_QUERY = gql`query getServiceType ($branch: BigFloat!){
  allServiceTypeBranches(condition:{
    branchId: $branch
  }){
    nodes{
      id
      serviceTypeByServiceTypeId{
        id
        serviceTypeName
      }
    }
  }
}`;





const optionValue = (val,lab )=>{
  return {value: val,label: lab};
}

const processOption =  (data, type)=>{
let res=[];
if (data!= null){
  for (let i = 0; i<data.length;i++){
      if (type ==="material"){
        res.push(optionValue(data[i].id, data[i].materialName));
      }
      else if(type === "label"){
        res.push(optionValue(data[i].id, data[i].labelName));
      }
      else if(type === "color"){
        res.push(optionValue(data[i].id, data[i].colorName));
      }
      else if(type === "product"){
        res.push(optionValue(data[i].id, data[i].productName));
      }
      else if(type === "service"){
        res.push(optionValue(data[i].serviceTypeByServiceTypeId.id, data[i].serviceTypeByServiceTypeId.serviceTypeName));
      }
      else if (type === "unit"){
        res.push(optionValue(data[i].id, data[i].unitName));
      }
      
  }
}
return res;

}





class CreateOrder extends Component {
  state = {
    date: moment(),
    date1: moment(),
    startDate: moment(),
    endDate: moment(),
    dateRangeFocusedInput: null,
    viewMode: false,
    focused1: null
  
  };
  render () {
    let { date, date1 } = this.state;
    let {timeSchedule, branch, optionListDetail,  submitting,
      handleSubmit,} = this.props;
    function approveFunction(customerOrder){
      alert(customerOrder.toString());
    };

      return(

          <form className="form-horizontal" onSubmit={handleSubmit} >
          <fieldset>
              
              <legend>
              <div style={{justifyContent: "space-between"}}>
                <span>Đơn hàng mới </span>
                
              </div>
              </legend>
              
              <div className="row">
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4">Họ tên</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                  <Field
                    name="fullName"
                    type="text"
                    placeholder="Enter customer's name"
                    component={renderField}
                    />
                  </div>
                  <label className="control-label col-md-4">Số điện thoại</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                  <Field
                    name="phoneNumber"
                    type="text"
                    placeholder="Enter customer's phone"
                    component={renderField}
                    />
                  </div>
                </div>
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4">Email</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                  <Field
                    name="email"
                    type="text"
                    placeholder="Enter customer's email"
                    component={renderField}
                    />
                  </div>
                  <label className="control-label col-md-4"></label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                  {/* <Field
                    name="address"
                    type="text"
                    placeholder="Enter customer's address"
                    component={renderField}
                    /> */}
                    {/* <button
                      type="button"
                        className={"btn btn-fill btn-sm btn-info"}
                        disabled={submitting}
                        >
                        Search
                    </button> */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4 mt-4">Chi nhánh</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                  <Field
                    name="branchId"
                    type="text"
                    disabled = "true"
                    inputClassName=" hidden"
                    value={branch.id}
                    placeholder="Enter customer's address"
                    component={renderField}
                    />
                    <span>{branch.branchName}</span>
                  </div>
                </div>
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4 mt-4">Địa chỉ CN</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                    <span>{branch.address}</span>
                  </div>
                </div>
              </div>
              <div className="row"><br></br></div>
              <div className="row">
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4">Ngày lấy đồ</label>
                    <div className="col-md-8 mt-4">
                    <Field
                        name="pickUpDate"
                        type="date"
                        date={date}
                
                        component={renderField}
                        />
                    </div>
                    <br></br><br></br>
                    <label className="control-label col-md-4 mt-6">Thời gian lấy đồ </label>
                    <div className="col-md-8 mt-6">
                        <Field
                        name="pickUpTime"
                        type="select"
                        placeholder="Chọn khung giờ"
                        options={timeSchedule}
                        component={renderField}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                  <label className="control-label col-md-4 mt-4">Ngày trả đồ </label>
                    <div className="col-md-8 mt-4">
                    <Field
                        name="deliveryDate"
                        type="date"
                        date={date}
                        component={renderField}
                        />

                    </div>
                    <br></br><br></br>
                  <label className="control-label col-md-4 mt-6">Thời gian trả đồ</label>
                  <div className="col-md-8 mt-6">
                    <Field
                        name="deliveryTime"
                        type="select"
                        placeholder="Chọn khung giờ"
                        options={this.props.timeSchedule}
                        component={renderField}
                        />
                    
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >Nơi lấy đồ</label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                    <Field
                    name="pickUpPlace"
                    type="text"
                    
                    placeholder="Enter address pick up"
                    component={renderField}
                    />
                    </div>
                </div>
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >Nơi trả đồ</label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                    <Field
                    name="deliveryPlace"
                    type="text"
                    placeholder="Enter address delivery"
                    component={renderField}
                    />
                    </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" > NV lấy đồ</label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b></b></div>
                </div>
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >NV trả đồ</label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b></b></div>
                </div>
              </div>
              <div className="row">
              <div className="col-sm-12 text-center">
              <br/>
              <button
              type="submit"
                className={"btn btn-fill btn-info"}
                disabled={submitting}
                >
                Tạo đơn hàng
            </button>
              </div>
              </div>
            
            </fieldset>
            <br></br><br></br>
            <fieldset>
              <legend>Quần áo</legend>
              <Query query={SERVICE_TYPE_QUERY}
              variables={{branch:branch.id}}>
                {({loading, error,data, refetch}) => {
                  if (loading) return null;
                  if (error){
                    return (<Error errorContent= {error.message}></Error>);
                  }
                  
                  if (data){
                    return(
                      <FieldArray name="customerOrderDetail"
                      material={processOption(optionListDetail.material.nodes,"material")}
                    color={processOption(optionListDetail.color.nodes, "color")}
                    label={processOption(optionListDetail.label.nodes, "label")}
                    product={processOption(optionListDetail.product.nodes,"product")}
                    service={processOption(data.allServiceTypeBranches.nodes,"service")}
                    unit={processOption(optionListDetail.unit.nodes,"unit")}
                        component={ItemCloth}></FieldArray>
                     
                    );
                    
                  }
                }}
                </Query>
              
            </fieldset>
          
          </form>
      );
  }
}

export default reduxForm({
  form: 'CreateOrder',
  validate,
    
})(CreateOrder);
