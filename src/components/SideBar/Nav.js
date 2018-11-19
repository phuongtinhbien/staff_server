import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';


class Nav extends Component {

  state = {};

  render() {
    let { location } = this.props;
    return (
      <ul className="nav">
        <li className={location.pathname === '/' ? 'active' : null}>
          <Link to="/">
            <i className="pe-7s-graph"></i>
            <p>Tổng quan</p>
          </Link>
        </li>
        <li className={this.isPathActive('/order/create-order') ? 'active' : null}>
          <Link to="/order/create-order">
            <i className="pe-7s-plus"></i>
            <p>Tạo đơn hàng mới</p>
          </Link>
        </li>
        <li className={this.isPathActive('/order/assign-work') ? 'active' : null}>
          <Link to="/order/assign-work">
            <i className="pe-7s-date"></i>
            <p>Phân công đơn hàng</p>
          </Link>
        </li>
        <li className={this.state.componentMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ componentMenuOpen: !this.state.componentMenuOpen })}
            data-toggle="collapse">
            <i className="pe-7s-plugin"></i>
            <p>
              Đơn hàng khách hàng
            <b className="caret"></b>
            </p>
          </a>
          <Collapse in={this.state.componentMenuOpen}>
            <div>
              <ul className="nav">
              <li className={this.isPathActive('/order/order-list/pending') ? 'active' : null}>
                  <Link to="/order/order-list/pending">Đang chờ</Link>
                </li>
                <li className={this.isPathActive('/order/order-list/processing') ? 'active' : null}>
                  <Link to="/order/order-list/processing">Đang xử lí</Link>
                </li>
                <li className={this.isPathActive('/order/order-list/processed') ? 'active' : null}>
                  <Link to="/order/order-list/processed">Đã hoàn tất</Link>
                </li>
                <li className={this.isPathActive('/order/order-list/finish') ? 'active' : null}>
                  <Link to="/order/order-list/finish">Đơn hàng xong</Link>

                </li>
                <li className={this.isPathActive('/order/order-list/declined') ? 'active' : null}>
                  <Link to="/order/order-list/declined">Bị hủy</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className={this.state.tableMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ tableMenuOpen: !this.state.tableMenuOpen })}
            data-toggle="collapse">
            <i className="pe-7s-plugin"></i>
            <p>
              Biên nhận khách hàng
            <b className="caret"></b>
            </p>
          </a>
          <Collapse in={this.state.tableMenuOpen}>
            <div>
              <ul className="nav">
              <li className={this.isPathActive('/order/reciept-list/pending') ? 'active' : null}>
                  <Link to="/order/reciept-list/pending">Chờ lấy đồ</Link>
                </li>
                <li className={this.isPathActive('/order/reciept-list/processing') ? 'active' : null}>
                  <Link to="/order/reciept-list/processing">Đã lấy</Link>
                </li>
                <li className={this.isPathActive('/order/reciept-list/delivery') ? 'active' : null}>
                  <Link to="/order/reciept-list/delivery">Chờ trả đồ</Link>
                </li>
                <li className={this.isPathActive('/order/reciept-list/deliveried') ? 'active' : null}>
                  <Link to="/order/reciept-list/deliveried">Đã trả</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className={this.isPathActive('/order/washer') ? 'active' : null}>
          <Link to="/order/washer">
            <i className="pe-7s-config"></i>
            <p>Máy giặt</p>
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