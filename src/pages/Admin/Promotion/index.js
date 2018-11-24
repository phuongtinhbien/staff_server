import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import TableDetail from './TableDetail';
const ALL_BRANCH = gql`query allPromotion{
  allPromotions{
    nodes{
      nodeId
      id
      promotionName
      promotionCode
      status
      dateStart
      dateEnd
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
      }
      if (data != null){
      return (
      
        <TableDetail data = {data.allPromotions.nodes} />

        
      );
      }
    }}
    </Query>
       
      </div>
    </div>
  </div>
);

export default ExtendedTables;