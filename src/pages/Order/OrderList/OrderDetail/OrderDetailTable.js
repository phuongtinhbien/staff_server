import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn,ClearSearchButton} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ReactCurrencyFormatter from 'react-currency-formatter';

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
        amountMoney = row.amount*row.unitPrice;
        return (
            <p>
           {amountMoney.toLocaleString('vi-VI', { style: 'currency', currency: 'VND' })}
            </p>
        );
    }

    const footerData = [
      [
        {
          label: 'Total',
          columnIndex: 3
        },
        {
          label: 'Total value',
          columnIndex: 7,
          align: 'right',
        
          formatter: (tableData) => {
            let label = 0;
            for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
              label += tableData[i].unitPrice*tableData[i].amount;
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
                  footerData={ footerData }
                  search={ true } multiColumnSearch={ true }
                  pagination={true}
                  options={options}>
                  <TableHeaderColumn
                    dataField='sn'
                    width="7%"
                   >
                    S/N
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
                    Product
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='serviceName'
                    width="25%"
                    isKey
                    dataSort>
                    Service name
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='amount'
                    width="15%"
                    dataSort>
                    Amount
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='unit'
                    width="10%"
                    dataFormat={checkNull}
                    dataSort>
                    Unit
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='unitPrice'
                    width="25%"
                    dataSort>
                    Unit price
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    dataField='total'
                    width="25%"
                    dataFormat={currencyFormatter}
                    dataSort>
                    Total
                  </TableHeaderColumn>
                 
                  <TableHeaderColumn
                    dataField='details'
                    width="25%"
                    dataFormat={detailsFormatter}
                    dataSort>
                    Details
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </div>

    );
  }
}
export default OrderDetailTable;