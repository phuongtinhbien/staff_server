import React from 'react';
import { Route, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { setMobileNavVisibility } from '../../reducers/Layout';
import { withRouter } from 'react-router-dom';

import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ApolloClient } from 'apollo-client';
// import { ApolloProvider } from 'react-apollo';
import Header from './Header';
import Footer from './Footer';
import SideBar from '../../components/SideBar';
import ThemeOptions from '../../components/ThemeOptions';
import MobileMenu from '../../components/MobileMenu';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
/**
 * Pages
 */
import Dashboard from '../Dashboard';
import Components from '../Components';
import UserProfile from '../UserProfile';
import MapsPage from '../MapsPage';
import Forms from '../Forms';
import Charts from '../Charts';
import Calendar from '../Calendar';
import Tables from '../Tables';

import Orders from '../Order';
// First way to import

// const client = new ApolloClient({
//   link: createHttpLink({ uri: 'http://localhost:5000/graphql'
//   ,
// headers:{
//   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXV0aF9hdXRoZW50aWNhdGVkIiwidXNlcl9pZCI6NSwidXNlcl90eXBlIjoiY3VzdG9tZXJfdHlwZSIsImlhdCI6MTU0MDI2MjgxNywiZXhwIjoxNTQwMzQ5MjE3LCJhdWQiOiJwb3N0Z3JhcGhpbGUiLCJpc3MiOiJwb3N0Z3JhcGhpbGUifQ.xqJkHssJyVmtlZKHRnRdiXE17hHto44gMhFkJji6S-g'
// } }),
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({ uri: 'http://localhost:5000/graphql' ,
headers:{
  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXV0aF9hdXRoZW50aWNhdGVkIiwidXNlcl9pZCI6NiwidXNlcl90eXBlIjoic3RhZmZfdHlwZSIsImlhdCI6MTU0MDQ5MDYwMywiZXhwIjoxNTQwNTc3MDAzLCJhdWQiOiJwb3N0Z3JhcGhpbGUiLCJpc3MiOiJwb3N0Z3JhcGhpbGUifQ.3OOmCYFq4B5ThZxN_ya3tNM0ytawJeTCgyNvN5FN8AU'
},
cache: new InMemoryCache(),

});


const Main = ({
  mobileNavVisibility,
  hideMobileMenu,
  history
}) => {
  history.listen(() => {
    if (mobileNavVisibility === true) {
      hideMobileMenu();
    }
  });
  
  return (
    <div className={cx({
      'nav-open': mobileNavVisibility === true
    })}>
      <div className="wrapper">
        <div className="close-layer" onClick={hideMobileMenu}></div>
        <SideBar  />
          
          <div className="main-panel">
          <Header />
          <ApolloProvider client={client} >
             <div>
                <Route exact path="/" component={Dashboard} />
                <Route  path="/components" component={Components} />
                <Route  path="/profile" component={UserProfile} />
                <Route  path="/forms" component={Forms} />
                <Route  path="/tables" component={Tables} />
                <Route  path="/maps" component={MapsPage} />
                <Route  path="/charts" component={Charts} />
                <Route  path="/calendar" component={Calendar} />
                <Route  path="/userProfile" component={UserProfile} />
                <Route  path="/order" component={Orders} />
              </div>
          </ApolloProvider>
          </div>
          <Footer />
        
      </div>
    </div>
  )
};

const mapStateToProp = state => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
});

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));