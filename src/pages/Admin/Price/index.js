import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import ClothList from './ClothList';
const OPTION_QUERY = gql `query unitPrice {
  allUnitPrices{
    nodes{
      id
      status
      price
      productByProductId{
        nodeId
        id
        productName
      }
      serviceTypeByServiceTypeId{
        nodeId
        id
        serviceTypeName
      }
      
      unitByUnitId{
        nodeId
        id
        unitName
      }
    }
  }
}`;

const proccessData = (data)=>{
    let res= [];

    if (data)
    data.forEach(element => {

      res.push({
        id: element.id,
        productName: element.productByProductId && element.productByProductId.productName,
      serviceType: element.serviceTypeByServiceTypeId.serviceTypeName,
      unitName: element.unitByUnitId.unitName,
    status: element.status,
  price: element.price.toLocaleString('vi-VI', { style: 'currency', currency: 'VND' }) })
    });
    return res;
}
const Other = () => (
    <div className="card">
    <div className="header">
                <h4>Đơn giá</h4>
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
      
     <ClothList data={proccessData(data.allUnitPrices.nodes)}/>
        
        
      );
      }
    }}
    </Query>
    
    </div>
  </div>
  </div>
);

export default Other;