import gql from "graphql-tag";
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { BootstrapTable, ClearSearchButton, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Link } from 'react-router-dom';


const CURR_USER = gql `query{
  currentUser{
    id
    userType
    lastName

  }
}`;


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
      let currUser;
      return (
        <Query query={CURR_USER}>
        {({loading, error,data, refetch}) => {
          if (loading) return null;
          if (data){
              currUser =  data.currentUser.id;
              return null;
          }
          return null;
        }
        }

        {/* <Mutation
                  mutation={UPDATE_ORDER_MUT}
                  update={(cache, { data: { updatestatuscustomerorder } }) => {
                    const { customerOrder } = cache.readQuery({ query: ORDER_DETAIL });
                    
                    cache.writeQuery({
                      query: ORDER_DETAIL,
                      variables:{nodeId:match.params.nodeId },
                      data: { customerOrder: customerOrder.concat(updatestatuscustomerorder) }

                    });
                  }}
                >
                  {updatestatuscustomerorder => (
                    <div className="col-md-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-fill btn-info"
                        disabled={!(data.customerOrder.status ==="PENDING")}
                        className={!(data.customerOrder.status ==="PENDING")? "btn btn-fill btn-info hidden": "btn btn-fill btn-info"}
                        onClick={e => {
                          e.preventDefault();
                          this.setState({approve: true, decline: false});
                          updatestatuscustomerorder({variables:{coId: data.customerOrder.id, pStatus:"APPROVED", pUser: currUser}});
                        }}
                      >
                      <i className="pe-7s-plus"></i> &nbsp;
                        Approve
                      </button>
                      </div>
                  )}
          </Mutation> */}

        </Query>
        
        
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
    function amountFormat(cell, row){
      return cell;
    }
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
                    isKey
                    hidden
                   >
                    ID
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='branch'
                    width="20%"
                    hidden
                    dataSort>
                    Chi nhánh
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='customerName'
                    width="25%"
                    
                    dataFormat={buttonFormatter}
                    dataSort>
                    Khách hàng
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='pickUpDate'
                    width="25%"
                    hidden
                    dataSort>
                   Ngày lấy đồ
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='pickupTime'
                    width="25%"
                    dataFormat={pickUpFormatter}
                    dataSort>
                    Thời gian lấy đồ
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='deliveryDate'
                    width="25%"
                    hidden
                    dataSort>
                   Ngày trả đồ
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='deliveryTime'
                    width="25%"
                    dataFormat={deliveryFormatter}
                    dataSort>
                   Thời gian trả đồ
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='amount'
                    width="25%"
                    dataFormat={amountFormat}
                    >
                    Số lượng
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