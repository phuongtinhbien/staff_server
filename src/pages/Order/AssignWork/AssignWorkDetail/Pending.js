import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import status from '../../status';
const BigTable = ({allWash,washer}) => (
  <div className="card">
    <div className="header text-center">
      <h4 className="title">Danh sách đơn hàng chờ</h4>
      <p className="category"></p>
      <br />
    </div>
 <div className="content table-responsive table-full-width">
 <table className="table table-striped hover">
   <thead>
     <tr><th className="sn">STT</th>
       <th className="text-left ">Máy giặt</th>
       <th className="text-left">Đơn hàng</th>
       <th className="text-left ">Biên nhận</th>
       <th className="text-left ">Túi giặt</th>
       <th className="text-left">Status</th>
     </tr>
   </thead>
   <tbody>
     {allWash.filter(value => value.washerCode === washer && value.status === 'PENDING_SERVING' ).length>0? allWash.filter(value => value.washerCode === washer && value.status === 'PENDING_SERVING' ).sort(function(a, b) {
  if (a.sn > b.sn) {
    return 1;
  }
  if (a.sn < b.sn) {
    return -1;
  }
  return 0;
}).map((item, index) =>(
       <tr key={index}>
         <td>{index+1}</td>
         <td>{item.washerCode} - <span rel="tooltip"
                 className="btn btn-danger btn-fill btn-xs"
                >
                   {item.sn}
               </span></td>
         <td><span rel="tooltip"
                 className="btn btn-success btn-fill btn-sm"
                 data-original-title="View Profile"
                 // to={"/order/assign-work/assigntoWash/"}
                >
                   <strong>{item.customerName} &nbsp; - &nbsp;{item.orderId}</strong>
               </span></td>
         <td><span rel="tooltip"
                 className="btn btn-warning btn-fill btn-sm"
                 data-original-title="View Profile"
                 // to={"/order/assign-work/assigntoWash/"}
                >
                   {item.receiptId}
               </span> {item.washbag}</td>
               <td>{item.wbName.length>0 && item.wbName.map((item, index)=>(
                   <li key= {index}> {item}</li>
               ))}</td>
         <td>{status(item.status)}</td>
       </tr>

     )
     ):
    <tr ><td colSpan="15" className="text-center" >Không có dữ liệu</td></tr>
     }
   </tbody>
 </table>
</div>
   
  </div>
);

export default withRouter(BigTable);