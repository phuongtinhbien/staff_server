import React from 'react';
import ProfileForm from './ProfileForm';
import UserInfo from './UserInfo';


const UserProfile = ( {CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"))}) => (
  <div className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <ProfileForm current_user ={CURRENT_USER}  />
        </div>
        <div className="col-md-4">
          <UserInfo current_user ={CURRENT_USER}/>
        </div>
      </div>
    </div>
  </div>
);

export default UserProfile;