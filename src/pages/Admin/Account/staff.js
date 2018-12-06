import React, { Component } from 'react';
import { BootstrapTable, ClearSearchButton, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import gql from 'graphql-tag';
import status from '../../Order/status';
import { Mutation } from 'react-apollo';
import { Link, withRouter } from 'react-router-dom';
import Switch from 'components/Switch';
import NotificationSystem from 'react-notification-system';
const UPDATE_WASHER_STATUS = gql `mutation updateOptionList($id: BigFloat!, $status: Boolean!, $currUser: BigFloat!) {
  updateStaffById(input: {id: $id, staffPatch: {status: $status, updateBy: $currUser}}) {
    staff {
      nodeId
      id
      fullName
      status
    }
  }
}

`;
class TableDetail extends Component {

  state = {
    column: [],
    tableName: "Máy giặt của chi nhánh",
    tableDesc: "Xem thông tin các máy ở các chi nhánh",
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
    createCustomInsertButton = (openModal) => {
      return (
      <Link type="button" className="btn btn-primary btn-fill btn-wd" to={"/admin/createStaff"} >
          <span className="btn-label">
            <i className="pe-7s-plus"></i> &nbsp;
            Thêm mới
          </span> 
      </Link>
        
      );
    }
  
  render() {
    const { data } = this.props;
    const tableName = this.state.tableName;
    const tableDesc = this.state.tableDesc;
    let notificationSystem = this.notificationSystem;
    let CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
    console.log(data);
    
   
    function branchFormat(cell, row){
      return (<span>{row.branchByBranchId && row.branchByBranchId.branchName.toUpperCase().replace("CHI NHÁNH","")}</span>);
    };
    function staffTypeFormat(cell, row){
      return (<span>{row.staffTypeByStaffTypeId && row.staffTypeByStaffTypeId.staffTypeName}</span>);
    };
    function staffName (cell,row){
      return (<span>
        <img src={row.postByStaffAvatar && row.postByStaffAvatar.headerImageFile} style={{borderRadius:"50%"}} height="60px"></img>
       &nbsp;{row.fullName && row.fullName} ({row.email}) 
      </span>);
    }

    function statusFormat(cell, row){
        return (<span>{status(cell)}</span>)
    }

    function indexN(cell, row, enumObject, index) {
      return (<div>{index+1}</div>) 
  }
  
  function showNotification(message, level) {
    notificationSystem.addNotification({
      message: message,
      level: level,
      autoDismiss: 1,
      position: "tc"
    });
  }
  function toolFormat (cell, row){
    return (
      <div>
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
          
                  <Switch value={row.status}   onChange={() => {updateStatusWasher({variables:{id:row.id,currUser: CURRENT_USER.currentUser.id, status: !row.status}});
                  }} />
                  
                </div>
                )
              }
          
          </Mutation>
      </div>
     
    )
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
      insertBtn: this.createCustomInsertButton,
    };

    return (
            <div> <NotificationSystem
            ref={ref => this.notificationSystem = ref} />

                <BootstrapTable
                  data={data}
                  bordered={false}
                  striped
                  tableName={tableName}
                  tableDesc ={tableDesc}
                  insertRow
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
                    dataField='branch'
                    width="20%"
                    dataFormat={branchFormat}
                   >
                    Chi nhánh
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='fullName'
                    width="50%"
                    dataFormat={staffName}
                   >
                    Họ tên
                  </TableHeaderColumn>
                  
                  <TableHeaderColumn
                    dataField='staffType'
                    width="20%"
                    dataFormat={staffTypeFormat}
                   >
                    Chức vụ
                  </TableHeaderColumn>
                  
                  {/* <TableHeaderColumn
                    dataField='status'
                    width="20%" 
                    dataFormat={statusFormat}
                    dataSort>
                   Trạng thái
                  </TableHeaderColumn> */}
                  {(CURRENT_USER.staffType.staffCode === "ADMIN" ||CURRENT_USER.staffType.staffCode === "ADMIN") && 
                  <TableHeaderColumn
                  dataField=''
                  width="20%" 
                  dataFormat={toolFormat}
                 >
                 Chức năng
                </TableHeaderColumn>
              
                }
                  </BootstrapTable>
                  </div>
    );
  }
}
export default TableDetail;