import React from 'react';
import { Route,Switch } from 'react-router-dom';
import OrderList from './OrderList';
import Reciepts from './RecieptList';
import CreateOrder from './CreateOrder';
import AssignWork from './AssignWork';
import Assign from './AssignWork/Assign';
const Orders = ({match}) => (
    <div className="content">
       <Route path={`${match.url}/reciept-list`} component={Reciepts} />
        
        <Route   path={`${match.url}/order-list`} component={OrderList} />
        <Route  path={`${match.url}/create-order`} component={CreateOrder} />
        <Switch>
            <Route exact path={`${match.url}/assign-work`} component={AssignWork} /> 
            <Route   path={`${match.url}/assign-work/assign/:nodeId`} component={Assign} /> 
        </Switch>
        

    </div>
    
);

export default Orders;