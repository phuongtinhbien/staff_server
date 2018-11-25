import renderField from 'components/FormInputs/renderField';
import gql, { resetCaches } from "graphql-tag";
import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm,formValueSelector, initialize } from 'redux-form';
import Error from '../../Error';
import ItemCloth from './ItemCloth';
import NotificationSystem from 'react-notification-system';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Bắt buộc';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email chưa đúng'
  }
  if (!values.fullName) {
    errors.fullName = 'Bắt buộc';
  } else if (values.fullName.length < 6) {
    errors.fullName = 'Ít nhất 6 kí tự';
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Bắt buộc';
  } else if (values.phoneNumber.length < 10) {
    errors.phoneNumber = 'Chưa đúng định dạng';
  }
  // if (!values.address) {
  //   errors.address = 'Address is required';
  // }

  if (!values.pickUpDate){
    errors.pickUpDate = 'Bắt buộc';
  }
  if (!values.deliveryDate){
    errors.deliveryDate = 'Bắt buộc';
  }
  else if ( !(values.pickUpDate && (values.deliveryDate>= values.pickUpDate ))){
     errors.deliveryDate = "Chọn lại thời gian"
  }
  
  if (!values.pickUpTime){
    errors.pickUpTime = 'Bắt buộc';
  }
  if (!values.deliveryTime){
    errors.deliveryTime = 'Bắt buộc';
  }
  else if (values.pickUpDate && values.deliveryDate && values.pickUpDate == values.deliveryDate && !(values.pickUpTime && (values.deliveryTime.value > values.pickUpTime.value ))){
    errors.deliveryTime = " Chọn lại thời gian"
  }


  if (!values.pickUpPlace) {
    errors.pickUpPlace = 'Bắt buộc';
  } else if (values.pickUpPlace.length < 30) {
    errors.pickUpPlace = 'Ít nhất 30 kí tự';
  }
  if (!values.deliveryPlace) {
    errors.deliveryPlace = 'Ít nhất 30 kí tự';
  } else if (values.deliveryPlace.length < 30) {
    errors.deliveryPlace = 'Ít nhất 30 kí tự';
  }

  if (!values.customerOrderDetail || !values.customerOrderDetail.length) {
    errors.customerOrderDetail = { _error: 'Thêm ít nhất một quần áo'}
  }
  else {
    const customerOrderDetailArrayErrors = []
    values.customerOrderDetail.forEach((item, itemIndex) => {
      const itemErrors = {}
      if (!item || !item.serviceTypeId) {
        itemErrors.serviceTypeId = 'Bắt buộc'
        customerOrderDetailArrayErrors[itemIndex] = itemErrors
      }
      if (!item || !item.productId) {
        itemErrors.productId = 'Bắt buộc'
        customerOrderDetailArrayErrors[itemIndex] = itemErrors
      }
      if (!item || !item.productId) {
        itemErrors.productId = 'Bắt buộc'
        customerOrderDetailArrayErrors[itemIndex] = itemErrors
      }
      if (!item || !item.unitId) {
        itemErrors.unitId = 'Bắt buộc'
        customerOrderDetailArrayErrors[itemIndex] = itemErrors
      }
      if (!item || !item.amount) {
        itemErrors.amount = 'Bắt buộc'
        customerOrderDetailArrayErrors[itemIndex] = itemErrors
      }
      else if (item.amount && _.isNaN(item.amount)) {
        itemErrors.amount = 'Nhập một số';
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
    branchId: $branch,
    status: "ACTIVE"
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

const CUS_INFO = gql`query getCustomerInfo ($email: String!){
  allCustomers(condition: {
    email: $email
  }){
    nodes{
      id
      fullName
      phone
    }
  }
}
`;

const TIME_DELIVERY = gql`query getMinTimeforHanlde ($brId: BigFloat!){
  getMinTimeForHandle(brId:$brId)
}
`;

const func_delivery = (pickUpDate, pickUpTime, aware_time, timeSchedule)=>{
  let deliveryDate;
  let deliveryTime;

  return [deliveryDate,deliveryTime]
}


class CreateOrder extends Component {
  state = {
    date: moment(),
    date1: moment(),
    startDate: moment(),
    endDate: moment(),
    dateRangeFocusedInput: null,
    viewMode: false,
    focused1: null,
    timeforDelivery: null
  
  };

  componentWillReceiveProps(){
    
  }

  showNotification(message, level) {
    this.notificationSystem.addNotification({
      message: message,
      level: level,
      autoDismiss: 1,
      position: "tc"
    });
  }
  render () {
    let { date, date1 } = this.state;
    let {timeSchedule, branch, optionListDetail,  submitting,
      hasEmailValue, haspickUpDate,
      handleSubmit,} = this.props;
  
      console.log(this.props)
      return(

          <form className="form-horizontal" onSubmit={handleSubmit} >
          <fieldset>
              
              <legend>
              <div style={{justifyContent: "space-between"}}>
                <span>Đơn hàng mới </span>
                
              </div>
              </legend>
              
              <div className="row">
              
              <Query query={CUS_INFO} 
              variables={{email: hasEmailValue?hasEmailValue: ''}}
              fetchPolicy={"network-only"}
              onError={error => this.showNotification(error.message, "error")}
              onCompleted={data => { if (data.allCustomers.nodes[0] != null){
                this.props.dispatch(initialize('CreateOrder',{
                  fullName: data.allCustomers.nodes[0].fullName,
                  phoneNumber: data.allCustomers.nodes[0].phone
                },{keepValues: true}));
                
              }}}
              fetchPolicy={"network-only"}>
              {
                ({loading,data,error, refetch})=>{
                  if (loading) return null;
                  if (error){
                    return (<Error errorContent= {error.message}></Error>);
                  }
                return (
                  <div></div>
            )
              }
            }
              </Query>
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4">Họ tên</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                    <Field
                      name="fullName"
                      type="text"
                      placeholder="Họ tên khách hàng"
                      component={renderField}
                      />
                  </div>
                  <label className="control-label col-md-4">Số điện thoại</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                  <Field
                    name="phoneNumber"
                    type="text"
                    placeholder="Số điện thoại"
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
                    placeholder="Email"
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
                    placeholder="Địa chỉ"
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
                        selectedValue={this.props.timeSchedule[1]}
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
                    
                    placeholder="Nơi lấy đồ"
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
                    placeholder="Nơi trả đồ"
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
            <NotificationSystem
                ref={ref => this.notificationSystem = ref} />
          </form>
      );
  }
}

CreateOrder = reduxForm({
  form: 'CreateOrder',
  validate,

})(CreateOrder)

const selector = formValueSelector('CreateOrder') // <-- same as form name
CreateOrder = connect(
  state => {
    // can select values individually
    const hasEmailValue = selector(state, 'email')
    const hasPickUpDate = selector(state, 'pickUpDate')
    const hasPickUpTime = selector(state, 'pickUpTime')
    // or together as a group
    // const { firstName, lastName } = selector(state, 'firstName', 'lastName')
    return {
      hasEmailValue,
      hasPickUpDate,
      hasPickUpTime

    }
  }
)(CreateOrder)
export default (CreateOrder);
