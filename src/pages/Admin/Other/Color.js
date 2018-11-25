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
  uri: 'http://localhost:5000/graphql',
  headers: {
    authorization: "BEARER " + localStorage.getItem("luandryStaffPage.staff_key"),
  },
  cache: new InMemoryCache(),

});

const ADD_OPTION = gql`
mutation addOption ($keyName: String!, $status: String!,
  $colorGroupId: BigFloat!,
  $currUser: BigFloat!){
  createColor (input:{
    color:{
      colorName: $keyName,
      status: $status,
      createBy: $currUser,
      colorGroupId: $colorGroupId
    }
  }){
    color{
      id
      colorName
      status
      colorGroupByColorGroupId{
        colorGroupName
        id
      }
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
    const { data,colorGroup } = this.props;
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
      console.log(colorGroup.filter(value =>{value.colorGroupName === row.colorGroupName})) ;
      if (row)
      client.mutate({mutation: ADD_OPTION,
        variables:{keyName: row.colorName, currUser: CURRENT_USER.id, status: row.status }}).then(
          data => {
            console.log(data)
              if (data){
                this.showNotification("Thêm thành công " + data.data.createColor.color.colorName, "success") ;
              }
          }
        ).catch(
          error=>{
            console.log(error.message)
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

              <div >
              <NotificationSystem
                  ref={ref => this.notificationSystem = ref} />
                <BootstrapTable
                  data={data}
                  bordered={false}
                  striped
                  insertRow
                
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
                    dataField='colorGroupName'
                    width="20%"
                    
                    colorGroupFormat
                  
                   >
                    Nhóm màu
                  </TableHeaderColumn>
                  
                 
                  
                  <TableHeaderColumn
                    dataField='colorName'
                    width="20%"
                    isKey
                 
                   >
                    Màu sắc
                  </TableHeaderColumn>
                  
                  
                  <TableHeaderColumn
                    dataField='status'
                    width="25%" 
                    dataFormat={statusFormat}
                    editable={ { type: 'checkbox', label:"Hoạt động", options: { values: 'ACTIVE:INACTIVE' } } }
                    dataSort>
                   Trạng thái
                  </TableHeaderColumn>
                 
                  
                  </BootstrapTable>
                  
                </div>
         
    );
  }
}
export default TableDetail;