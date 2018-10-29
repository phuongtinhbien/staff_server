
import React, { Component } from 'react';
import moment from 'moment';
import { Field, reduxForm } from 'redux-form';
import { SingleDatePicker, DateRangePicker } from 'react-dates';
import { Link } from 'react-router-dom';
import Tags from 'components/Tags';
import renderField from 'components/FormInputs/renderField';




const resultDetail = (data) =>{
  return (
    <p>
      <span style={{fontSize:"12px"}}> - Material : {data.materialByMaterialId!= null?data.materialByMaterialId.materialName: "Undefine"} </span>
      <br></br>
      <span style={{fontSize:"12px"}}> - Label : {data.labelByLabelId!= null?data.labelByLabelId.labelName: "Undefine"} </span>
      <br></br>
      <span style={{fontSize:"12px"}}> - Color : {data.colorByColorId!= null?data.colorByColorId.colorName: "Undefine"} </span>
      <br></br>
      <span style={{fontSize:"12px"}}> - Note : {data.note!= null?data.note: "_"} </span>
    </p>
  );

}


const proccessData = (data)=>{
  let result = [];
  
  for (let i = 0;i<data.length;i++){
      let row =null;
      row = {
        sn: i+1,
        nodeId: data[i].nodeId,
        productName: data[i].productByProductId != null ? data[i].productByProductId .productName: "undefine",
        serviceName: data[i].serviceTypeByServiceTypeId != null ? data[i].serviceTypeByServiceTypeId.serviceTypeName:"_",
        amount:data[i].amount,
        unit: data[i].unitByUnitId != null ? data[i].unitByUnitId.unitName: "_",
        unitPrice:data[i].unitPriceByUnitPrice!= null?  data[i].unitPriceByUnitPrice.price :"_",
        details: resultDetail(data)
      }
      result.push(row);
  }
  return result;
};



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
    let {timeSchedule, branchList} = this.props;
    function approveFunction(customerOrder){
      alert(customerOrder.toString());
    };
    console.log(this.props)
      return(

          <form className="form-horizontal" >
          <fieldset>
              
              <legend>
              <div style={{justifyContent: "space-between"}}>
                <span>New Order </span>
                
              </div>
              </legend>
              
              <div className="row">
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4">Full name</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                  <Field
                    name="fullName"
                    type="text"
                    placeholder="Enter customer's name"
                    component={renderField}
                    />
                  </div>
                  <label className="control-label col-md-4">Phone number</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                  <Field
                    name="phoneNumer"
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
                  <label className="control-label col-md-4">Address</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                  <Field
                    name="address"
                    type="text"
                    placeholder="Enter customer's address"
                    component={renderField}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4 mt-4">Branch</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                  <Field
                    name="branch"
                    type="select"
                    options={branchList}
                    placeholder="Enter customer's address"
                    component={renderField}
                    />
                  </div>
                </div>
                <div className="col-sm-6 ">
                  <label className="control-label col-md-4 mt-4">Branch's Address</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                  <Field
                    name="branchAddress"
                    type="text"
                    disabled = "true"
                    placeholder="Branch Address"
                    component={renderField}
                    />
                  </div>
                </div>
              </div>
              <div className="row"><br></br></div>
              <div className="row">
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4">Pick up date </label>
                    <div className="col-md-8 mt-4">
                    <Field
                        name="pickUpdate"
                        type="text"
                        inputClassName="hidden"
                        value = {this.state.date}
                        component={renderField}
                        />
                    <SingleDatePicker
                        date={date}
                        id= "pickUpdate"
                        onDateChange={date => this.setState({date})}
                        focused={this.state.focused}
                        onFocusChange={({ focused }) => this.setState({ focused })}
                        />
                    </div>
                    <br></br><br></br>
                    <label className="control-label col-md-4 mt-6">Pick up time </label>
                    <div className="col-md-8 mt-6">
                        <Field
                        name="pickUpTime"
                        type="select"
                        options={timeSchedule}
                        component={renderField}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                  <label className="control-label col-md-4 mt-4">Delivery date </label>
                    <div className="col-md-8 mt-4">
                    <Field
                        name="deliveryDate"
                        type="text"
                        inputClassName="hidden"
                        value = {this.state.date1}
                        component={renderField}
                        />
                    <SingleDatePicker
                        date={date1}
                        id="deliveryDate"
                        displayFormat={""}
                        onDateChange={date1 => this.setState({date1})}
                        focused={this.state.focused1}
                        onFocusChange={({ focused}) => this.setState({ focused1:focused  })}
                        />
                    </div>
                    <br></br><br></br>
                  <label className="control-label col-md-4 mt-6">Delivery time </label>
                  <div className="col-md-8 mt-6">
                    <Field
                        name="deliveryTime"
                        type="select"
                        options={this.props.timeSchedule}
                        component={renderField}
                        />
                    
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >Pick up place </label>
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
                    <label className="control-label col-md-4 mt-4" >Delivery place </label>
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
                    <label className="control-label col-md-4 mt-4" > Pick up Staff</label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b></b></div>
                </div>
                <div className="col-sm-6">
                    <label className="control-label col-md-4 mt-4" >Delivery Staff </label>
                    <div className=" control-label col-md-8" style={{textAlign:"left"}}><b></b></div>
                </div>
              </div>
            
            </fieldset>
            <br></br><br></br>
            <fieldset>
              <legend>Add Clothes</legend>
              <div className="row">
                <div className="col-sm-6">
                
                </div>
                <div className="col-sm-6">
                
                </div>
              </div>
              
            </fieldset>
          
          </form>
      );
  }
}
export default reduxForm({
  form: 'CreateOrder'})(CreateOrder);
