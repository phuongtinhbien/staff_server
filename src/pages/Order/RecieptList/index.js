import React,{ Fragment } from 'react';
import { Route } from 'react-router-dom';
import ReceiptPending from './Pending';
import ListCloth from './Clothes';
import Dryer from './Dryer';
import ReceiptDetail from './ReceiptDetail';

const Reciepts = ({match}) => (

    <div className="content">
        <Route path={`${match.url}/pending`} component={ReceiptPending} />
        <Route path={`${match.url}/processing`} component={ReceiptPending} />
        <Route  path={`${match.url}/view/:nodeId`} component={ReceiptDetail} />
    </div>
);

export default Reciepts;