
import React, { Component } from 'react';
import moment from 'moment';
import { Field, reduxForm,initialize, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import Tags from 'components/Tags';
import SortCloth from './SortCloth';
import _ from 'lodash';
import { Query, Mutation } from 'react-apollo';
import gql  from "graphql-tag";

import renderField from 'components/FormInputs/renderField';


const proccessData = (data)=>{
  let result = [];
  
  for (let i = 0;i<data.length;i++){
      let row =null;
      row = {
        productId: data[i].productByProductId != null ?data[i].productByProductId.id: null,
        productName: data[i].productByProductId != null ? data[i].productByProductId .productName: "undefine",
        serviceTypeId: data[i].serviceTypeByServiceTypeId ?data[i].serviceTypeByServiceTypeId.id :null,
        serviceName: data[i].serviceTypeByServiceTypeId != null ? data[i].serviceTypeByServiceTypeId.serviceTypeName:"_",
        receivedAmount: data[i].recievedAmount,
        unitId: data[i].unitByUnitId.id,
        materialId: data[i].materialByMaterialId!= null?data[i].materialByMaterialId.id:null,
        materialName: data[i].materialByMaterialId!= null?data[i].materialByMaterialId.materialName: "Undefine",
        labelId: data[i].labelByLabelId!= null?data[i].labelByLabelId.id:null,
        labelName: data[i].labelByLabelId!= null?data[i].labelByLabelId.labelName: "Undefine",
        colorId: data[i].colorByColorId!= null?data[i].colorByColorId.id: null,
        colorName: data[i].colorByColorId!= null?data[i].colorByColorId.colorName: "Undefine",
        colorGroupId: data[i].colorByColorId!= null? data[i].colorByColorId.colorGroupByColorGroupId.id: null,
        colorGroupName: data[i].colorByColorId!= null? data[i].colorByColorId.colorGroupByColorGroupId.colorGroupName: "undefine"
      }
      result.push(row);
  }
  return result;
};

// const optionBranch = (data) =>{
//   let result = [];
//   if (data == null)
//   {
//     return result;
//   }
//   for (let i=0;i<data.length;i++){
//     result.push({
//         value:data[i].id,
//         label: data[i].washerCode
//     })
//   }
//   return result;
// }

function removeDuplicates(arr){
  var newarr = [];
  var unique = {};
   
  arr.forEach(item =>{
      if (!unique[item.id]) {
          newarr.push(item);
          unique[item.id] = item;
      }
  });
  return newarr ;
}

const calService = (data)=>{
  let result=[];

  if (data){
    data.forEach(element => {
     let a = {
        id: element.serviceTypeByServiceTypeId.id,
        name: element.serviceTypeByServiceTypeId.serviceTypeName
      };
      result.push(a);
    });
  }
  return removeDuplicates(result);
 
}

const calColorGroup = (data)=>{
  let result=[];

  if (data){
    data.forEach(element => {
     let a = {
        id: element.colorGroupId,
        name: element.colorGroupName,
      };
      result.push(a);
    });
  }
  return removeDuplicates(result);
 
}

const setWashBag = (data, ind) => {
    for (let i =0; i<data.length;i++){
      data[i].washbagCode = ind;
    }
    return data;
}
const sortByServiceAndColorGroup= (serviceArrays,data)=>{
    let result = [];
    let washBagind = 0;
  
    serviceArrays.forEach(element => {
        let filter = data.filter( item => item.serviceTypeId === element.id);
       
        let colorGroup = calColorGroup(filter);
        colorGroup.forEach(e =>{
            let colorFilter = filter.filter(item => item.colorGroupId === e.id);
           
            result =result.concat(setWashBag(colorFilter, washBagind++));
        });
    });
    return result;
} 





class AssignForm extends Component {
  state = {
    date: moment(),
    startDate: moment(),
    endDate: moment(),
    dateRangeFocusedInput: null,
    viewMode: false, 
    sortedCloth: null
  
  };
  render () {
    
    let {receipt, washer,handleSubmit, history} = this.props;

    let {sortedCloth} = this.state;
    
    this.props.dispatch(initialize('AssignForm',{
      receiptId: receipt.id,
      resultSortedCloth: sortByServiceAndColorGroup(calService(receipt.receiptDetailsByReceiptId.nodes),proccessData(receipt.receiptDetailsByReceiptId.nodes))
    },{keepValues: true}));
    console.log(sortedCloth)

      return(

          

            <fieldset>
              <legend>Phân loại</legend>
              <div className="col-sm-12">

    <div className="row">
    {/* <div className="col-sm-6 ">
                  <label className="control-label col-md-4">Máy giặt</label>
                  <div className=" control-label col-md-8" style={{textAlign:"left"}}>
                  <Field
                            name="wash"
                            type="select"
                            value={true}
                            options={optionBranch(washer)}
                            placeholder = "Chọn máy để xử lí"
                            component={renderField}
                            />
                           
                  </div>
                  </div>
                  <div className="col-sm-4 control-label" style={{textAlign:"left"}}>
                 <button
                    type="button"
                        className={"btn btn-fill btn-info btn-sm"}
                        >
                        Xác nhận
                    </button> &nbsp;

                   
                  </div> */}
                 
    </div>
                <form className="form-horizontal" onSubmit={handleSubmit} >
                     
                  <FieldArray name="resultSortedCloth" serviceArrays={calService(receipt.receiptDetailsByReceiptId.nodes)}  component={SortCloth}></FieldArray>
                <div className="text-center">
                  <button
                  type="submit"
                      className={"btn btn-fill btn-success btn-wd"}
                      >
                    Save
                  </button>
                </div>
               
              </form>
          
              </div>
            </fieldset>
          

      );

  }
}
export default reduxForm({
  form: 'AssignForm'})(AssignForm);
