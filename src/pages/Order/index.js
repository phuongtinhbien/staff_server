import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AssignWork from './AssignWork';
import Assign from './AssignWork/Assign';
import AssignToWash from './AssignWork/AssignToWash';
import CreateOrder from './CreateOrder';
import OrderList from './OrderList';
import Reciepts from './RecieptList';
import AssignWorkDetail from './AssignWork/AssignWorkDetail';
import StaffTask from './StaffTask';
import Bill  from './Bill';
const Orders = ({match}) => (
    <div className="content">
       <Route path={`${match.url}/reciept-list`} component={Reciepts} />
        
        <Route   path={`${match.url}/order-list`} component={OrderList} />
        <Route  path={`${match.url}/create-order`} component={CreateOrder} />
        <Route  path={`${match.url}/staff-task`} component={StaffTask} />
        <Route  path={`${match.url}/bill:nodeId`} component={Bill} />
        <Switch>
            <Route exact path={`${match.url}/assign-work`} component={AssignWork} /> 
            <Route   path={`${match.url}/assign-work/assign/:nodeId`} component={Assign} /> 
            <Route   path={`${match.url}/assign-work/assigntoWash/:nodeId`} component={AssignToWash} /> 
            <Route   path={`${match.url}/assign-work/assignWorkDetail/:washerCode`} component={AssignWorkDetail} /> 
        </Switch>
        

    </div>
    
);

export default Orders;