import gql from 'graphql-tag';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BranchForm from './branchForm';
import Error from '../../../Error';
import { Query, Mutation } from 'react-apollo';
import NotificationSystem from 'react-notification-system';
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
  
  let serviceType = getId(value.serviceType);
  let staffOne = getId(value.staffOne);
  let staffTwo = getId(value.staffTwo);
  let staffThree = getId(value.staffThree);
  let pro = getId(value.promotion);
  let status = value.status?"ACTIVE": "INACTIVE";
  let branch = {storeId: 1,
     branchName: value.branchName,
     status : status, 
     updateBy:currUser, 
     updateBy:currUser, 
     address: value.address,
     latidute: value.latitude,
     longtidute: value.longtitude};

  console.log({brId: value.id, branch:branch,pro: pro,serviceType:serviceType,staffOne:staffOne,staffTwo:staffTwo,staffThree:staffThree})
  mutation({variables:{brId: value.id, branch:branch,pro: pro,serviceType:serviceType,staffOne:staffOne,staffTwo:staffTwo,staffThree:staffThree}});

}

const handleOnCompleted = (data,history)=>{
      if (data){
        console.log("success");
      }
}

const CREATE_CLOTH = gql`mutation createCloth ($productName: String!, $productType: BigFloat!, 
  $productImage: Int, $currUser: BigFloat!){
  createProduct(input:{
    product:{
      productName: $productName,
      productAvatar: $productImage,
      productTypeId: $productType,
      status: "ACTIVE",
      createBy: $currUser,
      updateBy:$currUser
    }
  }){
    product{
      nodeId
      id
      productName
    }
  }
}`;




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
                  
                                  this.showNotification("Cập nhật chi nhánh thành công", "success") 
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