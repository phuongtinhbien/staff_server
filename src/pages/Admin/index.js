import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Washer from './Washer';
import Other from './Other';
import Branch from './Branch';
import Service from './Service';
import Promotion from './Promotion';
import Account from './Account';
import Cloth from './ClothCategory';
import CreateBranch from './CreateNewBranch';
import CreateStaff from './Account/CreateStaff';
import EditBranch from './Branch/EditBranch';
import CreateCloth from './ClothCategory/CreateCloth';
import UnitPrice from './Price';
import CreateUnitPrice from './Price/CreateCloth';
const Admin = ({match}) => (
    <div className="content">
    
        <Route  path={`${match.url}/washer`} component={Washer} />
        <Route  path={`${match.url}/other`} component={Other} />
        <Route  path={`${match.url}/branch`} component={Branch} />
        <Route  path={`${match.url}/service`} component={Service} />
        <Route  path={`${match.url}/promotion`} component={Promotion} />
        <Route exact path={`${match.url}/account`} component={Account} />
        <Route exact path={`${match.url}/cloth`} component={Cloth} />
        <Route  path={`${match.url}/new`} component={CreateBranch} />
        <Route  path={`${match.url}/createStaff`} component={CreateStaff} />
        <Route  path={`${match.url}/cloth/createCloth`} component={CreateCloth} />
        <Switch>
        <Route  path={`${match.url}/price/createUnitPrice`} component={CreateUnitPrice} />
        <Route exact path={`${match.url}/price`} component={UnitPrice} />
        </Switch>
        <Route  path={`${match.url}/editBranch/:nodeId`} component={EditBranch} />
    </div>
    
);

export default Admin;