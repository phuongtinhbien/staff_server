import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Collapse } from 'react-bootstrap';
import UserInfo from './UserInfo';
import Nav from './Nav';
import backgroundImage from 'assets/images/sidebar-5.jpg';
import { Query, Mutation } from 'react-apollo';
import gql  from "graphql-tag";
import ApolloClient from 'apollo-boost';

// const client = new ApolloClient({ uri: 'http://localhost:5000/graphql' ,
// headers:{
//   authorization: "BEARER "+localStorage.getItem("luandryStaffPage.staff_key")
// },

// });
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


class SideBar extends Component {

  state = {};

  render() {
    let {
      location,
      backgroundColor,
      enableBackgroundImage,
      backgroundImage
    } = this.props;

    return (
      <div className="sidebar" data-color={backgroundColor} data-image={backgroundImage}>

        <div className="brand">
          <a href="/" className="brand-name">
            <img src={'https://firebasestorage.googleapis.com/v0/b/luandry-2f439.appspot.com/o/logo%2Fbanner.svg?alt=media&token=48532afa-4dc1-4e3f-9e4f-6c813f2b9faf'} alt="logo" className="logo" />
          </a>

        </div>

        <div className="sidebar-wrapper">
       
       <UserInfo staffInfo={localStorage.getItem("luandryStaffPage.curr_staff_desc")?JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc")):defaultUserInfo} />
          <div className="line"></div>
          <Nav />
        </div>
        <div
          className="sidebar-background"
          style={{
            backgroundImage: 'url(' + backgroundImage + ')'
          }}>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  enableBackgroundImage: state.ThemeOptions.enableBackgroundImage,
  backgroundColor: state.ThemeOptions.backgroundColor,
  backgroundImage: state.ThemeOptions.backgroundImage
});

export default withRouter(
  connect(mapStateToProps)(SideBar)
);