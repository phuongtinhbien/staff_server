import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import cx from 'classnames';
import gql from "graphql-tag";
import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import { setMobileNavVisibility } from '../../reducers/Layout';
import Calendar from '../Calendar';
import Charts from '../Charts';
import Components from '../Components';
/**
 * Pages
 */
import Dashboard from '../Dashboard';
import Forms from '../Forms';
import Login from '../Login';
import Orders from '../Order';
import Tables from '../Tables';
import UserProfile from '../UserProfile';
// import { ApolloClient } from 'apollo-client';
// import { ApolloProvider } from 'react-apollo';
import Header from './Header';
import Admin from '../Admin';

// First way to import

// const client = new ApolloClient({
//   link: createHttpLink({ uri: 'http://localhost:5000/graphql'
//   ,
// headers:{
//   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXV0aF9hdXRoZW50aWNhdGVkIiwidXNlcl9pZCI6NSwidXNlcl90eXBlIjoiY3VzdG9tZXJfdHlwZSIsImlhdCI6MTU0MDI2MjgxNywiZXhwIjoxNTQwMzQ5MjE3LCJhdWQiOiJwb3N0Z3JhcGhpbGUiLCJpc3MiOiJwb3N0Z3JhcGhpbGUifQ.xqJkHssJyVmtlZKHRnRdiXE17hHto44gMhFkJji6S-g'
// } }),
//   cache: new InMemoryCache(),
// });

let client = new ApolloClient({ uri: 'http://localhost:5000/graphql' ,
headers:{
  authorization: "BEARER "+localStorage.getItem("luandryStaffPage.staff_key")
},
cache: new InMemoryCache(),

});

const CURR_USER = gql `query{
  currentUser{
    id
    userType
    lastName
    firstName

  }
}`;
const CURR_USER_INFO = gql `query currentStaff($id: BigFloat!) {
  staffById (id: $id){
    nodeId
    id
    fullName
    email
    username
    gender
    address
    phone
    status
    branchByBranchId{
      nodeId
      id
      address
      branchName
      storeByStoreId{
        nodeId
        id
        storeName
      }
    }
    staffTypeByStaffTypeId{
      staffCode
      staffTypeName
      id
      nodeId
    }
    postByStaffAvatar{
      id
      nodeId
      headerImageFile
    }
  }
}`;



const proccessInfoUser = (data)=>{
    return {
      name: data.staffById.fullName,
      image: data.staffById.postByStaffAvatar? data.staffById.postByStaffAvatar.headerImageFile: 'https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png',
      id: data.staffById.id,
      status: data.staffById.status,
      email: data.staffById.email,
      gender: data.staffById.gender ==true?"Female": "Male",
      address: data.staffById.address,
      phone: data.staffById.phone,
      staffType: {
        staffCode: data.staffById.staffTypeByStaffTypeId? data.staffById.staffTypeByStaffTypeId.staffCode: "",
        staffType: data.staffById.staffTypeByStaffTypeId? data.staffById.staffTypeByStaffTypeId.staffTypeName: "undefined",
      },
      branch: {
        id: data.staffById.branchByBranchId.id,
        branchName: data.staffById.branchByBranchId.branchName,
        address: data.staffById.branchByBranchId.address,
        storeName: data.staffById.branchByBranchId.storeByStoreId.storeName
      }

    }

}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("luandryStaffPage.staff_key") && localStorage.getItem("luandryStaffPage.curr_staff_id")
    && localStorage.getItem("luandryStaffPage.curr_staff_desc")
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
);

const PrivateMain = ({mobileNavVisibility,
  hideMobileMenu,
  history}) => (
  <frameElement>
    {localStorage.getItem("luandryStaffPage.staff_key") && !localStorage.getItem("luandryStaffPage.curr_staff_id")
    && !localStorage.getItem("luandryStaffPage.curr_staff_desc")?<Query query={CURR_USER}
  >
          {({loading, error,data, refetch,stopPolling, networkStatus}) => {
            if (loading) return null;
            if (error) {
            stopPolling();
            return <Redirect to={{
                    pathname: '/login',
                    
                  }} />
           
          }
          
            if (data){
                localStorage.setItem("luandryStaffPage.curr_staff_id",data.currentUser.id);
                return(
                  <Query query={CURR_USER_INFO}
                  
                  variables={{id:data.currentUser.id }}>
                  {({loading, error,data, refetch,stopPolling}) => {
                    if (loading) return null;
                    if (error) {
                    stopPolling();
                    return <Redirect to={{
                      pathname: '/login',
                      
                    }} />
          }
            if (data){
                localStorage.setItem("luandryStaffPage.curr_staff_desc",JSON.stringify(proccessInfoUser(data)));
                return (
                  <frameElement>
                    <SideBar  />
                          <div className="main-panel">
                          <Header history={history} />
                              <PrivateRoute  exact path="/" component={Dashboard} />
                              <PrivateRoute  path="/components" component={Components} />
                              <PrivateRoute  path="/profile" component={UserProfile} />
                              <PrivateRoute  path="/forms" component={Forms} />
                              <PrivateRoute  path="/tables" component={Tables} />
                  
                              {/* <PrivateRoute  path="/charts" component={Charts} /> */}
                              {/* <PrivateRoute  path="/calendar" component={Calendar} /> */}
                              <PrivateRoute  path="/userProfile" component={UserProfile} />
                              <PrivateRoute  path="/order" component={Orders} />
  
                          </div>
                       </frameElement>
                );
                
              }
            }}
          </Query>
                  
                );     
            }
            return null;
          }
          }

          </Query>: <frameElement>
                  {localStorage.getItem("luandryStaffPage.staff_key") && localStorage.getItem("luandryStaffPage.curr_staff_id")
    && localStorage.getItem("luandryStaffPage.curr_staff_desc")?
      <frameElement>
                  <SideBar  />
                    
                        <div className="main-panel">
                        <Header history={history} />
                            <PrivateRoute  exact path="/" component={Dashboard} />
                            <PrivateRoute  path="/components" component={Components} />
                            <PrivateRoute  path="/profile" component={UserProfile} />
                            <PrivateRoute  path="/forms" component={Forms} />
                            <PrivateRoute  path="/tables" component={Tables} />
                
                            {/* <PrivateRoute  path="/charts" component={Charts} />
                            <PrivateRoute  path="/calendar" component={Calendar} /> */}
                            <PrivateRoute  path="/userProfile" component={UserProfile} />
                            <PrivateRoute  path="/order" component={Orders} />
                                
                            
                        </div>
                        
                    
                 </frameElement>:<Redirect to={{
                    pathname: '/login',
                    
                  }} />  }
                      </frameElement>}
                      </frameElement>
  

);
const PrivateMain2 = ({mobileNavVisibility,
  hideMobileMenu,
  history}) => (
  <frameElement>
    {localStorage.getItem("luandryStaffPage.staff_key") && !localStorage.getItem("luandryStaffPage.curr_staff_id")
    && !localStorage.getItem("luandryStaffPage.curr_staff_desc")?<Query query={CURR_USER}
  >
          {({loading, error,data, refetch,stopPolling, networkStatus}) => {
            if (loading) return null;
            if (error) {
            stopPolling();
            return <Redirect to={{
                    pathname: '/login',
                    
                  }} />
           
            }
          
            if (data){
                localStorage.setItem("luandryStaffPage.curr_staff_id",data.currentUser.id);

                localStorage.setItem("luandryStaffPage.curr_staff_desc",JSON.stringify({
                  branch: {branchName: "QUẢN TRỊ HỆ THỐNG",id: ''},
                  name : data.currentUser.lastName + " "+ data.currentUser.firstName,
                  staffType:{staffCode: "ADMIN", staffType: "ADMIN"},...data}));
                return (
                  <frameElement>
                    <SideBar  />
                          <div className="main-panel">
                          <Header history={history} />
                              <PrivateRoute  exact path="/" component={Dashboard} />
                              <PrivateRoute  path="/components" component={Components} />
                              <PrivateRoute  path="/profile" component={UserProfile} />
                              <PrivateRoute  path="/forms" component={Forms} />
                              <PrivateRoute  path="/tables" component={Tables} />
                  
                              {/* <PrivateRoute  path="/charts" component={Charts} /> */}
                              {/* <PrivateRoute  path="/calendar" component={Calendar} /> */}
                              <PrivateRoute  path="/userProfile" component={UserProfile} />
                              <PrivateRoute  path="/admin" component={Admin} />
  
                          </div>
                       </frameElement>
                );
                
              }
            }}


          </Query>: <frameElement>
                  {localStorage.getItem("luandryStaffPage.staff_key") && localStorage.getItem("luandryStaffPage.curr_staff_id")
    && localStorage.getItem("luandryStaffPage.curr_staff_desc")?
      <frameElement>
                  <SideBar  />
                    
                        <div className="main-panel">
                        <Header history={history} />
                            <PrivateRoute  exact path="/" component={Dashboard} />
                            <PrivateRoute  path="/components" component={Components} />
                            <PrivateRoute  path="/profile" component={UserProfile} />
                            <PrivateRoute  path="/forms" component={Forms} />
                            <PrivateRoute  path="/tables" component={Tables} />
                
                            {/* <PrivateRoute  path="/charts" component={Charts} />
                            <PrivateRoute  path="/calendar" component={Calendar} /> */}
                            <PrivateRoute  path="/userProfile" component={UserProfile} />
                            <PrivateRoute  path="/admin" component={Admin} />
                                
                            
                        </div>
                        
                    
                 </frameElement>:<Redirect to={{
                    pathname: '/login',
                    
                  }} />  }
                      </frameElement>}
                      </frameElement>
  

);


const Main = ({
  mobileNavVisibility,
  hideMobileMenu,
  history,
  isLogined,
  admin_toggle = JSON.parse(localStorage.getItem("luandryStaffPage.admin_toggle"))
}) => {
  history.listen(() => {
    if (mobileNavVisibility === true) {
      hideMobileMenu();
    }
    client = new ApolloClient({ uri: 'http://localhost:5000/graphql' ,
    headers:{
      authorization: "BEARER "+localStorage.getItem("luandryStaffPage.staff_key")
    },
    cache: new InMemoryCache(),

    });
  });

  return (
    
    <div className={cx({
      'nav-open': mobileNavVisibility === true
    })}>
    <Route  exact path="/login" component={Login} />
    <ApolloProvider client={client}  >
    <div className="wrapper">
    <div className="close-layer" onClick={hideMobileMenu}></div>
    {/* <PrivateMain history={history} /> */}
     {!admin_toggle? <PrivateMain history={history} />:<PrivateMain2 history={history} />}
    </div>
    
    </ApolloProvider>
      
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