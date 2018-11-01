
import React, { Component } from 'react';
import moment from 'moment';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { SingleDatePicker, DateRangePicker } from 'react-dates';
import { Link } from 'react-router-dom';
import Tags from 'components/Tags';
import { Query, Mutation } from 'react-apollo';
import gql  from "graphql-tag";
import renderField from 'components/FormInputs/renderField';
import Error from '../../Error';
import ItemCloth from './ItemCloth';



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
    console.log(this.props)
      return(

          <form className="form-horizontal" onSubmit={handleSubmit} >
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
                  <label className="control-label col-md-4 mt-4">Branch's Address</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                    <span>{branch.address}</span>
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
              <div className="row">
              <div className="col-sm-12 text-center">
              <br/>
              <button
              type="submit"
                className={"btn btn-fill btn-info"}
                disabled={submitting}
                >
                Place an order
            </button>
              </div>
              </div>
            
            </fieldset>
            <br></br><br></br>
            <fieldset>
              <legend>Add Clothes</legend>
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
  initialValues:(props)=>({
    branchId: props.branch.id
  })
})(CreateOrder);
