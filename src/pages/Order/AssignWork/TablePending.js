import React, { Component } from 'react';
import { BootstrapTable, ClearSearchButton, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Link } from 'react-router-dom';
import RedirectPage from './Redirect';
import status from '../status';
class TableDetail extends Component {

  state = {
    column: [],
    tableName: this.props.tableName,
    tableDesc: this.props.tableDesc,
    data: this.props.orderList
  };


    createCustomClearButton = (onClick) => {
      return (
        <ClearSearchButton
          btnText='Xóa'
          btnContextual='btn-warning btn-fill'
          onClick={ e => this.handleClearButtonClick(onClick) }/>
      );
    }
  
  render() {
    const { orderList,noWasher } = this.props;
    const tableName = this.state.tableName;
    const tableDesc = this.state.tableDesc;
    console.log(orderList);
    
    function buttonFormatter(cell, row){
      return (<Link style={{width:"75%"}}  className='btn btn-primary btn-sm btn-fill btn-linkedin' to={`/order/reciept-list/view/${row.nodeId}`}
      >{cell}</Link>);
    };

    function customerFormat (cell,row){
        return (<span>{row.customerName +" - " +row.customerOrderId}
      </span>)
    }
    function timeFormat (cell, row){
        return(<span 
       >
         <strong>{row.deliveryDate}</strong> <br>
                  </br>
                  {row.deliveryTimeStart} &nbsp; - &nbsp; {row.deliveryTimeEnd}
      </span>);
    }  
   

    function statusFormat(cell, row){
        return (<span>{!row.isAssignToWash? (row.washbag>0 ? "Đã phân loại": "Chưa phân loại"): "Đã phân công"}</span>)
    }

    function tool (cell, row){
      return (
        <span>
          {row.washbag>0 && (!row.isAssignToWash?
                    <Link rel="tooltip"
                      disabled={!noWasher}
                      className="btn btn-warning btn-simple btn-xs"
                      data-original-title="View Profile"
                      to={"/order/assign-work/assigntoWash/"+ row.nodeId}
                     >
                        Phân công
                    </Link>:<Link rel="tooltip"
                     disabled={!noWasher}
                      className="btn btn-info btn-simple btn-xs"
                      data-original-title="View Profile"
                      to={"/order/assign-work/assigntoWash/"+ row.nodeId}
                     >
                        Phân công lại
                    </Link>
                  )}
          </span>
      )
    }

    function indexN(cell, row, enumObject, index) {
      return (<div>{index+1}</div>) 
  }
    const options = {
      sizePerPage: 5,
      prePage: 'Trước',
      nextPage: 'Tiếp',
      firstPage: 'Đầu tiên',
      lastPage: 'Cuối cùng',
      noDataText: "Không có dữ liệu",
      hideSizePerPage: true,
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton,
    };

    return (
                <BootstrapTable
                  data={orderList}
                  bordered={false}
                  striped
                  pagination={true}
                  options={options}>

                  <TableHeaderColumn
                    dataField='sn'
                    width="10%"
                    dataFormat={indexN}
                   >
                    STT
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='washerCode'
                    width="25%"
                    dataFormat={customerFormat}
                    isKey
                 
                   >
                    Khách hàng
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='orderId'
                    width="25%"
                    dataFormat={timeFormat}
                   >
                   Thời gian trả
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='receiptId'
                    width="25%"
                    
                    dataFormat={statusFormat}
                    dataSort>
                    Trạng thái
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='wbName'
                    width="25%"
                    
                    dataFormat={tool}
                    dataSort>
                    Chức năng
                  </TableHeaderColumn>
                  
                  </BootstrapTable>

    );
  }
}
export default TableDetail;