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
    let {handleSubmit,allService,allStaff} = this.props;
    let { width, height } = this.state;
    return (
    
      <div className="card">
        <div className="header">
          <h4>Thêm chi nhánh mới</h4>
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
                  hidden="true"
                  className="form-control-hidden"
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
              <label className="control-label col-md-3">Vị trí chi nhánh</label>
              <div className="col-md-9 ">
              <Field
                  name="address"
                  type="text"
                  placeholder="Địa chỉ chi nhánh"
                  validate={required}
                  className="form-control-hidden"
                  component={renderField} />
                  <br></br>
                <Field
                  name="latitude"
                  type="text"
                  placeholder=""
                  hidden="true"
                  className="form-control-hidden"
                  component="input" />
                   <Field
                  name="longtitude"
                  type="text"
                  hidden="true"
                  className="form-control-hidden"
                  component="input" />
                 <div
                  className="card"
                  style={{ width: width, height: height, boxSizing: 'border-box' }}
                  ref={container => this.container = container}>
                  <div className="content">
                    {this.state.center === null?
                    <ReactMapGL
                    
                    mapboxApiAccessToken={"pk.eyJ1IjoicGh1b25ndGluaGJpZW4iLCJhIjoiY2pvd2RpeGk2MGd5MzNybDhweHJuaGplYSJ9.hnV7tfyYfaGe7XF5I0lAfQ"}
                      {...this.state.viewport} 
                      mapStyle={"mapbox://styles/mapbox/streets-v10"}
                      onViewportChange={this._onViewportChange}
                      onClick ={e=>{console.log(e);
                        this.setState({center:e.lngLat });
                        this.props.dispatch(initialize('BranchForm',{
                          latitude: e.lngLat[1],
                          longtitude: e.lngLat[0]
                        },{keepValues: true}));
                      }} >
                    
                      </ReactMapGL>:<ReactMapGL
                    
                    mapboxApiAccessToken={"pk.eyJ1IjoicGh1b25ndGluaGJpZW4iLCJhIjoiY2pvd2RpeGk2MGd5MzNybDhweHJuaGplYSJ9.hnV7tfyYfaGe7XF5I0lAfQ"}
                      {...this.state.viewport} 
                      mapStyle={"mapbox://styles/mapbox/streets-v10"}
                      onViewportChange={this._onViewportChange}
                      onClick ={e=>{console.log(e);
                        this.setState({center:e.lngLat });
                        this.props.dispatch(initialize('BranchForm',{
                          latitude: e.lngLat[1],
                          longtitude: e.lngLat[0]
                        },{keepValues: true}));
                      }} >
                      <Marker  latitude={this.state.center[1]} longitude={this.state.center[0]} offsetLeft={-20} offsetTop={-10}>
                        <div>
                        <img src={chilli} width="32" height="32" /></div>
                      </Marker>
                      {/* <Marker
                          coordinates={this.state.center}
                          anchor="bottom"
                          
                        >
                        <img src={chilli} width="32" height="32" />
                        </Marker> */}
                      </ReactMapGL>}
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
                        {/* <Link className="btn btn-fill btn-danger" to="/admin/branch-management">
                        Hủy
                        </Link> */}
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
  enableReinitialize : false,
})(BranchForm)
  export default BranchForm;