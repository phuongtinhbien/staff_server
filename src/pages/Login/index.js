import React, {Component} from 'react';
import LoginForm from './LoginForm';
import ic from './ic_app.png';
import { Query, Mutation } from 'react-apollo';
import gql  from "graphql-tag";
import ApolloClient from 'apollo-boost';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import background from 'assets/bg_login.jpg';
import { onError } from 'apollo-link-error';
import LoginFormAdmin from './LoginFormAdmin';

const client = new ApolloClient({ uri: 'http://192.168.1.12:5000/graphql' ,
cache: new InMemoryCache(),

});
const AUTH_MUT = gql `mutation authenticcation ($email: String!, $password:String!, $userType: String!){
  authenticate(input:{
    email:$email,
    password: $password,
    userType:$userType
  }){
  jwt
}
}`;







const handleOnCompleted = (data,history,LoginAdmin)=>{
  
  console.log(data);
  if (data != null && data.authenticate.jwt!= null){
    localStorage.setItem("luandryStaffPage.staff_key", data.authenticate.jwt);
    localStorage.setItem("luandryStaffPage.admin_toggle", LoginAdmin);
    history.push("/");
  }


}
class  Login extends Component { 

  state={
    errorContent: null,
    LoginAdmin: false,
    loginNext: "Đăng nhập trang quản trị"
  }
  render(){
    let {history} = this.props;
    let{errorContent,LoginAdmin,loginNext} = this.state;
  console.log(this.props)
  if (!localStorage.getItem("luandryStaffPage.staff_key"))
    return (
    <ApolloProvider client={client} >
    <div className="wrapper" style={{backgroundImage: `url(${background})`,backgroundRepeat: 'noRepeat' }}>
    <div className="content" >
    <div className="row">
      <div className="col-md-4">
      </div>
        <div className="col-md-4 ">
        <div className="text-center"><img src={ic} style={{height:"150px"}}/> <h3>Quản lí đơn hàng</h3></div>
        <div className="card">
        <div className="content">
       
        <Mutation
                    mutation={AUTH_MUT}
                    onCompleted={data=> {handleOnCompleted(data,history,LoginAdmin);
                  
                      this.setState({errorContent: data.authenticate.jwt? null: "Tài khoản không tồn tại"})
                     }}
                    update={(cache, { data: { authenticate } }) => {
                      const { jwt } = cache.readQuery({ query: AUTH_MUT });
                    }}
                    onError={error => this.setState({errorContent:error.message})}

                  >
                  {
                    (authenticate) =>(
                    <div>
                      {!LoginAdmin && <LoginForm errorContent={errorContent}  onSubmit={values => {authenticate({variables:{userType: "staff_type",...values}});
                     }} /> }
                     {LoginAdmin && <LoginFormAdmin errorContent={errorContent}  onSubmit={values => {authenticate({variables:{userType: "admin",...values}});
                    }} /> }
                      <span rel="tooltip"
                        className="btn btn-warning btn-simple btn-xs" 
                        onClick={e =>{ e.preventDefault(); 
                        this.setState({LoginAdmin: !LoginAdmin, loginNext: !LoginAdmin?"Đăng nhập trang quản trị":"Đăng nhập  tài khoản nhân viên"});
                        }}>{loginNext} </span>
                    </div>
                    )
                  }
          
          </Mutation>
          </div>
          </div>
        </div>
        <div className="col-md-4">
        </div>
      </div>
    </div>
    
    </div>
    </ApolloProvider>);
  else{
    return <Redirect to="/"/>
  }
}
};

const mapStateToProp = state => ({
  isLogined: state.isLogined
});


export default withRouter(connect(mapStateToProp)(Login));