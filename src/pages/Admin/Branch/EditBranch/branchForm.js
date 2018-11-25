import renderField from 'components/FormInputs/renderField';
import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Link } from 'react-router-dom';
import { Field, reduxForm, initialize } from 'redux-form';
import chilli from './ic_app.png';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const required = value => (value ? undefined : 'Bắt buộc')

const processOption1 =  (data, type)=>{
  let res=[];
  if (data!= null){
    for (let i = 0; i<data.length;i++){
        res.push({value: data[i].id, label: data[i].fullName + "("+data[i].email+")", type: data[i].staffTypeByStaffTypeId && data[i].staffTypeByStaffTypeId.staffCode});
      
    }
  }
  return res;
  
}

const optionValue = (val,lab )=>{
  return {value: val,label: lab};
}

const processOption =  (data, type)=>{
let res=[];
if (data!= null){
  for (let i = 0; i<data.length;i++){
    if (data[i])
      res.push(optionValue(data[i].serviceTypeByServiceTypeId.id, data[i].serviceTypeByServiceTypeId.serviceTypeName));
    
  }
}
return res;

}

const processOption2 =  (data, type)=>{
  let res=[];
  if (data!= null){
    for (let i = 0; i<data.length;i++){
      if (data[i])
        res.push({value: data[i].promotionByPromotionId.id, label: data[i].promotionByPromotionId.promotionName});
      
    }
  }
  return res;
  
}
class  BranchForm extends Component{

  state = {
    center:null,
    viewport: {
   
      latitude: 10.03551420932697,
      longitude: 105.77446189400511,
      zoom: 8,
      bearing: 0,
      pitch: 0,
      width: 300,
      height: 300
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
    let {branch} = this.props;
    let staffOne = [];
    let staffTwo = [];
    let staffThree= [];
    let staff = processOption1(branch.staffByBranchId.nodes);
    console.log(staff)
    staffOne.push(staff.filter(value => value.type ==="STAFF_01"))
    staffTwo.push(staff.filter(value => value.type ==="STAFF_02"))
    staffThree.push(staff.filter(value => value.type ==="STAFF_03"))
    this.setState({center:[branch.longtidute,branch.latidute]})
    this.props.dispatch(initialize('BranchForm',{
      id: branch.id,
      branchName: branch.branchName,
      address: branch.address,
      status: branch.status === "ACTIVE"?true: false,
      staffOne: staffOne.pop(),
      staffTwo: staffTwo.pop(),
      staffThree: staffThree.pop(),
      serviceType: processOption(branch.serviceTypeBranchesByBranchId.nodes),
      promotion: processOption2(branch.promotionBranchesByBranchId.nodes)

    },{keepValues: true}));
  }

  

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    let size = this.container.getBoundingClientRect();
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: size.width - 60,
        height: size.height-30,
        margin: 30
      }
    });
  }

  _onViewportChange = viewport => this.setState({viewport});

  render(){
    let {handleSubmit,allService,allStaff, allPromotion, history} = this.props;
    let { width, height } = this.state;
    return (
    
      <div className="card">
        <div className="header">
          <h4>Cập nhật chi nhánh</h4>
        </div>
        <div className="content">
          <form className="form-horizontal" onSubmit={handleSubmit} >
            <div className="form-group">
    
              <label className="control-label col-md-3">Tên chi nhánh</label>
              <div className="col-md-9">
                <Field
                  name="branchName"
                  type="text"
                  value=""
                  validate={required}
                  placeholder ="Tên chi nhánh"
                  component={renderField}
                 />
              </div>
            </div>
           
              <div className="form-group">
              <label className="control-label col-md-3">Trạng thái</label>
              <div className="col-md-9 checkbox-group">
                <Field
                  name="status"
                  type="checkbox"
                  value="ACTIVE"
                  label="Hoạt động?"
                  component={renderField} />
              </div>
             
            </div>
            <div className="form-group">
              <label className="control-label col-md-3">Dịch vụ hỗ trợ</label>
              <div className="col-md-9 ">
                <Field
                  name="serviceType"
                  type="select"
                  isMulti={true}
                  validate={required}
                  options={allService}
                  placeholder="Chọn các dịch vụ hỗ trợ"
  
                  component={renderField} />
                   
              </div>       
            </div>
            <div className="form-group">
              <label className="control-label col-md-3">Nhân viên quản lí đơn hàng</label>
              
              <div className="col-md-9 ">
                <Field
                  name="staffOne"
                  type="select"
                  isMulti={true}
                  options={allStaff.filter(value => value.type ==="STAFF_01")}
                  placeholder="Chọn nhân viên"
                  hidden="true"
                  validate={required}
                  className="form-control-hidden"
                  component={renderField} />
                   
              </div>       
            </div>
            <div className="form-group">
              <label className="control-label col-md-3">Nhân viên xử lí đơn hàng</label>
              
              <div className="col-md-9 ">
                <Field
                  name="staffTwo"
                  type="select"
                  isMulti={true}
                  options={allStaff.filter(value => value.type ==="STAFF_02")}
                  placeholder="Chọn nhân viên"
                  hidden="true"
                  validate={required}
                  className="form-control-hidden"
                  component={renderField} />
                   
              </div>       
            </div>
            <div className="form-group">
              <label className="control-label col-md-3">Nhân viên giao quần áo</label>
              
              <div className="col-md-9 ">
                <Field
                  name="staffThree"
                  type="select"
                  isMulti={true}
                  options={allStaff.filter(value => value.type ==="STAFF_03")}
                  placeholder="Chọn nhân viên"
                  hidden="true"
                  validate={required}
                  className="form-control-hidden"
                  component={renderField} />
                   
              </div>       
            </div>
            
            <div className="form-group">
              <label className="control-label col-md-3">Khuyến mãi</label>
              
              <div className="col-md-9 ">
                <Field
                  name="promotion"
                  type="select"
                  isMulti={true}
                  options={allPromotion}
                  placeholder="Chọn khuyến mãi"
                 
                  component={renderField} />
                   
              </div>       
            </div>
            <div className="form-group">
              <label className="control-label col-md-3">Địa chỉ chi nhánh</label>
              <div className="col-md-9 ">
              <Field
                  name="address"
                  type="text"
                  placeholder="Địa chỉ chi nhánh"
                  validate={required}
                  className="form-control"
                  component={renderField} />
                  <br></br>
                <Field
                  name="latitude"
                  type="text"
                  placeholder=""

                  inputClassName ="hidden"
                  component={renderField} />
                   <Field
                  name="longtitude"
                  type="text"
                  inputClassName ="hidden"
                  component={renderField} />
                 <div
                  className="card"
                  style={{ width: width, height: height, boxSizing: 'border-box' }}
                  ref={container => this.container = container}>
                  <div className="content">
                   
                    <ReactMapGL
                    
                    mapboxApiAccessToken={"pk.eyJ1IjoicGh1b25ndGluaGJpZW4iLCJhIjoiY2pvd2RpeGk2MGd5MzNybDhweHJuaGplYSJ9.hnV7tfyYfaGe7XF5I0lAfQ"}
                      {...this.state.viewport} 
                      mapStyle={"mapbox://styles/mapbox/streets-v10"}
                      onViewportChange={this._onViewportChange}
                      onClick ={e=>{console.log(e);
                        this.setState({center:e.lngLat });
                        this.props.dispatch(initialize('BranchForm',{
                          latitude: this.state.center[1],
                          longtitude: this.state.center[0]
                        },{keepValues: true,}));
                      }} >
                       {this.state.center &&<Marker  latitude={this.state.center[1]} longitude={this.state.center[0]} offsetLeft={-20} offsetTop={-10}>
                        <div>
                        <img src={chilli} width="48" height="48" /></div>
                      </Marker>
                     }
                      </ReactMapGL>
                  </div>
                </div>
              </div>       
            </div>
            <div className="form-group">
                <label className="control-label col-md-3"></label>
                <div className="col-md-9">
                        <button type="submit" className="btn btn-fill btn-info" >Lưu lại</button>
                        &nbsp;
                        &nbsp;
                        <button className="btn btn-fill btn-danger" onClick={e=>history.goBack()}>
                        Hủy
                        </button>
                </div>
            </div>
          </form>
        </div>
      </div>
    )
  };
  }
BranchForm = reduxForm({
  form: 'BranchForm',
})(BranchForm)
  export default BranchForm;