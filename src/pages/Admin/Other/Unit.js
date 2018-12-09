import React, { Component } from 'react';
import { BootstrapTable, ClearSearchButton, TableHeaderColumn,InsertModalHeader, InsertModalFooter } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Link } from 'react-router-dom';
import Switch from 'components/Switch';
import gql from 'graphql-tag';
import status from '../../Order/status';
import { Mutation } from 'react-apollo';
import NotificationSystem from 'react-notification-system';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
require('dotenv').config();
const UPDATE_WASHER_STATUS = gql `mutation updateOptionList($id: BigFloat!, $status: String!, $currUser: BigFloat!) {
  updateUnitById(input: {id: $id, unitPatch: {status: $status, updateBy: $currUser}}) {
    unit {
      nodeId
      id
      unitName
      status
    }
  }
}

`;




let client = new ApolloClient({
  uri: 'http://laundryserver.eastus.cloudapp.azure.com:5000/graphql',
  headers: {
    authorization: "BEARER " + localStorage.getItem("luandryStaffPage.staff_key"),
  },
  cache: new InMemoryCache(),

});

const ADD_OPTION = gql`
mutation addOption ($keyName: String!, $status: String!,
  $currUser: BigFloat!){
  createUnit (input:{
    unit:{
      unitName: $keyName,
      status: $status,
      createBy: $currUser,
    }
  }){
    unit{
      id
      unitName
      status
    }
  }
}
`;
const optionValue = (val,lab )=>{
  return {value: val,label: lab};
}

const processOption =  (data)=>{
let res=[];
if (data!= null){
  for (let i = 0; i<data.length;i++){
      res.push( data[i].colorGroupName);
  }
}
return res;

}

const DELETE = gql `mutation delete ($id: BigFloat!){
  deleteUnitById(input:{
    id:$id
  }){
    unit{
      nodeId
      unitName
      id
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
            Thêm mới
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
          title='Thêm mới'
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
    
    customConfirm(next, dropRowKeys) {
      const dropRowKeysStr = dropRowKeys.join(',');
      if (window.confirm(`Bạn có chắc muốn xóa ${dropRowKeysStr}?`)) {
        next();
      }
    }
    createCustomDeleteButton = (onClick) => {
      return (
      <button type="button" className="btn btn-danger btn-fill btn-wd" 
            onClick={onClick}>
            <span className="btn-label">
              <i className="pe-7s-close-circle"></i> &nbsp;
              Xóa
            </span> 
         
          </button>
          
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
      client.mutate({mutation: ADD_OPTION,
        variables:{keyName: row.unitName, currUser: CURRENT_USER.currentUser.id, status: row.status }}).then(
          data => {
            console.log(data)
              if (data){
                showNotification("Thêm thành công ", "success") ;
              }
          }
        ).catch(
          error=>{
            console.log(error.message);
            showNotification("Thêm thất bại ", "error") ;
          }
        )
      
    }
   
    



    function statusFormat(cell, row){
        return (<span>{status(cell)}</span>)
    }
    function indexN(cell, row, enumObject, index) {
      return (<div>{index+1}</div>) 
  }

    function colorGroupFormat (cell, row){
      return (<span>{row && row.colorGroupByColorGroupId.colorGroupName}</span>)
    }
    function toolFormat (cell, row){
      return (
       <Mutation
       mutation={UPDATE_WASHER_STATUS}
       onCompleted={data=> {
         
        
         showNotification("Cập nhật thành công ", "success") ;
         
        }}
       onError={error => showNotification(error.message, "error")}
     >
     {
       (updateStatusWasher) =>(
       <div>
 
         <Switch value={row.status==="ACTIVE"?true: false}   onChange={() => {updateStatusWasher({variables:{id:row.id,currUser: CURRENT_USER.currentUser.id, status: row.status ==="ACTIVE"?"INACTIVE":"ACTIVE" }});
        }} />
         
       </div>
       )
     }
 
 </Mutation>
      )
    }
    function onAfterDeleteRow(rowKeys) {
      client.mutate({mutation: DELETE,
        variables:{id: rowKeys}}).then(
          data => {
            console.log(data)
              if (data){
                showNotification("Xóa thành công ", "success") ;
              }
          }
        ).catch(
          error=>{
            console.log(error.message)
            showNotification("Xóa bị lỗi", "error") ;
          }
        )
    }

    const selectRowProp = {
      mode: 'radio'
    }; 

    const options = {
      sizePerPage: 10,
      prePage: 'Trước',
      nextPage: 'Tiếp',
      firstPage: 'Đầu tiên',
      lastPage: 'Cuối cùng',
      noDataText: "Không có dữ liệu",
      hideSizePerPage: true,
      clearSearch: true,
      afterDeleteRow: onAfterDeleteRow,
      afterInsertRow: onAfterInsertRow,
      clearSearchBtn: this.createCustomClearButton,
      insertBtn: this.createCustomInsertButton,
      insertModalHeader: this.createCustomModalHeader,
      insertModalFooter: this.createCustomModalFooter,
      handleConfirmDeleteRow: this.customConfirm,
      deleteBtn: this.createCustomDeleteButton,
    };

    return (

              <div >
              <NotificationSystem
                  ref={ref => this.notificationSystem = ref} />
                <BootstrapTable
                  data={data}
                  bordered={false}
                  striped
                  insertRow
                  deleteRow
                  selectRow={selectRowProp}
                  search={ true } multiColumnSearch={ true }
                  searchPlaceholder="Tìm kiếm"
                  pagination={true}
                  options={options}>

                  <TableHeaderColumn
                    dataField='sn'
                    width="10%"
                    dataFormat={indexN}
                    
                    autovalue={true}
                    hiddenOnInsert
                   >
                    STT
                  </TableHeaderColumn>
                  
                  <TableHeaderColumn
                    dataField='id'
                    width="20%"
                    isKey
                    hidden
                    hiddenOnInsert
                    autoValue={true}
                   >
                    id
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='unitName'
                    width="20%"
                    
                   >
                    Đơn vị tính
                  </TableHeaderColumn>
                  
                 
          
                  
                  
                  <TableHeaderColumn
                    dataField='status'
                    width="25%" 
                    dataFormat={statusFormat}
                    editable={ { type: 'checkbox', label:"Hoạt động", options: { values: 'ACTIVE:INACTIVE' } } }
                    dataSort>
                   Trạng thái
                  </TableHeaderColumn>
                  {(CURRENT_USER.staffType.staffCode === "ADMIN" ||CURRENT_USER.staffType.staffCode === "ADMIN") && 
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
         
    );
  }
}
export default TableDetail;