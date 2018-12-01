import React, { Component } from 'react';
import { BootstrapTable, ClearSearchButton, TableHeaderColumn,InsertModalHeader, InsertModalFooter } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Link } from 'react-router-dom';
import Switch from 'components/Switch';
import gql from 'graphql-tag';
import status from '../status';
import { Mutation } from 'react-apollo';
import NotificationSystem from 'react-notification-system';

import assign from '../AssignWork/AssignToWash/assign';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
require('dotenv').config();
const UPDATE_WASHER_STATUS = gql `mutation updateStatusWasher($brId: BigFloat!, $id: BigFloat!, $status: String!, $currUser: BigFloat!) {
  updateWashingMachineById(input: {id: $id, washingMachinePatch: {status: $status, updateBy: $currUser}}) {
    washingMachine {
      nodeId
      id
      washerCode
      status
    }
  }
  updateServingWash(input: {brId: $brId, washerId: $id, currUser: $currUser}) {
    washingMachine {
      nodeId
      id
      washerCode
      status
    }
  }
}
`;




let client = new ApolloClient({
  uri: 'http://192.168.1.6:5000/graphql',
  headers: {
    authorization: "BEARER " + localStorage.getItem("luandryStaffPage.staff_key"),
  },
  cache: new InMemoryCache(),

});

const ADD_WASHER = gql`
mutation addWasher ($washerCode: String!, $status: String!,
  $currUser: BigFloat!, $branch: BigFloat!){
  createWashingMachine(input:{
    washingMachine:{
      washerCode: $washerCode,
      status: $status
      branchId: $branch,
      createBy:$currUser
    }
  }){
    washingMachine{
      id
      nodeId
      status
      washerCode
    }
  }
}
`;


class TableDetail extends Component {

  state = {
    column: [],
    tableName: "Máy giặt của chi nhánh",
    tableDesc: "Quản lí trạng thái máy giặt. Thay đổi khi có vấn đề với máy giặt",
    data: this.props.orderList
  };

  
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

    createCustomInsertButton = (openModal) => {
      return (
      <button type="button" className="btn btn-primary btn-fill btn-wd" onClick={e=> {openModal()}} >
          <span className="btn-label">
            <i className="pe-7s-plus"></i> &nbsp;
            Thêm máy giặt
          </span> 
      </button>
        
      );
    }

    handleModalClose(closeModal) {
      // Custom your onCloseModal event here,
      // it's not necessary to implement this function if you have no any process before modal close
      console.log('This is my custom function for modal close event');
      closeModal();
    }
    

    createCustomModalHeader = (closeModal, save) => {
      return (
        <InsertModalHeader
          className='my-custom-class'
          title='Thêm máy giặt'
          beforeClose={ this.beforeClose }
          onModalClose={ () => this.handleModalClose(closeModal) }/>
          // hideClose={ true } to hide the close button
      );
    }

    createCustomModalFooter = (closeModal, save) => {
      return (
        <InsertModalFooter
          className='my-custom-class'
          saveBtnText='Lưu lại'
          closeBtnText='Hủy'
          closeBtnContextual='btn-warning'
          saveBtnContextual='btn-success'
          closeBtnClass='btn-fill'
          saveBtnClass='btn-fill'
         
         />
      );
    }
    
  
  render() {
    const { data } = this.props;
    const tableName = this.state.tableName;
    const tableDesc = this.state.tableDesc;
    let notificationSystem = this.notificationSystem;
    let CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));

    function washerFormat (cell,row){
        return (<Link rel="tooltip"
        className="btn btn-success btn-fill btn-sm btn-xs"
        data-original-title="View Profile" to={"assign-work/assignWorkDetail/"+row.washerCode}><strong>{row.washerCode}</strong> </Link>)
    }

    function showNotification(message, level) {
      notificationSystem.addNotification({
        message: message,
        level: level,
        autoDismiss: 1,
        position: "tc"
      });
    }


    function onAfterInsertRow(row) {
      let newRowStr = '';
      console.log(row);
      if (row)
      client.mutate({mutation: ADD_WASHER,
        variables:{washerCode: row['washerCode'],currUser: CURRENT_USER.id, status: row['status'],
         branch: CURRENT_USER.branch.id}}).then(
          data => {
            console.log(data)
              if (data){
              showNotification("Thêm thành công " + data.data.createWashingMachine.washingMachine.washerCode, "success") ;
              }
          }
        ).catch(
          error=>{
            console.log(error.message)
            showNotification("Thêm bị lỗi ", "error") ;
          }
        )
      
    }
   
    

   function toolFormat (cell, row){
     return (
      <Mutation
      mutation={UPDATE_WASHER_STATUS}
      onCompleted={data=> {
        
        assign(CURRENT_USER.branch.id, CURRENT_USER.id);
        showNotification("Cập nhật thành công " + data.updateWashingMachineById.washingMachine.washerCode, "success") ;
        
        showNotification("Phân công xử lí đã thay đổi với " + data.updateWashingMachineById.washingMachine.washerCode, "info") ;
       }}
      onError={error => showNotification(error.message, "error")}
    >
    {
      (updateStatusWasher) =>(
      <div>

        <Switch value={row.status==="ACTIVE"?true: false}   onChange={() => {updateStatusWasher({variables:{brId: CURRENT_USER.branch.id, id:row.id,currUser: CURRENT_USER.id, status: row.status ==="ACTIVE"?"INACTIVE":"ACTIVE" }});
       }} />
        
      </div>
      )
    }

</Mutation>
     )
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
      afterInsertRow: onAfterInsertRow,
      clearSearchBtn: this.createCustomClearButton,
      insertBtn: this.createCustomInsertButton,
      insertModalHeader: this.createCustomModalHeader,
      insertModalFooter: this.createCustomModalFooter
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
              <NotificationSystem
                  ref={ref => this.notificationSystem = ref} />
                <BootstrapTable
                  data={data}
                  bordered={false}
                  striped
                  insertRow={CURRENT_USER.staffType.staffCode==="STAFF_01"}
                
                  search={ true } multiColumnSearch={ true }
                  searchPlaceholder="Tìm kiếm"
                  pagination={true}
                  options={options}>

                  <TableHeaderColumn
                    dataField='sn'
                    width="10%"
                    dataFormat={indexN}
                    hiddenOnInsert
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
                    dataField='status'
                    width="25%" 
                    dataFormat={statusFormat}
                    editable={ { type: 'checkbox', label:"Hoạt động", options: { values: 'ACTIVE:INACTIVE' } } }
                    dataSort>
                   Trạng thái
                  </TableHeaderColumn>
                  {(CURRENT_USER.staffType.staffCode === "STAFF_01" ||CURRENT_USER.staffType.staffCode === "STAFF_02") && 
                  <TableHeaderColumn
                  dataField=''
                  width="25%" 
                  dataFormat={toolFormat}
                  dataSort>
                 Chức năng
                </TableHeaderColumn>
                }
                  
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