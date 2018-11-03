import React,{ Fragment } from 'react';
import { Route } from 'react-router-dom';
import ReceiptPending from './Pending';
import ReceiptDetail from './ReceiptDetail';
import ReceiptReceived from './Received';
import ReceiptPendingDelivery from './PendingDelivery';
import ReceiptDeliveried from './Deliveried';
import ReceiptUpdate from './UpdateReceipt';

const Reciepts = ({match}) => (

    <div className="content">
        <Route path={`${match.url}/pending`} component={ReceiptPending} />
        <Route path={`${match.url}/processing`} component={ReceiptReceived} />
        <Route path={`${match.url}/delivery`} component={ReceiptPendingDelivery} />
        <Route path={`${match.url}/deliveried`} component={ReceiptDeliveried} />
        <Route  path={`${match.url}/view/:nodeId`} component={ReceiptDetail} />
        <Route  path={`${match.url}/edit/:nodeId`} component={ReceiptUpdate} />
    </div>
);

export default Reciepts;