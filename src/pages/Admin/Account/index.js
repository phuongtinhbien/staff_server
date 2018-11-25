import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { Tab, Tabs } from 'react-bootstrap';
import Staff from './staff';
import Customer from './customer';
const ACCOUNT = gql `query allAccount{
  allStaff{
    nodes{
      nodeId
      id
      fullName
      status
      email
      branchByBranchId{
        branchName
        id 
        nodeId
      }
      staffTypeByStaffTypeId{
        staffTypeName
        id
        nodeId
        staffCode
      }
    }
  }
  
  allCustomers{
    nodes{
      nodeId
      id
      status
      fullName
      phone
      email
      address
    }
  }
}`;
const Other = () => (
    <div className="card">
    <div className="header">
                <h4>Danh sách tài khoản hệ thống</h4>
                <p>Tài khoản người dùng chỉ thể xem không thể truy xuất</p>
              </div>
  <div className="content">
    <div className="container-fluid">
    <Query
      query={ACCOUNT}
      fetchPolicy={"network-only"}
 
    >{({ loading, error, data, refetch, }) => {
      if (loading) return null;
      if (refetch) {
        console.log(refetch);
      }
      if (error){
      }
      if (data != null){
      return (
      
        <Tabs defaultActiveKey={1} id="plan-text-tabs">
        <Tab eventKey={1} title="Nhân viên"><Staff data={data.allStaff.nodes}/></Tab>
        <Tab eventKey={2} title="Khách hàng"> <Customer data={data.allCustomers.nodes}></Customer></Tab>
      
    </Tabs>

        
      );
      }
    }}
    </Query>
    
    </div>
  </div>
  </div>
);

export default Other;