import gql from 'graphql-tag';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BranchForm from './branchForm';
import Error from '../../Error';
import { Query, Mutation } from 'react-apollo';
import NotificationSystem from 'react-notification-system';
const SERVICE_QUERY = gql`query allService {
    allServiceTypes(condition:{status: "ACTIVE"}){
      nodes{
        nodeId
        serviceTypeName
        id
      }
    }
    allStaff(condition:{status: true}){
    nodes{
      nodeId
      id
      fullName
      email
      staffTypeByStaffTypeId{
        staffCode
        id
        nodeId
        staffTypeName
      }
    }
  }
  allStaffTypes(condition:{status:"ACTIVE"}){
    nodes{
      nodeId
      id
      staffCode
      staffTypeName
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
        res.push(optionValue(data[i].id, data[i].serviceTypeName));
      
    }
  }
  return res;
  
}

const processOption1 =  (data, type)=>{
  let res=[];
  if (data!= null){
    for (let i = 0; i<data.length;i++){
        res.push({value: data[i].id, label: data[i].fullName + "("+data[i].email+")", type: data[i].staffTypeByStaffTypeId && data[i].staffTypeByStaffTypeId.staffCode});
      
    }
  }
  return res;
  
}

const processOption2 =  (data, type)=>{
  let res=[];
  if (data!= null){
    for (let i = 0; i<data.length;i++){
        res.push({value: data[i].id, label: data[i].staffTypeName});
      
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
  let status = value.status?"ACTIVE": "INACTIVE";
  let branch = {storeId: 1,branchName: value.branchName,
     status : status, createBy:currUser, 
     updateBy:currUser, address: value.address,
     latidute: value.latitude,
     longtidute: value.longtitude};

  mutation({variables:{branch:branch,serviceType:serviceType,staffOne:staffOne,staffTwo:staffTwo,staffThree:staffThree}});

}

const handleOnCompleted = (data,history)=>{
      if (data){
        console.log("success");
      }
}

const CREATE_BRANCH = gql`mutation createNewBranch ($branch: BranchInput!, 
  $serviceType: [BigFloat!], $staffOne: [BigFloat!], 
  $staffTwo: [BigFloat], $staffThree: [BigFloat]){
    createNewBranch (input:{
      b: $branch,
      serviceType: $serviceType,
      staffOne:$staffOne,
      staffTwo:$staffTwo,
      staffThree: $staffThree
    }){
      branch{
        id
        nodeId
        branchName
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
              <Query query={SERVICE_QUERY} >
                {({loading, error,data, refetch}) => {
                  if (loading) return null;
                  if (error){
                    return (<Error errorContent= {error.message}></Error>);
                   }
                  if (data!= null){
                    console.log(data);
                    return  (
                       <Mutation
                                mutation={CREATE_BRANCH}
                                onCompleted={data=> {
                  
                                  this.showNotification("Tạo chi nhánh mới thành công", "success") 
                                  handleOnCompleted(data,history)
                                 }}
                                onError={error => this.showNotification(error.message, "error")}
                              >
                              {
                                (createNewBranch) =>(
                                <div>
                    <BranchForm onSubmit={value => handleSubmit(value,createNewBranch, CURRENT_USER.currentUser.id)} allStaffType= {processOption2(data.allStaffTypes.nodes)} allStaff = {processOption1(data.allStaff.nodes)} allService = {processOption(data.allServiceTypes.nodes)}></BranchForm>
                                
                                  
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