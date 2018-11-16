import React from 'react';
import TableWithSwitch from './TableWithSwitch';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const ALL_WASHER = gql`query allWash ($brId: BigFloat!){
  allWashingMachines(condition:{
    branchId: $brId
  })
  {
    totalCount
    nodes{
      id
      nodeId
      washerCode
      createDate
      status
      capacity
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
      variables = {{ brId: CURRENT_USER.branch.id }}
 
    >{({ loading, error, data, refetch, }) => {
      if (loading) return null;
      if (refetch) {
        console.log(refetch);
      }
      if (error){
      }
      if (data != null){
      return (
        <TableWithSwitch washer = {data.allWashingMachines.nodes} />
      );
      }
    }}
    </Query>
       
      </div>
    </div>
  </div>
);

export default ExtendedTables;