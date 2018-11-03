import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';


class StaffNav extends Component {

  state = {};

  render() {
    let { location } = this.props;
    return (
      <ul className="nav">
        <li className={location.pathname === '/' ? 'active' : null}>
          <Link to="/">
            <i className="pe-7s-graph"></i>
            <p>Dashboard</p>
          </Link>
        </li>
        {/* <li className={this.isPathActive('/order/create-order') ? 'active' : null}>
          <Link to="/order/create-order">
            <i className="pe-7s-plus"></i>
            <p>Create new Order</p>
          </Link>
        </li> */}
        <li className={this.state.componentMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ componentMenuOpen: !this.state.componentMenuOpen })}
            data-toggle="collapse">
            <i className="pe-7s-plugin"></i>
            <p>
              Customer's Order
            <b className="caret"></b>
            </p>
          </a>
          <Collapse in={this.state.componentMenuOpen}>
            <div>
              <ul className="nav">
              {/* <li className={this.isPathActive('/order/order-list/pending') ? 'active' : null}>
                  <Link to="/order/order-list/pending">Pending</Link>
                </li> */}
                <li className={this.isPathActive('/order/order-list/processing') ? 'active' : null}>
                  <Link to="/order/order-list/processing">Processing</Link>
                </li>
                <li className={this.isPathActive('/order/order-list/processed') ? 'active' : null}>
                  <Link to="/order/order-list/processed">Processed</Link>
                </li>
                <li className={this.isPathActive('/order/order-list/finish') ? 'active' : null}>
                  <Link to="/order/order-list/finish">Finish</Link>

                </li>
                {/* <li className={this.isPathActive('/order/order-list/declined') ? 'active' : null}>
                  <Link to="/order/order-list/declined">Declined</Link>
                </li> */}
              </ul>
            </div>
          </Collapse>
        </li>
        {/* <li className={this.state.tableMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ tableMenuOpen: !this.state.tableMenuOpen })}
            data-toggle="collapse">
            <i className="pe-7s-plugin"></i>
            <p>
              Customer's Reciept
            <b className="caret"></b>
            </p>
          </a>
          <Collapse in={this.state.tableMenuOpen}>
            <div>
              <ul className="nav">
              <li className={this.isPathActive('/order/reciept-list/pending') ? 'active' : null}>
                  <Link to="/order/reciept-list/pending">Pending pick up</Link>
                </li>
                <li className={this.isPathActive('/order/reciept-list/processing') ? 'active' : null}>
                  <Link to="/order/reciept-list/processing">Recieved</Link>
                </li>
                <li className={this.isPathActive('/order/reciept-list/delivery') ? 'active' : null}>
                  <Link to="/order/reciept-list/delivery">Pending delivery</Link>
                </li>
                <li className={this.isPathActive('/order/reciept-list/deliveried') ? 'active' : null}>
                  <Link to="/order/reciept-list/deliveried">Deliveried</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li> */}
        <li className={this.isPathActive('/charts') ? 'active' : null}>
          {/* <Link to="/charts">
            <i className="pe-7s-help1"></i>
            <p>Help</p>
          </Link> */}
        </li>
      </ul>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(StaffNav);