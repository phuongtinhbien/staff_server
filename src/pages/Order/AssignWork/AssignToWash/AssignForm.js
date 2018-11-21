
import renderField from 'components/FormInputs/renderField';
import moment from 'moment';
import React, { Component } from 'react';
import { Field, FieldArray, initialize, reduxForm } from 'redux-form';
import SortCloth from './SortCloth';



const validate = values => {
  const errors = {};
  if (!values.wash) {
    errors.wash = 'Chọn một máy để phân công';
  }
  if (!values.resultSortedCloth || !values.resultSortedCloth.length>0){
    errors.resultSortedCloth = { _error: 'Phân loại trước khi phân công'}
  }
  return errors;
};
const proccessData = (values)=>{
  let result = [];

  for (let a =0;a<values.length;a++){
    let data = values[a].washBagDetailsByWashBagId.nodes;
    for (let i = 0;i<data.length;i++){
        let row =null;
        row = {
          washbagCode : values[a].washBagName,
          productId: data[i].productByProductId != null ?data[i].productByProductId.id: null,
          productName: data[i].productByProductId != null ? data[i].productByProductId .productName: "undefine",
          serviceTypeId: data[i].serviceTypeByServiceTypeId ?data[i].serviceTypeByServiceTypeId.id :null,
          serviceName: data[i].serviceTypeByServiceTypeId != null ? data[i].serviceTypeByServiceTypeId.serviceTypeName:"_",
          amount: data[i].amount,
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
  }
  
  return result;
};

const optionBranch = (data) =>{
  let result = [];
  if (data == null)
  {
    return result;
  }
  for (let i=0;i<data.length;i++){
    result.push({
        value:data[i].id,
        label: data[i].washerCode
    })
  }
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
    
    this.props.dispatch(initialize('AssignToWashForm',{
      receiptId: receipt.id,
      resultSortedCloth: proccessData(receipt.washBagsByReceiptId.nodes)
    },{keepValues: true}));
    console.log(sortedCloth)

      return(
            <fieldset>
              <legend>Phân công</legend>
              <div className="col-sm-12">
              <form className="form-horizontal" onSubmit={handleSubmit} >
    <div className="row">
    <div className="col-sm-6 ">
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
                    type="submit"
                        className={"btn btn-fill btn-info btn-sm"}
                        >
                        Xác nhận
                    </button> &nbsp;

                   
                  </div>
                 
    </div>
                <br></br><br></br>
                     
                  <FieldArray name="resultSortedCloth"  component={SortCloth}></FieldArray>
               
               
              </form>
          
              </div>
            </fieldset>
          

      );

  }
}
export default reduxForm({
  form: 'AssignToWashForm',validate})(AssignForm);
