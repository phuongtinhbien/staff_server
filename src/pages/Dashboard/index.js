import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import Notification from './Notification';
import Tasks from './Tasks';
import KhongDau from 'khong-dau';


const SEARCH_ORDER = gql `mutation searchCustomerOrder($customerName: String, $customerOrder: BigFloat, $branch: BigFloat!) {
  searchcustomerorders(input: {customerName: $customerName, customerOrder: $customerOrder, branch: $branch}) {
    customerOrders {
      nodeId
      id
      status
      customerByCustomerId {
        nodeId
        id
        fullName
        email
        phone
      }
    }
  }
}
`;

let result;


const handleSubmit =(searchcustomerorders, values, branch) =>{
  console.log(KhongDau(values.customerName))
  searchcustomerorders({variables:{customerName: values.customerName, customerOrder: values.orderCode, branch}})
}

const handleOnCompleted = (data)=>{
  
  console.log(data);
  result = data.searchcustomerorders.customerOrders;
  console.log(result);

}


const Dashboard = ({CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"))}) => (
  <div className="content">
    <div className="container-fluid">
      
      <Mutation
              mutation={SEARCH_ORDER}
              onCompleted={data=> {handleOnCompleted(data );}}
              
            >
            {
              (searchcustomerorders,{data,error}) =>(
                <div className="row">
                <div className="col-md-6">
                {/* <label className="error"> {this.state.errorContent}</label> */}
                <Notification  onSubmit={values => {handleSubmit(searchcustomerorders, values, CURRENT_USER.branch.id)}} />
                </div>
                <div className="col-md-6">
                {data ?
                <Tasks resultSearch={data.searchcustomerorders.customerOrders}   />
              :
                <Tasks   />
             }
              </div>
             
              </div>
              )
            }
          
          </Mutation>
    </div>
  </div>
);

export default Dashboard;