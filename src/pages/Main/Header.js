import React from 'react';
import { connect } from 'react-redux';
import { toggleMobileNavVisibility } from '../../reducers/Layout';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';

const Header = ({
  showMobileMenu,
  toggleMobileNavVisibility,
  history,
  CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"))
}) => (

    <Navbar fluid={true}>

      <Navbar.Collapse>

        {/* <Nav>
          <NavItem><i className="fa fa-dashboard"></i></NavItem>
          <NavDropdown title={<i className="fa fa-globe" />} id="basic-nav-dropdown">
            <MenuItem>Action</MenuItem>
            <MenuItem>Another action</MenuItem>
            <MenuItem>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem>Separated link</MenuItem>
          </NavDropdown>
        </Nav> */}
        <div className="separator"></div>
        <Navbar.Form pullLeft>
        </Navbar.Form>
        <Nav pullRight>
          <NavItem><strong>{CURRENT_USER.branch.branchName+" - "+CURRENT_USER.branch.id}</strong></NavItem>
          <NavItem><strong>{CURRENT_USER.staffType.staffType}</strong></NavItem>
          <NavItem onClick={e=>{e.preventDefault(); localStorage.clear(); history.push("/")}}><i className="pe-7s-back-2"></i> &nbsp;Đăng xuất</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

const mapDispatchToProp = dispatch => ({
  toggleMobileNavVisibility: () => dispatch(toggleMobileNavVisibility())
});

export default connect(null, mapDispatchToProp)(Header);