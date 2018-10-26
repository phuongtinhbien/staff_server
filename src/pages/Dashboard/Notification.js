import React, { Component } from 'react';
import cx from 'classnames';
import uncheckImage from 'assets/images/checkbox-uncheck.svg';
import checkImage from 'assets/images/checkbox-check.svg';
import qrScan from "./qr-scan.png";


class SearchOrder extends Component {

 


  render() {
    return (
      <div className="card ">
        <div className="header">
          <h4 className="title">Search Customer's Order</h4>
          <p className="category">Type the code of order, customer's name, scan QR-Code </p>
        </div>
        <div className="content">
          <div className="text-center" style={{margin:"20px"}} ><img src={qrScan} style={{justifyItems:"right", width:"80px"}}></img></div>
          <form className="form-horizontal">
            
            <div className="form-group">
              <label className="col-md-3 control-label">Customer's name</label>
              <div className="col-md-9">
                <input type="text" className={"form-control"} name="customerName" placeholder="customer's name"></input>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">Order's Code</label>
              <div className="col-md-9">
                <input type="text" className={"form-control"} name="orderCode" placeholder="Order's Code"></input>
              </div>
            </div>
            <div className="text-center">
            <button
                type="submit"
                className="btn btn-fill btn-info"
              >
                Search
              </button>
            </div>
            
          </form>
          
        </div>
      </div>
    );
  }
}

export default SearchOrder;