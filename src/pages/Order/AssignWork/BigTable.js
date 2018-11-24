import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import status from '../status';
import RedirectPage from './Redirect';
import TableDetail from './TableDetail';
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
 <TableDetail orderList={allWash.filter(value => value.washerCode === washerItem.washerCode ).length>0 && allWash.sort(function(a, b) {
  if (a.sn > b.sn) {
    return 1;
  }
  if (a.sn < b.sn) {
    return -1;
  }
  return 0;
}).filter(value => value.washerCode === washerItem.washerCode )} />
 
</div>
    )):<div className="text-center mb-2"> <span  className="error" style={{color:"red",fontSize:12, fontWeight:"normal"}} >Không có dữ liệu máy giặt </span></div>}
   
  </div>
);

export default withRouter(BigTable);