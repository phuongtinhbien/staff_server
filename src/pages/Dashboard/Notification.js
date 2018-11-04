import React, { Component } from 'react';
import cx from 'classnames';
import uncheckImage from 'assets/images/checkbox-uncheck.svg';
import checkImage from 'assets/images/checkbox-check.svg';
import qrScan from "./qr-scan.png";
import { Field, reduxForm } from 'redux-form';
import renderField from 'components/FormInputs/renderField';
import QrScan from './QrScan';


class SearchOrder extends Component {
  state = {
    startScan: false
  }
  
  render() {
    let {handleSubmit} = this.props;
    let {startScan} = this.state;
    return (
      <div className="card ">
        <div className="header">
          <h4 className="title">Tra cứu đơn hàng</h4>
          <p className="category">Nhập mã đơn hàng, tên khách hàng hoặc quét mã QR-Code</p>
        </div>
        <div className="content">
          <div className="text-center" style={{margin:"20px"}} >
          <img src={qrScan} style={{justifyItems:"right", width:"80px"}} onClick={e=>{this.setState({startScan: !startScan})}}></img>
          {startScan &&<QrScan/>}
          </div>
          <form className="form-horizontal" onSubmit={handleSubmit}>
            
            <div className="form-group">
              <label className="col-md-3 control-label">Tên khách hàng</label>
              <div className="col-md-9">
                <Field type="text" 
                className={"form-control"} 
                name="customerName" placeholder="customer's name"
                component={renderField}
                ></Field>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">Mã đơn hàng</label>
              <div className="col-md-9">
                <Field type="text" 
                className={"form-control"} 
                name="orderCode" 
                placeholder="Order's Code"
                helpText ="Tìm kiếm nếu không thông tin nhập"
                component={renderField}
                ></Field>
              </div>
            </div>
            <div className="text-center">
            <button
                type="submit"
                className="btn btn-fill btn-info"
              >
                Tìm kiếm
              </button>
            </div>
            
          </form>
          
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'SearchOrder'
})(SearchOrder)