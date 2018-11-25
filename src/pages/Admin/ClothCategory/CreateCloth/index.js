import gql from 'graphql-tag';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BranchForm from './branchForm';
import Error from '../../../Error';
import { Query, Mutation } from 'react-apollo';
import NotificationSystem from 'react-notification-system';
const SERVICE_QUERY = gql`query Cloth{
  allProducts{
    nodes{
      id
      nodeId
      productName
      status
      shortDesc
    }
  }
  allProductTypes{
    nodes{
      id
      nodeId
      productTypeName
      status
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
        res.push(optionValue(data[i].id, data[i].productTypeName));
      
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
                              allProductType = {processOption(data.allProductTypes.nodes)}></BranchForm>
                                
                                  
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