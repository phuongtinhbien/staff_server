import React,{ Fragment } from 'react';
import { Route } from 'react-router-dom';
import ReceiptPending from './Pending';
import ReceiptDetail from './ReceiptDetail';
import ReceiptReceived from './Received';
import ReceiptPendingDelivery from './PendingDelivery';
import ReceiptDeliveried from './Deliveried'

const Reciepts = ({match}) => (

    <div className="content">
        <Route path={`${match.url}/pending`} component={ReceiptPending} />
        <Route path={`${match.url}/processing`} component={ReceiptReceived} />
        <Route path={`${match.url}/delivery`} component={ReceiptPendingDelivery} />
        <Route path={`${match.url}/deliveried`} component={ReceiptDeliveried} />
        <Route  path={`${match.url}/view/:nodeId`} component={ReceiptDetail} />
    </div>
);

export default Reciepts;