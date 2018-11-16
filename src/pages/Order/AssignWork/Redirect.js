import { Redirect, Route, withRouter, Link } from 'react-router-dom';
import gql from "graphql-tag";
import React from 'react';
import { Query } from 'react-apollo';
import Error from './../../Error';

const CUSTOMER_ORDER  = "customer_order";
const RECEIPT  = "receipt";

const CUSTOMER_ORDER_Q = gql `query getCustomerNodeId ($id: BigFloat!){
    customerOrderById(id: $id){
      nodeId
      id
    }
}`;
const RECEIPT_Q = gql`query getCustomerNodeId ($id: BigFloat!){
    receiptById(id: $id){
      nodeId
      id
    }
  }
`;

const RedirectPage  = ({type, typeId, content}) => {
    return (

        <frameElement>
            {type === CUSTOMER_ORDER && <Query query={CUSTOMER_ORDER_Q}
            variables={{id: typeId}}
            fetchPolicy={"network-only"}>
            {({loading, data, error, refetch}) => {
              if (loading) return null;
              if (refetch) {
                console.log(refetch);
              }
              if (error){
                return (<Error errorContent= {error.message}></Error>);
              }
              if (data != null){
              return (
                <Link to={'/order/order-list/view/'+data.customerOrderById.nodeId }>{content}</Link>
              );
            }}}
            </Query>}
            {type === RECEIPT && <Query query={RECEIPT_Q}
            variables={{id: typeId}}
            fetchPolicy={"network-only"}>
            {({loading, data, error, refetch}) => {
              if (loading) return null;
              if (refetch) {
                console.log(refetch);
              }
              if (error){
                return (<Error errorContent= {error.message}></Error>);
              }
              if (data != null){
              return (
                <Link to={ '/order/reciept-list/view/'+data.receiptById.nodeId }>{content}</Link>
              );
            }}}
            </Query>}
        </frameElement>
    )
}

export default withRouter(RedirectPage);