import React, { Component } from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Link, withRouter } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import gql  from "graphql-tag";
import CreateOrderForm from './CreateOrderForm';
import Error from '../../Error';




const CURR_USER = gql `query{
  currentUser{
    id
    userType
    lastName

  }
}`;

const OPTION_LIST = gql `query optionList{
  allBranches(condition:{
    status: "ACTIVE"
  }){
    nodes{
      id
      nodeId
      branchName
      address
    }
}
  allTimeSchedules(condition:{
    status: "ACTIVE"
  }){
    nodes{
      nodeId
      id
      timeScheduleNo
      timeStart
      timeEnd
    }
  }
}
`;

const optionValue = (val,lab )=>{
      return {value: val,label: lab};
}

const processBranch =  (data)=>{
    let res=[];
    if (data!= null){
      for (let i = 0; i<data.length;i++){

        res.push(optionValue(data[i].id, data[i].branchName));
      }
    }
    return res;

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



class CreateOrder extends Component {

  state= {
    approve: false,
    decline: false,
  }

  render() {
    let {match,data} = this.props;
    let currUser;

    let branchList;
    let timeSchedule;
    console.log(this.props);
    return (
      <div className="container-fluid">
      <div className="card">
        <div className="header"></div>
        <div className="content">
        <div className="text-right">
        </div>
        <Query query={OPTION_LIST}
        fetchPolicy={"network-only"} >
          {({loading, error,data, refetch}) => {
            if (loading) return null;
            if (error){
              console.log(error)
            }
            if (data!= null){
              console.log(data);
              branchList =  data.allBranches.nodes;
              timeSchedule =  data.allTimeSchedules.nodes;
              return  <CreateOrderForm branchList={processBranch(branchList)} timeSchedule={processTime(timeSchedule)} ></CreateOrderForm>;
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
