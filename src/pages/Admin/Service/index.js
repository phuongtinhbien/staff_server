import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import TableDetail from './TableDetail';
const ALL_BRANCH = gql`query allBranch {
  allServiceTypes{
    nodes{
      nodeId
      id
      serviceTypeDesc
      serviceTypeName
      serviceTypeAvatar
      status
    }
  }
}
`;
const ExtendedTables = ({CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"))}) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12">
      <div className="container-fluid"></div>
     
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <h4>Dịch vụ</h4>
              <p>Các dịch vụ hệ thống hỗ trợ</p>
            </div>
            
            
            <div className="content">
      <Query
      query={ALL_BRANCH}
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
      
        <TableDetail data = {data.allServiceTypes.nodes} />

        
      );
      }
    }}
    </Query>
    </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
);

export default ExtendedTables;