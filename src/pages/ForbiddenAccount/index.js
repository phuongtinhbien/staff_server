import React from 'react';

import err from './icons_denied.png';
import { Redirect, Route, withRouter,Link } from 'react-router-dom';

const Error = (props) => (
<div className="container-fluid"  style={{ height:"100%"}}>
      <div className="row" style={{ height:"100%"}}>
      <div className="col-md-12" style={{textAlign:"center", height:"100%"}}>
      <div className="card" style={{ height:"100%"}}>
              <div className="header">
                <img src={err} height="200px" style={{ margin:"50px"}}></img>
                <br></br>
                <h4>Xảy ra lỗi!!!</h4>
              </div>
              <div className="content">
                
                &nbsp;
                <p>{props.errorContent}</p>
                <br></br>
                <Link to="/login" className="btn btn-fill btn-info">Quay lại trang đăng nhập</Link>
              </div>
              </div>
           
        </div>
      </div>
      </div>
);

export default Error;