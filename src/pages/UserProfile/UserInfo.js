import React from 'react';
import profileImage from '../../assets/images/faces/face-3.jpg';
const UserInfo = ({current_user}) => (
  <div className="card card-user">
    <div className="image">
      <img src={current_user.image} style={{height:"300px", scale:"center"}} />
    </div>
    <div className="content">
      <div className="author">
        <a href="#">

          <h4 className="title">
           {current_user.name}<br />
            <small>{current_user.email}</small>
          </h4>
        </a>
      </div>
      <p className="description text-center">
        
      </p>
    </div>
    <hr />
    <div className="text-center">
      {/* <button href="#" className="btn btn-simple"><i className="fa fa-facebook-square"></i></button>
      <button href="#" className="btn btn-simple"><i className="fa fa-twitter"></i></button>
      <button href="#" className="btn btn-simple"><i className="fa fa-google-plus-square"></i></button> */}
    </div>
  </div>
);

export default UserInfo;