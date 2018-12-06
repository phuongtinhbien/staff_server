import gql from 'graphql-tag';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import StaffForm from './CreateStaffForm';
import Error from '../../../Error';
import { Query, Mutation } from 'react-apollo';
import NotificationSystem from 'react-notification-system';
import khongDau from 'khong-dau';
const SERVICE_QUERY = gql`query allService {
   
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

const handleSubmit = (value,mutation) =>{
  console.log(value);
  mutation({variables:{postName: khongDau(value.fullName).replace(" ","_"),
  link: value.staffAvatar,name:value.fullName,email: value.email,password: value.password}});

}

const handleOnCompleted = (data,history)=>{
      if (data){
        console.log("success");
      }
}

const handleUpdate = (data,mutation, info)=>{
    console.log(data);
    let staff = {
        staffTypeId: info.staffType.value,
        fullName: info.fullName,
        address: info.address,
        phone: info.phone,
        status: info.status,
        staffAvatar: data.createPost.post.id
    }
    mutation({variables:{id: data.registerUser.user.id, staff: staff}});
}

const UPDATE_STAFF = gql`mutation updateStaff ($id: BigFloat!,$staff: StaffPatch!){
    updateStaffById (input:{
      id: $id,
      staffPatch: $staff
    }){
      staff{
        nodeId
        id
        fullName
      }
    }
  }`;

const REGISTER_STAFF =gql `mutation registerStaff ($name: String!, $email: String!, $password: String!,$postName: String!, $link: String!){
  registerUser(input:{
    firstName: $name,
    lastName: "",
    email: $email,
    password: $password,
    userType: "staff_type"
  }){
    user{
      id
      firstName
      userType
      nodeId
    }
  }
createPost(input:{
  post:{
    headline: $postName,
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
}`







class CreateStaff extends Component {
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
        let info;
        let regis;
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
                                mutation={UPDATE_STAFF}
                                onCompleted={data=> {
                  
                                  this.showNotification("Thêm nhân viên mới thành công", "success") 
                                  handleOnCompleted(data,history)
                                 }}
                                onError={error => this.showNotification(error.message, "error")}
                              >
                              {
                                (updateStaff) =>(
                                <div>
                                 
                                <Mutation
                                mutation={REGISTER_STAFF}
                                onCompleted={data=> {
                                  if (data.registerUser.user)
                                  handleUpdate(data,updateStaff, info)
                                  else{
                                    this.showNotification("Tài khoản đã tồn tại", "warning")
                                  }
                                 
                                 }}
                                onError={error => this.showNotification(error.message, "error")}
                              >
                              {
                                (registerUser) =>(
                                <div>
                                   
                                <StaffForm onSubmit={value => handleSubmit(info = value,registerUser)} 
                                allStaffType= {processOption2(data.allStaffTypes.nodes)} ></StaffForm>
                                
                                  
                                 </div>
                                
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

export default withRouter(CreateStaff);