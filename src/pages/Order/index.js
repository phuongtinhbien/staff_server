import React from 'react';
import { Route,Switch } from 'react-router-dom';
import OrderList from './OrderList';
import Reciepts from './RecieptList';

const Orders = ({match}) => (
    <div className="content">
       <Route path={`${match.url}/reciept-list`} component={Reciepts} />
        
        <Route   path={`${match.url}/order-list`} component={OrderList} />
    </div>
    
);

export default Orders;