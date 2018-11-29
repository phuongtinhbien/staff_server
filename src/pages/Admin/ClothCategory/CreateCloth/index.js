import gql from 'graphql-tag';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BranchForm from './branchForm';
import Error from '../../../Error';
import { Query, Mutation } from 'react-apollo';
import NotificationSystem from 'react-notification-system';
import khongDau from 'khong-dau';
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
  
  mutation({variables:{name: khongDau(value.productName).replace(" ","_"),
  link: value.productAvatar
}})

}

const handleOnCompleted = (val, createCloth, data,history,currUser)=>{
      if (data){
        createCloth({variables:{
          productName: val.productName,
          productType: val.productType.value,
          productImage: data.createPost.post.id,
          currUser: currUser
        }})
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

const CREATE_POST = gql `
mutation createPost ($name: String!, $link: String!){
  createPost(input:{
    post:{
      headline: $name,
      body: "product",
      headerImageFile: $link
    }
  }){
    post{
      id
      nodeId
      headerImageFile
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
        let val;
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
                  
                                  if (data)
                                  this.showNotification("Thêm quần áo thành công", "success") 
                              
                                 }}
                                onError={error => this.showNotification(error.message, "error")}
                              >
                              {
                                (createCloth) =>(
                                <div>
                                   <Mutation
                                mutation={CREATE_POST}
                                onCompleted={data=> {
                  
                                  if (data)
                                  handleOnCompleted(val,createCloth,data,history, CURRENT_USER.currentUser.id)
                                 }}
                                onError={error => this.showNotification(error.message, "error")}
                              >
                              {
                                (createPost) =>(
                              <BranchForm history={history} allProduct= {data.allProducts} onSubmit={value => handleSubmit(val = value,createPost, CURRENT_USER.currentUser.id)} 
                              allProductType = {processOption(data.allProductTypes.nodes)}></BranchForm>
                                
                                    )
                                  }
                          
                          </Mutation>
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