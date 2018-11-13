import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Query, Mutation } from 'react-apollo';
import gql  from "graphql-tag";



class UserInfo extends Component {

  state = {
    isShowingUserMenu: false,
    staffInfo: this.props.staffInfo
  };

  render() {
    let { user } = this.props;
    let {staffInfo} = this.state;
    
    let currentUser;
    console.log(staffInfo);
    let { isShowingUserMenu } = this.state;

    return (
      <div className="user-wrapper">
     
      
      <div className="user">
        <img src={staffInfo.image} alt={staffInfo.name} className="photo" />
        <div className="userinfo">
          <div className="username">
            {staffInfo.name}
          </div>
          <div className="title">{staffInfo.staffType.staffType}</div>
        </div>
        <span
          onClick={() => this.setState({ isShowingUserMenu: !this.state.isShowingUserMenu })}
          className={cx("pe-7s-angle-down collapse-arrow", {
            active: isShowingUserMenu
          })}></span>
      </div>
      <Collapse in={isShowingUserMenu}>
        <ul className="nav user-nav">
          <li><Link to="/userProfile">
          Thông tin cá nhân
        </Link></li>
          {/* <li><a href="#">Edit Profile</a></li>
          <li><a href="#">Settings</a></li> */}
        </ul>
      </Collapse>
    </div>

    );
  }
}

const mapStateToProps = state => ({
  user: state.staffInfo
});

export default connect(mapStateToProps)(UserInfo);