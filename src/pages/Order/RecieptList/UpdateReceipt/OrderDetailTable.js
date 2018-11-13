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
          btnText='Clear'
          btnContextual='btn-warning btn-fill'
          onClick={ e => this.handleClearButtonClick(onClick) }/>
      );
    }
  
  render() {
    const { orderDetailList } = this.props;
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
        let amountMoney = 654645;
        return (
            <p>
           cell
            </p>
        );
    }



    const options = {
      sizePerPage: 10,
      prePage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      hideSizePerPage: true,
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
                  search={ true } multiColumnSearch={ true }
                  pagination={true}
                  options={options}>
                  <TableHeaderColumn
                    dataField='sn'
                    width="7%"
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
                    dataField='productName'
                    width="20%"
                    dataSort>
                    Quần áo
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='serviceName'
                    width="25%"
                    isKey
                    dataSort>
                    Loại dịch vụ
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='amount'
                    width="15%"
                    dataSort>
                    Số lượng
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='unit'
                    width="10%"
                    dataFormat={checkNull}
                    dataSort>
                    ĐVT
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='receivedAmount'
                    width="25%"
                    dataSort>
                    SL đã nhận
                  </TableHeaderColumn>
                 
                  <TableHeaderColumn
                    dataField='details'
                    width="25%"
                    dataFormat={detailsFormatter}
                    dataSort>
                    Chi tiết
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </div>

    );
  }
}
export default OrderDetailTable;