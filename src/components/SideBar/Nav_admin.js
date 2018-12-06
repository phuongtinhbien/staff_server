import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';


class Nav extends Component {

  state = {};

  render() {
    let { location } = this.props;
    return (
      <ul className="nav">
        {/* <li className={location.pathname === '/' ? 'active' : null}>
          <Link to="/">
            <i className="pe-7s-graph"></i>
            <p>Tổng quan</p>
          </Link>
        </li> */}
        <li className={location.pathname === '/admin/new' ? 'active' : null}>
          <Link to="/admin/new">
            <i className="pe-7s-graph"></i>
            <p>Tạo chi nhánh mới</p>
          </Link>
        </li>
        <li className={this.state.componentMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ componentMenuOpen: !this.state.componentMenuOpen })}
            data-toggle="collapse">
            <i className="pe-7s-plugin"></i>
            <p>
              Quản lí chung
            <b className="caret"></b>
            </p>
          </a>
          <Collapse in={this.state.componentMenuOpen}>
            <div>
              <ul className="nav">
            
                <li className={this.isPathActive('/admin/cloth') ? 'active' : null}>
                  <Link to="/admin/cloth">Quần áo</Link>
                </li>
                {/* <li className={this.isPathActive('/admin/price') ? 'active' : null}>
                  <Link to="/admin/price">Đơn giá</Link>
                </li> */}
                <li className={this.isPathActive('/admin/washer') ? 'active' : null}>
                  <Link to="/admin/washer">Máy giặt</Link>
                </li>
                <li className={this.isPathActive('/admin/other')  ? 'active' : null}>
                  <Link to="/admin/other" >
                    {/* <i className="pe-7s-more"></i> */}
                    Khác
                  </Link>
                
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className={this.isPathActive('/admin/branch') ? 'active' : null}>
          <Link to="/admin/branch">
            <i className="pe-7s-network"></i>
            <p>Chi nhánh</p>
          </Link>
        </li>
        <li className={this.isPathActive('/admin/service') ? 'active' : null}>
          <Link to="/admin/service">
            <i className="pe-7s-albums"></i>
            <p>Dịch vụ</p>
          </Link>
        </li>
        <li className={this.isPathActive('/admin/promotion') ? 'active' : null}>
          <Link to="/admin/promotion">
            <i className="pe-7s-gift"></i>
            <p>Khuyến mãi</p>
          </Link>
        </li>
        <li className={this.isPathActive('/admin/account') || this.state.tableMenuOpen ? 'active' : null}>
        <Link to="/admin/account">
            <i className="pe-7s-users"></i>
            <p>Tài khoản </p>
          </Link>
         
        </li>
        
        
       
      </ul>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);