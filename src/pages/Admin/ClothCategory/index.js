import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import gql from 'graphql-tag';
import ClothList from './ClothList';
import ClothCateList from './ClothCateList';
import { Query } from 'react-apollo';
const OPTION_QUERY = gql `query allCloth {
    allProducts{
      nodes{
        nodeId
        id
        productName
        productAvatar
        status
        shortDesc
        productTypeByProductTypeId{
          productTypeName
          id
          nodeId
        }
      }
    }
    
    allProductTypes{
      nodes{
        nodeId
        id
        productTypeName
        status
      }
    }
  }`;
const Other = () => (
    <div className="card">
    <div className="header">
                <h4>Quần áo và Loại quần áo</h4>
                <p></p>
              </div>
  <div className="content">
    <div className="container-fluid">
    <Query
      query={OPTION_QUERY}
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
        <Tab eventKey={1} title="Quần áo"><ClothList data={data.allProducts.nodes}/></Tab>
        <Tab eventKey={2} title="Nhóm quần áo"> <ClothCateList data={data.allProductTypes.nodes}></ClothCateList></Tab>

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