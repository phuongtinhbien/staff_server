import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import TableDetail from './TableDetail';
import Error from '../../Error';
const ALL_BRANCH = gql`query allBranch {
  allBranches{
    nodes{
      id
      nodeId
      branchName
      address
      status
    }
  }
}
`;
const ExtendedTables = ({CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"))}) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12">
      <Query
      query={ALL_BRANCH}
      fetchPolicy={"network-only"}
 
    >{({ loading, error, data, refetch, }) => {
      if (loading) return null;
      if (refetch) {
        console.log(refetch);
      }
      if (error){
        return (<Error errorContent= {error.message}></Error>);
      }
      if (data != null){
      return (
      
        <TableDetail data = {data.allBranches.nodes} />

        
      );
      }
    }}
    </Query>
       
      </div>
    </div>
  </div>
);

export default ExtendedTables;