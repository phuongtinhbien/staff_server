import renderField from 'components/FormInputs/renderField';
import React from 'react';
import { Field } from 'redux-form';


const resultDetail = (data) =>{

  return (
    <p>
      <span style={{fontSize:"12px"}}> - Chất liệu : {data.materialByMaterialId!= null?data.materialByMaterialId.materialName: "Undefine"} </span>
      <br></br>
      <span style={{fontSize:"12px"}}> - Nhãn hiệu : {data.labelByLabelId!= null?data.labelByLabelId.labelName: "Undefine"} </span>
      <br></br>
      <span style={{fontSize:"12px"}}> - Màu : {data.colorByColorId!= null?data.colorByColorId.colorName: "Undefine"} </span>
      <br></br>
      <span style={{fontSize:"12px"}}> - Ghi chú : {data.note!= null?data.note: "_"} </span>
    </p>
  );

}
const proccessData = (data)=>{
  let result = [];
  
  for (let i = 0;i<data.length;i++){
      let row =null;
      row = {
        sn: i+1,
        nodeId: data[i].nodeId,
        productName: data[i].productByProductId != null ? data[i].productByProductId .productName: "undefine",
        serviceName: data[i].serviceTypeByServiceTypeId != null ? data[i].serviceTypeByServiceTypeId.serviceTypeName:"_",
        amount:data[i].amount,
        unit: data[i].unitByUnitId != null ? data[i].unitByUnitId.unitName: "_",
        unitPrice:data[i].unitPriceByUnitPrice!= null?  data[i].unitPriceByUnitPrice.price :"_",
        details: resultDetail(data[i])
      }
      result.push(row);
  }
  return result;
};

const sum = (tableData) => {
  let label = 0;
  let serviceName = {};
  for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
    if (!serviceName[tableData[i].serviceName] && tableData[i].unit === "Kg"){
        let subList = tableData.filter(value => value.serviceName === tableData[i].serviceName && tableData[i].unit === "Kg");
        label += tableData[i].unitPrice*tableData[i].amount;
        serviceName[tableData[i].serviceName] = tableData[i].serviceName;
    }
    else{
      label += tableData[i].unitPrice*tableData[i].amount;
    }
  
  }
  return (
    <strong>{ label.toLocaleString('vi-VI', { style: 'currency', currency: 'VND' }) }</strong>
  );
}

const required = value => (value ? undefined : 'Bắt buộc')
const number = value =>
  value && isNaN(Number(value)) ? 'Nhập vào một số' : undefined
export const maxValue = max => value =>
  value && value > max ? `Không vượt quá số lượng/khối lượng đã nhận` : undefined

const renderItemBill = ({ fields,billDetail,   meta: { error, submitFailed } }) =>(
  <div>
      {submitFailed &&
        error &&
        <span>
          <label className="error" >{error}</label>
        </span>}
        <table className="table table-bigboy">
                    <tr>
                      <th>STT</th>
                      <th>Loại dịch vụ</th>
                      <th>Quần áo</th>
                      <th className="text-right">ĐVT</th>
                      <th className="text-right">Đơn giá</th>
                      <th className="text-right">Số lượng/ Khối lượng đã nhận</th>
                      <th className="text-right">Số lượng/ Khối lượng giao</th>
                      <th className="text-right">Tổng tạm</th>
                    </tr>
                    <tbody>
                      {
                        billDetail.length>0 &&
                        billDetail.map ((value, i)=>(
                          <tr key={i}>
                          <td>
                            {i+1}
                          </td>
                          <td>
                            {value.serviceTypeByServiceTypeId.serviceTypeName}
                          </td>
                          <td>
                            {value.productByProductId.productName}
                          </td>
                          <td className="text-right">
                            {value.unitByUnitId.unitName}
                          </td>
                          <td className="text-right">
                            {value.unitPriceByUnitPrice?value.unitPriceByUnitPrice.price.toLocaleString('vi-VI', { style: 'currency', currency: 'VND' }):"" }
                          </td>
                          <td className="text-right">
                            {value.receivedAmount}
                          </td>
                          <td className="text-right">
                                <Field
                                  name={`billDetail[${i}].id`}
                                  type="text"
                                  in
                                  defautValue = {value.id}
                                  inputClassName= 'hidden'
                                  component={renderField}
                              />
                            <Field
                                name={`billDetail[${i}].amount`}
                                type="text"
                                placeholder="Số lượng đồ giao"
                                inputClassName ="text-right"
                                validate={[required, number, maxValue(value.receivedAmount)]}
                                component={renderField}
                            />
                          </td>
                          <td className="text-right">
                            {value.unitPriceByUnitPrice?(value.amount * value.unitPriceByUnitPrice.price).toLocaleString('vi-VI', { style: 'currency', currency: 'VND' }):""}
                          </td>
                        </tr>
                        ))
                      }
                      <tr>
                    <td colSpan="7" className="text-right"><h5> Tổng tiền: &nbsp;</h5></td>
                      <td  className="text-right"><h5> {sum(proccessData(billDetail))}</h5></td>
                    </tr>

                    </tbody>
                    </table>
            </div>
  )
export default (renderItemBill)