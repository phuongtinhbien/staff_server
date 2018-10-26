import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="container-fluid">
      <nav className="pull-left">
        <ul>
          <li>
            <a href="#">
              Home
                  </a>
          </li>
          <li>
            <a href="#">
              Data Management
                  </a>
          </li>
          <li>
            <a href="#">
              Account
                  </a>
          </li>
          <li>
            <a href="#">
              Help
                  </a>
          </li>
        </ul>
      </nav>
      {/* <p className="copyright pull-right">
        © 2017 <a href="http://jslancer.com">JSLancer</a>, made with love for a better web
      </p> */}
    </div>
  </footer>
);

export default Footer;