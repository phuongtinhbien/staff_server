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
    const { orderList } = this.props;
    const tableName = this.state.tableName;
    const tableDesc = this.state.tableDesc;
    console.log(orderList);
    
    function buttonFormatter(cell, row){
      return (<Link style={{width:"75%"}}  className='btn btn-primary btn-sm btn-fill btn-linkedin' to={`/order/reciept-list/view/${row.nodeId}`}
      >{cell}</Link>);
    };

    function washerFormat (cell,row){
        return (<span>{row.washerCode} - <span rel="tooltip"
        className="btn btn-danger btn-fill btn-xs"
       >
          {row.sn}
      </span></span>)
    }
    function orderFormat (cell, row){
        return(<span rel="tooltip"
        className="btn btn-success btn-fill btn-sm"
        data-original-title="View Profile"
        // to={"/order/assign-work/assigntoWash/"}
       >
          <RedirectPage type="customer_order" typeId = {row.orderId} content ={row.customerName +" - "+row.orderId}/>
      </span>);
    }  
    function receiptFormat (cell, row){
        return (<span rel="tooltip"
        className="btn btn-warning btn-fill btn-sm"
        data-original-title="View Profile"
        // to={"/order/assign-work/assigntoWash/"}
       >
          <RedirectPage type="receipt" typeId = {row.receiptId} content ={row.receiptId}/>
      </span>)
    }

    function wbFormat (cell, row){
        return (<span>{row.wbName.length>0 && row.wbName.map((item, index)=>(
            <li key= {index}> {item}</li>
        ))}</span>)
    }

    function statusFormat(cell, row){
        return (<span>{status(cell)}</span>)
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
                   >
                    STT
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='washerCode'
                    width="20%"
                    dataFormat={washerFormat}
                    isKey
                 
                   >
                    Máy giặt
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='orderId'
                    width="20%"
                    dataFormat={orderFormat}
                   >
                    Đơn hàng
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='receiptId'
                    width="25%"
                    
                    dataFormat={receiptFormat}
                    dataSort>
                    Biên nhận
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='wbName'
                    width="25%"
                    
                    dataFormat={wbFormat}
                    dataSort>
                    Túi giặt
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='status'
                    width="25%" 
                    dataFormat={statusFormat}
                    dataSort>
                   Trạng thái
                  </TableHeaderColumn>
                  </BootstrapTable>

    );
  }
}
export default TableDetail;