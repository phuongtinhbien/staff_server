import React, { Component } from 'react';
import { BootstrapTable, ClearSearchButton, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import status from '../../Order/status';
class TableDetail extends Component {

  state = {
    column: [],
    tableName: "Khuyến mãi của hệ thống",
    tableDesc: "Các chương trình khuyến mãi đang chạy",
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
    const { data } = this.props;
    const tableName = this.state.tableName;
    const tableDesc = this.state.tableDesc;
    console.log(data);
    
    function branchFormat(cell, row){
      return (null);
    };

    function washerFormat (cell,row){
        return (<span rel="tooltip"
        className={(row.status === 'INACTIVE'?" btn btn-fill btn-sm btn-xs btn-danger" :" btn btn-fill btn-sm btn-xs btn-success")}
        data-original-title="View Profile" ><strong>{row.washerCode}</strong> </span>)
    }
   

    function statusFormat(cell, row){
        return (<span>{status(cell)}</span>)
    }

    function indexN(cell, row, enumObject, index) {
      return (<div>{index+1}</div>) 
  }

    const options = {
      sizePerPage: 10,
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
<div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="header">
                <h4>{tableName}</h4>
                <p>{tableDesc}</p>
              </div>
              <div className="content">
                <BootstrapTable
                  data={data}
                  bordered={false}
                  striped
                  tableName={tableName}
                  tableDesc ={tableDesc}
                  search={ true } multiColumnSearch={ true }
                  searchPlaceholder="Tìm kiếm"
                  pagination={true}
                  options={options}>

                  <TableHeaderColumn
                    dataField='sn'
                    width="10%"
                    dataFormat={indexN}
                    isKey
                   >
                    STT
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='id'
                    width="10%"
                    dataFormat={indexN}
                    hidden
                   >
                    ID
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='promotionName'
                    width="20%"
                    
                   >
                    Tên CTKM
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='promotionCode'
                    width="20%"
                    
                   >
                    Mã khuyến mãi
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='dateStart'
                    width="20%"
                    
                   >
                    Thời gian BĐ
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='dateEnd'
                    width="20%"
                    
                   >
                    Thời gian KT
                  </TableHeaderColumn>
                  
                  <TableHeaderColumn
                    dataField='status'
                    width="25%" 
                    dataFormat={statusFormat}
                    dataSort>
                   Trạng thái
                  </TableHeaderColumn>
                  </BootstrapTable>
                  </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default TableDetail;