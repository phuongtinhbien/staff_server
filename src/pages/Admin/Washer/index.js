import React from 'react';
import TableWithSwitch from './TableWithSwitch';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import TableDetail from './TableDetail';
const ALL_WASHER = gql`query allWash {
  allWashingMachines
  {
    totalCount
    nodes{
      id
      nodeId
      washerCode
      createDate
      status
      capacity
      branchByBranchId {
        nodeId
        id
        branchName
      }
    }
  }
}
`;
const ExtendedTables = ({CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"))}) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12">
      <Query
      query={ALL_WASHER}
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
      
        <TableDetail orderList = {data.allWashingMachines.nodes} />

        
      );
      }
    }}
    </Query>
       
      </div>
    </div>
  </div>
);

export default ExtendedTables;