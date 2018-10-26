import React from 'react';

import err from './icon-error.png';


const Error = (props) => (
<div className="container-fluid"  style={{ height:"100%"}}>
      <div className="row" style={{ height:"100%"}}>
      <div className="col-md-12" style={{textAlign:"center", height:"100%"}}>
      <div className="card" style={{ height:"100%"}}>
              <div className="header">
                <img src={err} height="200px" style={{ margin:"50px"}}></img>
                <br></br>
                <h4>Some things went wrong !!!</h4>
              </div>
              <div className="content">
                
                &nbsp;
                <p>{props.errorContent}</p>
              </div>
              </div>
           
        </div>
      </div>
      </div>
);

export default Error;