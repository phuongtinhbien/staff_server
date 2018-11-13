import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const BigTable = ({allWash,washer}) => (
  <div className="card">
    <div className="header text-center">
      <h4 className="title">Kết quả phân công</h4>
      <p className="category">Kết quả tự động lưu vào hệ thống</p>
      <br />
    </div>
    {washer.length>0 && washer.map((washerItem,i) =>(
 <div className="content table-responsive table-full-width">
 <Link className ="btn btn-success" to={"assign-work/assignWorkDetail/"+washerItem.washerCode}>{washerItem.washerCode} </Link>
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
     {allWash.length>0? allWash.filter(value => value.washerCode === washerItem.washerCode ).map((item, index) =>(
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
         <td>{item.status}</td>
       </tr>

     )
     ):
    <tr ><td colSpan="15" className="text-center" >Không có dữ liệu</td></tr>
     }
   </tbody>
 </table>
</div>
    ))}
   
  </div>
);

export default withRouter(BigTable);