import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn, InsertModalFooter,ClearSearchButton} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import generateData from './generateData';

const data = generateData(1000);

class ListCloth extends Component {

  state = {
    column: [],
    tableName: "Cloth",
    tableDesc: "The clothes. Using for customer chooser for luandrying",
    data: generateData(20, false)
  };

    removeItem = itemId => {
      this.setState({
        data: data.filter(item => item.id !== itemId)

      });
    }

    beforeSave(e) {
      
    }
    handleSave(save) {
      // Custom your onSave event here,
      // it's not necessary to implement this function if you have no any process before save
      console.log('This is my custom function for save event');
      save();
    }
    handleDeleteButtonClick = (onClick) => {
      // Custom your onClick event here,
      // it's not necessary to implement this function if you have no any process before onClick
      console.log('This is my custom function for DeleteButton click event');
      onClick();
    }

    createCustomModalHeader(onClose, onSave) {
      return (
          <h4 className="title">Add new value</h4>
      );
    }
    createCustomModalFooter = (closeModal, save)=>{
      return (
        <InsertModalFooter
          className='my-custom-class'
          saveBtnText='Save'
          closeBtnText='Cancel'
          closeBtnContextual='btn btn-warning btn-fill btn-wd'
          saveBtnContextual='btn btn-primary btn-fill btn-wd'
          beforeClose={ this.beforeClose }
          beforeSave={ this.beforeSave }
          onSave={ () => this.handleSave(save) }
          />
      );
    }

    createCustomDeleteButton = (onClick) => {
      return (
        <button type="button" className="btn btn-danger btn-fill btn-wd" 
        onClick={ e => this.handleDeleteButtonClick(onClick)}>
        <span className="btn-label">
          <i className="pe-7s-close-circle"></i> &nbsp;
          Remove
        </span> 
      </button>
      );
    }

    createCustomInsertButton = (openModal) => {
      return (
        <button type="button" className="btn btn-primary btn-fill btn-wd" onClick={ openModal }>
        <span className="btn-label">
          <i className="pe-7s-plus"></i> &nbsp;
          Create New
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
    const { data } = this.state;
    const tableName = this.state.tableName;
    const tableDesc = this.state.tableDesc;
    function onAfterDeleteRow(rowKeys) {
      alert('The rowkey you drop: ' + rowKeys);
    };
    function buttonFormatter(cell, row){
      
      return "<button class='btn btn-primary btn-sm btn-fill btn-linkedin'><i class='pe-7s-note'></i>&nbsp; Edit</button>";
    };
    function imageFormatter(cell, row){

        return "<img src='"+row.image+"'></img>";
      
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
      insertModalHeader: this.createCustomModalHeader,
      insertModalFooter: this.createCustomModalFooter,
      deleteBtn: this.createCustomDeleteButton,
      insertBtn: this.createCustomInsertButton,
      clearSearchBtn: this.createCustomClearButton,
      // onRowClick: function(row) {
      //   alert(`You click row id: ${row.id}`);
      // },
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
              <div className="content table-responsive table-full-width">
                <BootstrapTable
                  className=""
                  data={data}
                  bordered={false}
                  striped
                  insertRow={ true }
                  cellEdit = {false}
                  search={ true } multiColumnSearch={ true }
                  deleteRow={ true } selectRow={ selectRowProp }
                  pagination={true}

                  options={options}>
                  <TableHeaderColumn
                    dataField='sn'
                    width="6%"
                    hiddenOnInsert="true"
                    >
                    S/N
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='id'
                    hiddenOnInsert="true"
                    hidden
                    dataSort>
                    Cloth Id
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='image'
                    width="20%"
                    
                    dataFormat={imageFormatter}
                    editable={ { type: 'file', options: { className:"custom-control-input"} }}
                    dataSort>
                    Image
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='category'
                    width="20%"
                    editable={ { type: 'select', options: { className:"custom-control-input", values:[{text: "Category 1", value: 123},{text: "Category 2", value: 456}] } }}
                    dataSort>
                    Cloth Category
                  </TableHeaderColumn>
                  
                  <TableHeaderColumn
                    dataField='name'
                    width="25%"
                    isKey
                    dataSort>
                    Cloth Name
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='desc'
                    width="50%"
                    hidden
                    editable={ { type: 'textarea', options: { className:"custom-control-input" } }}
                    >
                    Short Description
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='status'
                    editable={ { type: 'checkbox', options: { className:"custom-control-input" } }}
                    width="15%"
                    dataSort>
                    Status
                  </TableHeaderColumn>
                  <TableHeaderColumn 
                      dataField='action' 
                      hiddenOnInsert="true"
                      width="10%"
                      dataFormat={buttonFormatter}
                      export={ false }
                  >
                  Action</TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default ListCloth;