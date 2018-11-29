import gql from 'graphql-tag';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BranchForm from './branchForm';
import Error from '../../../Error';
import { Query, Mutation } from 'react-apollo';
import NotificationSystem from 'react-notification-system';
import moment from 'moment';
const SERVICE_QUERY = gql`query option{
  allProducts(condition: {status: "ACTIVE"}){
    nodes{
      id
      nodeId
      productName
      status
      shortDesc
    }
  }
  allUnits(condition: {status: "ACTIVE"}){
    nodes{
      id
      nodeId
      unitName
    }
  }
  allServiceTypes(condition: {status: "ACTIVE"}){
    nodes{
      id
      nodeId
      serviceTypeName
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
        res.push(optionValue(data[i].id, data[i].productName));
      
    }
  }
  return res;
  
}
const processOption1 =  (data, type)=>{
  let res=[];
  if (data!= null){
    for (let i = 0; i<data.length;i++){
        res.push(optionValue(data[i].id, data[i].unitName));
      
    }
  }
  return res;
  
}
const processOption2 =  (data, type)=>{
  let res=[];
  if (data!= null){
    for (let i = 0; i<data.length;i++){
        res.push(optionValue(data[i].id, data[i].serviceTypeName));
      
    }
  }
  return res;
  
}




const getId = (arr)=>{

  let a = []
  if (arr)
  arr.forEach(element => {
    a.push(element.value);
  });
  return a;
}

const handleSubmit = (value, mutation, currUser) =>{
  console.log(value);
  let UnitPriceInputArr=[];
  let status =  value.status?"ACTIVE":"INACTIVE";
  value.serviceCloth.forEach(element => {
    let UnitPriceInput = {
      productId: element.product && element.product.value,
      unitId: element.unit.value,
      price: element.price,
      applyDate: moment(),
      createBy: currUser,
      updateBy: currUser,
      status: status
    }
    UnitPriceInputArr.push(UnitPriceInput);
  });
  UnitPriceInputArr.push({
      unitId: value.unitKg.value,
      price: value.priceKg,
      applyDate: moment(),
      createBy: currUser,
      updateBy: currUser,
      status: status
  })
  let ServiceTypeInput={
    serviceTypeName: value.serviceTypeName,
    serviceTypeDesc: value.serviceTypeDesc,
    createBy: currUser,
    updateBy: currUser,
    status: status
  }
 

  mutation({variables:{s: ServiceTypeInput, u: UnitPriceInputArr}});

}

const handleOnCompleted = (data,history)=>{
      if (data){
        console.log("success");
      }
}

const CREATE_CLOTH = gql`mutation createServiceType ($s:ServiceTypeInput!, $u: [UnitPriceInput!]) {
  createServiceTypeAndUnitPrice(input:{
    s:$s,
    u:$u
  }){
    serviceType{
      id
      nodeId
      serviceTypeName
    }
  }
}
`;






class EditBranch extends Component {
    state = {
        data: this.props,
        show: true,
        deleteItem: false,
        error: false
      };
      showNotification(message, level) {
        this.notificationSystem.addNotification({
          message: message,
          level: level,
          autoDismiss: 1,
          position: "tc"
        });
      }

     
      
      render(){
        let {match,data,history} = this.props;
        const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
          return(
           
            <div className="container-fluid">
              <Query query={SERVICE_QUERY}
              fetchPolicy={"network-only"}
              variables = {{nodeId:match.params.nodeId }}>
                {({loading, error,data, refetch}) => {
                  if (loading) return null;
                  if (error){
                    return (<Error errorContent= {error.message}></Error>);
                   }
                  if (data!= null){
                    console.log(data);
                    return  (
                       <Mutation
                                mutation={CREATE_CLOTH}
                                onCompleted={data=> {
                  
                                  this.showNotification("Thêm dịch vụ thành công", "success") 
                                  handleOnCompleted(data,history)
                                 }}
                                onError={error => this.showNotification(error.message, "error")}
                              >
                              {
                                (createNewBranch) =>(
                                <div>
                    <BranchForm history={history} allProduct= {data.allProducts} onSubmit={value => handleSubmit(value,createNewBranch, CURRENT_USER.currentUser.id)} 
                              allProduct = {processOption(data.allProducts.nodes)}
                              allUnit = {processOption1(data.allUnits.nodes)}
                              allServiceType = {processOption2(data.allServiceTypes.nodes)}
                              ></BranchForm>
                                
                                  
                                 </div>
                                )
                              }
                      
                      </Mutation>
                    );
                    
                  }
                }
                }
                </Query>

              <NotificationSystem
                  ref={ref => this.notificationSystem = ref} />
            </div>
      
          );
      }
}

export default withRouter(EditBranch);