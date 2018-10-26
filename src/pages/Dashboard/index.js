import React from 'react';
import EmailChart from './EmailChart';
import SalesChart from './SalesChart';
import UserBehaviorChart from './UserBehaviorChart';
import Tasks from './Tasks';
import Notification from './Notification';

const Dashboard = () => (
  <div className="content">
    <div className="container-fluid">
      <div className="row">
      <div className="col-md-6">
        <Notification />
      </div>
        <div className="col-md-6">
          <Tasks />
        </div>
      </div>

    </div>
  </div>
);

export default Dashboard;