import React, { Component } from 'react';
import { BootstrapTable, ClearSearchButton, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class OrderDetailTable extends Component {

  state = {
    column: [],
  };

    createCustomDeleteButton = (onClick) => {
      return (
        <button type="button" className="btn btn-danger btn-fill btn-wd" 
        onClick={ e => this.handleDeleteButtonClick(onClick)}>
        <span className="btn-label">
          <i className="pe-7s-close-circle"></i> &nbsp;
          Cancel
        </span> 
      </button>
      );
    }
    handleClearButtonClick = (onClick) => {
      console.log('This is my custom function for ClearSearchButton click event');
      onClick();
    }

    createCustomClearButton = (onClick) => {
      return (
        <ClearSearchButton
          btnText='Xóa'
          btnContextual='btn-warning btn-fill'
          onClick={ e => this.handleClearButtonClick(onClick) }/>
      );
    }
  
  render() {
    const { orderDetailList,promotion } = this.props;
    console.log(orderDetailList);
 
    function checkNull (cell, row){
        if (cell){
            return cell;
        }
        else {
            return "-";
        }
    }

    function detailsFormatter(cell, row){
        return row.details;
    }
    function currencyFormatter (cell, row){
      let amountMoney = 0;
      // if (row.unit === 'Cái')
        amountMoney = row.receivedAmount*row.unitPrice;
      return (
          <span>
         {amountMoney.toLocaleString('vi-VI', { style: 'currency', currency: 'VND' })}
         </span>
      );
  }
    const footerData = [
      [
        {
          label: 'Tổng tiền',
          columnIndex: 3
        },
        {
          label: 'Total value',
          columnIndex: 7,
          align: 'right',
        
          formatter: (tableData) => {
            let label = 0;
            let serviceName = {};
            for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
              if (!serviceName[tableData[i].serviceName] && tableData[i].unit === "Kg"){
                  label += tableData[i].unitPrice*tableData[i].receivedAmount;
                  serviceName[tableData[i].serviceName] = tableData[i].serviceName;
              }
              else if ( tableData[i].unit !== "Kg"){
                label += tableData[i].unitPrice*tableData[i].receivedAmount;
              }
            
            }
            return (
              <strong>{ label.toLocaleString('vi-VI', { style: 'currency', currency: 'VND' }) }</strong>
            );
          }
        }
      ],
      [
        {
          label: 'Khuyến mãi',
          columnIndex: 3
        },
        {
          label: 'Total value',
          columnIndex: 7,
          align: 'right',
        
          formatter: (tableData) => {
            let label = 0;
            let code = '';
            let sale = 0;
            if (promotion){
                code = promotion.promotionCode;
                sale = promotion.sale
            }
           
            return (
              <span>{ code + " - "}{sale} %</span>
            );
          }
        }
      ],
      [
        {
          label: 'Tổng cộng',
          columnIndex: 3
        },
        {
          label: 'Total value',
          columnIndex: 7,
          align: 'right',
        
          formatter: (tableData) => {
            let code = '';
            let sale = 0;
            let label = 0;
            let serviceName = {};
            for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
              if (!serviceName[tableData[i].serviceName] && tableData[i].unit === "Kg"){
                  let subList = tableData.filter(value => value.serviceName === tableData[i].serviceName && tableData[i].unit === "Kg");
                  label += tableData[i].unitPrice*tableData[i].receivedAmount;
                  serviceName[tableData[i].serviceName] = tableData[i].serviceName;
              }
              else if ( tableData[i].unit !== "Kg"){
                label += tableData[i].unitPrice*tableData[i].receivedAmount;
              }
            
            }
            if (promotion){
                code = promotion.promotionCode;
                sale = promotion.sale;
                label = label - label*sale/100;
            }
           
            return (
              <strong>{ label.toLocaleString('vi-VI', { style: 'currency', currency: 'VND' }) }</strong>
            );
          }
        }
      ]
    ];



    const options = {
      sizePerPage: 10,
      prePage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      hideSizePerPage: true,
      noDataText: "Không có dữ liệu",
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton,
    };

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
                <BootstrapTable
                  data={orderDetailList}
                  bordered={false}
                  striped
                  footer={true}
                  searchPlaceholder="Tìm kiếm"
                  footerData={ footerData }
                  search={ true } multiColumnSearch={ true }
                  pagination={true}
                  options={options}>
                  <TableHeaderColumn
                    dataField='sn'
                    width="10%"
                   >
                    STT
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='nodeId'
                    width="7%"
                    hidden
                   >
                    ID
                  </TableHeaderColumn>
                  
                  <TableHeaderColumn
                    dataField='serviceName'
                    width="25%"
                    isKey
                    dataSort>
                    Dịch vụ
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='productName'
                    width="20%"
                    dataSort>
                    Quần áo
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='amount'
                    width="15%"
                    tdStyle={{textAlign:"right"}}
                    dataSort>
                    SL/KL
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='unit'
                    width="10%"
                    tdStyle={{textAlign:"right"}}
                    dataFormat={checkNull}
                    dataSort>
                    ĐVT
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='receivedAmount'
                    width="25%"
                    tdStyle={{textAlign:"right"}}
                    dataSort>
                    SL đã nhận
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='total'
                    width="27%"
                    tdStyle={{textAlign:"right"}}
                    dataFormat={currencyFormatter}
                    dataSort>
                    Tổng tạm
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='deliveryAmount'
                    width="25%"
                    tdStyle={{textAlign:"right"}}
                    dataSort>
                    SL đã trả
                  </TableHeaderColumn>
                 
                  <TableHeaderColumn
                    dataField='details'
                    width="25%"
                    dataFormat={detailsFormatter}
                    dataSort>
                    Chi tiết thêm
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </div>

    );
  }
}
export default OrderDetailTable;