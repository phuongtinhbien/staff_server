import React, { Component } from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Link, withRouter } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import gql  from "graphql-tag";
import CreateOrderForm from './CreateOrderForm';
import Error from '../../Error';




const OPTION_LIST = gql `query optionList {
  allBranches(condition: {status: "ACTIVE"}) {
    nodes {
      id
      nodeId
      branchName
      address
    }
  }
  allTimeSchedules(condition: {status: "ACTIVE"}) {
    nodes {
      nodeId
      id
      timeScheduleNo
      timeStart
      timeEnd
    }
  }
  allColors(condition: {status: "ACTIVE"}) {
    nodes {
      id
      nodeId
      colorName
    }
  }
  allLabels(condition:{
    status:"ACTIVE"
  }){
    nodes{
      id
      nodeId
      labelName
    }
  }
  allMaterials(condition:{
    status:"ACTIVE"
  }){
    nodes{
      id
      nodeId
      materialName
    }
  }
  allProducts(condition:{
    status: "ACTIVE"
  }){
    nodes{
      id
      productName
    }
  }

  allUnits(condition:{
    status:"ACTIVE"
  }){
    nodes{
      id
      unitName
    }
  }
}
`;




const optionValue = (val,lab )=>{
      return {value: val,label: lab};
}


const processTime =  (data)=>{
  let res=[];
  if (data!= null){
  for (let i = 0; i<data.length;i++){

    res.push(optionValue(data[i].id, `${data[i].timeScheduleNo} (${data[i].timeStart} - ${data[i].timeEnd})`));
  }
}
  return res;

}


const handleCreateOrder = (values)=>{

}



class CreateOrder extends Component {

  state= {
    approve: false,
    decline: false,
  }

  render() {
    let {match,data} = this.props;
  const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
    let timeSchedule;
    console.log(this.props);
    return (
      <div className="container-fluid">
      <div className="card">
        <div className="header"></div>
        <div className="content">
        <div className="text-right">
        </div>
        <Query query={OPTION_LIST} >
                {({loading, error,data, refetch}) => {
                  if (loading) return null;
                  if (error){
                    return (<Error errorContent= {error.message}></Error>);
                   }
                  if (data!= null){
                    console.log(data);
                    timeSchedule =  data.allTimeSchedules.nodes;
                    return  (
                      // <Mutation
                      //           mutation={AUTH_MUT}
                      //           onCompleted={data=> {handleOnCompleted(data,history);
                      //             // this.setState({isLogined: true})
                      //           }}
                      //           update={(cache, { data: { authenticate } }) => {
                      //             const { jwt } = cache.readQuery({ query: AUTH_MUT });
                      //           }}

                      //         >
                      //         {
                      //           (authenticate) =>(
                      //           <div>
                      //             <LoginForm  onSubmit={values => {authenticate({variables:values});
                      //           }} />
                                  
                      //           </div>
                      //           )
                      //         }
                      
                      // </Mutation>
                    <CreateOrderForm branch={CURRENT_USER.branch}
                    timeSchedule={processTime(timeSchedule)} 
                    optionListDetail= {{material:data.allMaterials, color: data.allColors, label:data.allLabels, product:data.allProducts, unit:data.allUnits}}
                    ></CreateOrderForm>);
                  }
                }
                }
                </Query>

          <div className="row">
           
           </div>
      </div>
    </div>
    </div>
    );
  }
}
export default withRouter(CreateOrder);
