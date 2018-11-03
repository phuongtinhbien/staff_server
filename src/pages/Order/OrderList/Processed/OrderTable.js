import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn,ClearSearchButton} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import generateData from './generateData';

class OrderTable extends Component {

  state = {
    column: [],
    tableName: this.props.tableName,
    tableDesc: this.props.tableDesc,
    data: this.props.orderList
  };

    handleDeleteButtonClick = (rowKeys,onClick) => {
      if (rowKeys != null)
          onClick();
      else{
        alert('Please choose at least one');
      }
      console.log('This is my custom function for DeleteButton click event');
      
    }

    createCustomDeleteButton = (rowKeys,onClick) => {
      return (
        <button type="button" className="btn btn-warning btn-fill btn-wd" 
        onClick={ (rowKeys,onClick) => this.handleDeleteButtonClick(rowKeys, onClick)}>
        <span className="btn-label">
          <i className="pe-7s-close-circle"></i> &nbsp;
          Decline
        </span> 
      </button>
      );
    }

    handleClearButtonClick = (onClick) => {
      console.log('This is my custom function for ClearSearchButton click event');
      onClick();
    }

    createCustomInsertButton = (openModal) => {
      return (
        <button type="button" className="btn btn-primary btn-fill btn-wd" onClick={ openModal }>
        <span className="btn-label">
          <i className="pe-7s-plus"></i> &nbsp;
          Approve
        </span> 
      </button>
        
      );
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
    const { orderList } = this.props;
    const tableName = this.state.tableName;
    const tableDesc = this.state.tableDesc;
    console.log(orderList);
    
    function buttonFormatter(cell, row){
      return (<Link style={{width:"75%"}}  className='btn btn-primary btn-sm btn-fill btn-linkedin' to={`/order/order-list/view/${row.nodeId}`}
      >{cell}</Link>);
    };
    function button1Formatter(cell, row){
      return (<Link style={{width:"75%"}} className='btn btn-primary btn-sm btn-fill btn-linkedin' to={`/order/order-list/view/${row.nodeId}`}
      >Approve</Link>);
    };

    function pickUpFormatter (cell,row){
      return (
        <span> <b>{row.pickUpDate}</b> <br/>
              {row.pickUpTime }
        </span>
      );
    }
    function onAfterDeleteRow(rowKeys) {
      alert('The rowkey you drop: ' + rowKeys);
    };
    function deliveryFormatter (cell,row){
      return (
        <span><b>{row.deliveryDate}</b> <br/>
              {row.deliveryTime }
        </span>
          

      );
    }

    const selectRowProp = {
      mode: 'checkbox',
    };
    const options = {
      sizePerPage: 10,
      prePage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      
      hideSizePerPage: true,
      clearSearch: true,
      afterDeleteRow: onAfterDeleteRow,
      deleteBtn: this.createCustomDeleteButton,
      insertBtn: this.createCustomInsertButton,
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
                  data={orderList}
                  bordered={false}
                  striped
                
                  search={ true } multiColumnSearch={ true }
                 selectRow={ selectRowProp }
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
                    isKey
                    hidden
                   >
                    ID
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='branch'
                    width="20%"
                    dataSort>
                    Branch
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='customerName'
                    width="25%"
                    
                    dataFormat={buttonFormatter}
                    dataSort>
                    Customer
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='pickUpDate'
                    width="25%"
                    hidden
                    dataSort>
                    Pick up date
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='pickupTime'
                    width="25%"
                    dataFormat={pickUpFormatter}
                    dataSort>
                    Pick up time
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='deliveryDate'
                    width="25%"
                    hidden
                    dataSort>
                    Delivery date
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='deliveryTime'
                    width="25%"
                    dataFormat={deliveryFormatter}
                    dataSort>
                    Delivery time
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='amount'
                    width="25%"
                    >
                    Amount
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField=''
                    width="15%"
                    dataFormat={button1Formatter}
                    >
                    Action
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
export default OrderTable;