import React from 'react';
import { connect } from 'react-redux';
import { toggleMobileNavVisibility } from '../../reducers/Layout';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
const Header = ({
  showMobileMenu,
  toggleMobileNavVisibility,
  history
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
          <NavItem><span className="btn btn-sm btn-fill btn-warning">{CURRENT_USER.branch.branchName+" - "+CURRENT_USER.branch.id}</span></NavItem>
          <NavItem><span className="btn btn-sm btn-fill btn-success">{CURRENT_USER.staffType.staffType}</span></NavItem>
          <NavItem onClick={e=>{e.preventDefault(); localStorage.clear(); history.push("/")}}>Log out</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

const mapDispatchToProp = dispatch => ({
  toggleMobileNavVisibility: () => dispatch(toggleMobileNavVisibility())
});

export default connect(null, mapDispatchToProp)(Header);