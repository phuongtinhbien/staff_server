import React from 'react';
import { Route } from 'react-router-dom';
import Washer from './Washer';
import Other from './Other';
import Branch from './Branch';
import Service from './Service';
import Promotion from './Promotion';
import Account from './Account';
import Cloth from './ClothCategory';
import CreateBranch from './CreateNewBranch';
const Admin = ({match}) => (
    <div className="content">
    
        <Route  path={`${match.url}/washer`} component={Washer} />
        <Route  path={`${match.url}/other`} component={Other} />
        <Route  path={`${match.url}/branch`} component={Branch} />
        <Route  path={`${match.url}/service`} component={Service} />
        <Route  path={`${match.url}/promotion`} component={Promotion} />
        <Route  path={`${match.url}/account`} component={Account} />
        <Route  path={`${match.url}/cloth`} component={Cloth} />
        <Route  path={`${match.url}/new`} component={CreateBranch} />
    </div>
    
);

export default Admin;