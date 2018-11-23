import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import status from '../status';
import RedirectPage from './Redirect';
import TableDetaail from './TableDetail';
const BigTable = ({allWash,washer}) => (
  <div className="card">
    <div className="header text-center">
      <h4 className="title">Kết quả phân công</h4>
      <p className="category">Kết quả tự động lưu vào hệ thống</p>
      <br />
    </div>
    {washer.length>0 ? washer.map((washerItem,i) =>(
 <div className="content table-responsive table-full-width">
 <Link className ="btn btn-success" to={"assign-work/assignWorkDetail/"+washerItem.washerCode}>{washerItem.washerCode} </Link>
 <TableDetaail orderList={allWash.filter(value => value.washerCode === washerItem.washerCode ).length>0 && allWash.sort(function(a, b) {
  if (a.sn > b.sn) {
    return 1;
  }
  if (a.sn < b.sn) {
    return -1;
  }
  return 0;
}).filter(value => value.washerCode === washerItem.washerCode )} />
 {/* <table className="table table-striped hover">
   <thead>
     <tr><th className="sn">STT</th>
       <th className="text-left ">Máy giặt</th>
       <th className="text-left">Đơn hàng</th>
       <th className="text-left ">Biên nhận</th>
       <th className="text-left ">Túi giặt</th>
       <th className="text-left">Trạng thái</th>
     </tr>
   </thead>
   <tbody>
     {allWash.filter(value => value.washerCode === washerItem.washerCode ).length>0? allWash.sort(function(a, b) {
  if (a.sn > b.sn) {
    return 1;
  }
  if (a.sn < b.sn) {
    return -1;
  }
  return 0;
}).filter(value => value.washerCode === washerItem.washerCode ).map((item, index) =>(
       <tr key={index+1}>
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
                   <RedirectPage type="customer_order" typeId = {item.orderId} content ={item.customerName +" - "+item.orderId}/>
               </span></td>
         <td><span rel="tooltip"
                 className="btn btn-warning btn-fill btn-sm"
                 data-original-title="View Profile"
                 // to={"/order/assign-work/assigntoWash/"}
                >
                   <RedirectPage type="receipt" typeId = {item.receiptId} content ={item.receiptId}/>
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
 </table> */}
</div>
    )):<div className="text-center mb-2"> <span  className="error" style={{color:"red",fontSize:12, fontWeight:"normal"}} >Không có dữ liệu máy giặt </span></div>}
   
  </div>
);

export default withRouter(BigTable);