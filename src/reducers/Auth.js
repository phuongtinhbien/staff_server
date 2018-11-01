import { Query, Mutation } from 'react-apollo';
import gql  from "graphql-tag";
import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';




const defaultUserInfo = {
  name: 'Demo User',
  image: 'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png',
  id: null,
  branch: null,
  staffType: null,
  email: null,
  username: null,
  gender: null,
  address: null,
  phone: null,
  status: null

};



export default function reducer(state = {
  user: defaultUserInfo
}, action) {
  return state;
}