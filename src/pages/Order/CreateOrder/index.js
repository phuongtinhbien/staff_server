import gql from "graphql-tag";
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { formValueSelector } from 'redux-form';
import Error from '../../Error';
import CreateOrderForm from './CreateOrderForm';
import NotificationSystem from 'react-notification-system';
import moment from 'moment';


const OPTION_LIST = gql `query optionList {
  allBranches(condition: {status: "ACTIVE"}) {
    nodes {
      id
      nodeId
      branchName
      address
    }
  }
  allTimeSchedules(condition: {status: "ACTIVE"}) {
    nodes {
      nodeId
      id
      timeScheduleNo
      timeStart
      timeEnd
    }
  }
  allColors(condition: {status: "ACTIVE"}) {
    nodes {
      id
      nodeId
      colorName
    }
  }
  allLabels(condition:{
    status:"ACTIVE"
  }){
    nodes{
      id
      nodeId
      labelName
    }
  }
  allMaterials(condition:{
    status:"ACTIVE"
  }){
    nodes{
      id
      nodeId
      materialName
    }
  }
  allProducts(condition:{
    status: "ACTIVE"
  }){
    nodes{
      id
      productName
    }
  }

  allUnits(condition:{
    status:"ACTIVE"
  }){
    nodes{
      id
      unitName
    }
  }
}
`;

const CREATE_ORDER = gql `mutation createCusOrder ($cus: CustomerInput!, $o: CustomerOrderInput,
  $d: [OrderDetailInput!]){
    createCusOrderAndDetail(input:{
      cus: $cus,
      o: $o,
      d: $d
    }){
      customerOrder{
        nodeId
        id
      }
    }
  }`;




const optionValue = (val,lab )=>{
      return {value: val,label: lab};
}


const processTime =  (data)=>{
  let res=[];
  let timeNow = moment();
  if (data!= null){
  for (let i = 0; i<data.length;i++){
    // if (timeNow>= data[i].timeStart && timeNow <= data[i].timeEnd)
    res.push(optionValue(data[i].id, `${data[i].timeScheduleNo} (${data[i].timeStart} - ${data[i].timeEnd})`));
  }
}
  return res;

}


const handleCreateOrder = ( createCusOrderAndDetail,values, errorCreate, success)=>{
  errorCreate= null;
  success = null;
  const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
  let CustomerInput ={
    fullName: values.fullName,
    email: values.email,
    phone: values.phoneNumber,
    createBy: CURRENT_USER.id,
    updateBy: CURRENT_USER.id
  }
  let CustomerOrderInput = {
    branchId: CURRENT_USER.branch.id,
    deliveryTimeId: values.deliveryTime.value,
    pickUpTimeId: values.pickUpTime.value,
    pickUpPlace: values.pickUpPlace,
    deliveryPlace: values.deliveryPlace,
    createBy: CURRENT_USER.id,
    updateBy: CURRENT_USER.id,
    pickUpDate: values.pickUpDate,
    deliveryDate: values.deliveryDate

  }

  let OrderDetailInputs =[];
  for (let i=0;i<values.customerOrderDetail.length;i++){
    let orderDetail = values.customerOrderDetail[i];
    let order = {
      serviceTypeId: orderDetail.serviceTypeId.value,
      productId: orderDetail.productId.value,
      unitId: orderDetail.unitId,
      amount: orderDetail.amount,
      labelId: orderDetail.labelId? orderDetail.labelId.value:null,
      materialId: orderDetail.materialId? orderDetail.materialId.value:null,
      colorId: orderDetail.colorId? orderDetail.colorId.value:null,
      note: orderDetail.note,
      createBy: CURRENT_USER.id,
      updateBy: CURRENT_USER.id
    }
    OrderDetailInputs.push(order);
  }

  console.log(OrderDetailInputs)
  createCusOrderAndDetail({variables:{cus:CustomerInput, o:CustomerOrderInput,d:OrderDetailInputs }});

  // alert(JSON.stringify({cus:CustomerInput, o:CustomerOrderInput,d:OrderDetailInputs }));

}

const handleOnCompleted = (data,history)=>{
  
  console.log(data);
  history.push("/order/order-list/view/"+data.createCusOrderAndDetail.customerOrder.nodeId);
}
const selector = formValueSelector('CreateOrder')



class CreateOrder extends Component {

  state= {
    approve: false,
    decline: false,
    errorCreate: null,
    success: null
  }
  showNotification(message, level) {
    this.notificationSystem.addNotification({
      message: message,
      level: level,
      autoDismiss: 1,
      position: "tc"
    });
  }

  render() {
    let {match,data,history} = this.props;
    let {errorCreate,success} = this.state;
  const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
    let timeSchedule;
    console.log(this.props);
    console.log(this.state)
    return (
      <div className="container-fluid">
      <div className="card">
        <div className="header"></div>
        <div className="content">
        <div className="text-right">
       {errorCreate &&  <label className="btn btn-wd btn-fill  btn-danger" >{errorCreate}</label>}
       {success &&  <label className="btn btn-wd btn-fill  btn-success" >{success}</label>}
        </div>
        <Query query={OPTION_LIST} >
                {({loading, error,data, refetch}) => {
                  if (loading) return null;
                  if (error){
                    return (<Error errorContent= {error.message}></Error>);
                   }
                  if (data!= null){
                    console.log(data);
                    timeSchedule =  data.allTimeSchedules.nodes;
                    return  (
                       <Mutation
                                mutation={CREATE_ORDER}
                                onCompleted={data=> {
                  
                                  this.showNotification("Tạo đơn hàng mới thành công", "success") 
                                  handleOnCompleted(data,history)
                                 }}
                                onError={error => this.showNotification(error.message, "error")}
                              >
                              {
                                (createCusOrderAndDetail) =>(
                                <div>
                                 <CreateOrderForm branch={CURRENT_USER.branch}
                                    
                                    timeSchedule={processTime(timeSchedule)} 
                                    onSubmit={values=>handleCreateOrder(createCusOrderAndDetail,values, errorCreate, success)}
                                    optionListDetail= {{material:data.allMaterials, color: data.allColors, label:data.allLabels, product:data.allProducts, unit:data.allUnits}}
                                    ></CreateOrderForm>
                                
                                  
                                </div>
                                )
                              }
                      
                      </Mutation>
                    );
                    
                  }
                }
                }
                </Query>

          <div className="row">
           <NotificationSystem
                ref={ref => this.notificationSystem = ref} />
           </div>
      </div>
    </div>
    </div>
    );
  }
}

CreateOrder = connect(
  state => ({
    firstValue: selector(state, 'fullName'),
    secondValue: selector(state, 'email'),
    secondValue: selector(state, 'phone'),
    pickUpDate: selector(state, 'pickUpDate'),
    deliveryDate: selector(state,'deliveryDate')

  })
)(CreateOrder)
export default withRouter(CreateOrder);
