import React,{ Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import OrderPending from './Pending';
import OrderProccessing  from './Proccessing';
import OrderProcessed from './Processed';
import OrderFinish from './Finish';
import ViewOrderDetail from './OrderDetail';
import OrderDeclined from './Declined';


const OrderList = ({match}) => (

    <div className="content">
    <Switch>
        <Route  path={`${match.url}/pending`} component={OrderPending} />
        <Route  path={`${match.url}/processing`} component={OrderProccessing} />
        <Route  path={`${match.url}/processed`} component={OrderProcessed} />
        <Route  path={`${match.url}/finish`} component={OrderFinish} />
        <Route  path={`${match.url}/declined`} component={OrderDeclined} />
        <Route  path={`${match.url}/view/:nodeId`} component={ViewOrderDetail} />
      
    </Switch>
      
    </div>
);

export default OrderList;