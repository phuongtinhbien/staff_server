import gql from "graphql-tag";
import React from 'react';
import { Query } from 'react-apollo';
import Error from '../../../Error';
import { Link, withRouter } from 'react-router-dom';
import BigTable from './Pending';
import Serving from './Serving';
import status from '../../status';
import WashChart from './PublicPreference';

const ASSIGN_WORK = gql`query assignWork($branch: BigFloat!) {
  getprepareorderserving(brId: $branch) {
    nodes {
      nodeId
      id
      customerOrderByOrderId {
        nodeId
        id
        status
        deliveryDate
        
        customerByCustomerId{
          fullName
          
        }
        timeScheduleByDeliveryTimeId {
          id
          nodeId
          timeStart
          timeEnd
        }
      }
      washBagsByReceiptId{
        totalCount
        nodes{
          id
          nodeId
          washesByWashBagId{
            totalCount
          }
        }
      }
      receiptDetailsByReceiptId {
        nodes {
          nodeId
          id
          recievedAmount
          serviceTypeByServiceTypeId {
            nodeId
            id
            serviceTypeName
          }
          productByProductId {
            nodeId
            id
            productName
          }
          colorByColorId {
            nodeId
            id
            colorName
            colorGroupByColorGroupId {
              nodeId
              id
              colorGroupName
            }
          }
        }
      }
    }
  }
  


}
`;

const ALL_WASH = gql `query allWash ($brId: BigFloat!){
  washSearch(brId: $brId){
    totalCount
    nodes{
      customerOrderId
      receiptId
      wbName
      washerCode
      sn
      status
      customerName
    }
  }
  allWashingMachines(condition:{
    status:"ACTIVE",
    branchId: $brId
  }){
    nodes{
      id
      nodeId
      washerCode
    }
  }
}`;

function removeDuplicates(arr){
  var newarr = [];
  var unique = {};
   
  arr.forEach((item, index) =>{
      if (!unique[item]) {
          newarr.push(item);
          unique[item] = item;
      }
  });
  return newarr ;
}


const filterWashbag = (data) =>{
    let res = [];
    let unique = {};
    for (let i =0;i<data.length;i++){
      if (!unique[data[i].orderId]) {
        let temp = data.filter(item => item.orderId === data[i].orderId);
        temp.forEach(el => {
          if (!data[i].wbName.includes(el.wbName))
            data[i].wbName = data[i].wbName.concat(el.wbName);
        });
        data[i].wbName = removeDuplicates(data[i].wbName);
        res.push( data[i]);
        unique[data[i].orderId] = data[i].orderId;
    }
    }
      return res;

}


const processAllWash = (data)=>{

      let res =[];

      if (data){
        for (let i=0;i<data.length;i++){
            let row = {
              sn: data[i].sn,
              orderId: data[i].customerOrderId,
              receiptId: data[i].receiptId,
              wbName: [data[i].wbName],
              washerCode: data[i].washerCode,
              status: data[i].status,
              customerName: data[i].customerName
            }
            res.push(row);
        }
      }

      return filterWashbag(res);
}

const processChart = (data)=>{
    let total = data.length;
    let chart = {
        label:[data.filter(value => value.status === 'PENDING_SERVING').length * 100 /total + "%",data.filter(value => value.status === 'FINISHED_SERVING').length*100/total + "%"],
        series: [data.filter(value => value.status === 'PENDING_SERVING').length *100/total, data.filter(value => value.status === 'FINISHED_SERVING').length*100/total]
    }
    return chart;
}

const AssignWorkDetail = (props,{CURRENT_USER= JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"))}) => (
  <div className="container-fluid">
  
      <Query
      query={ALL_WASH}
      
      variables = {{brId: CURRENT_USER.branch.id }}
 
    >{({ loading, error, data, refetch, }) => {
      if (loading) return null;
      if (refetch) {
        console.log(refetch);
      }
      if (error){
        return (<Error errorContent= {error.message}></Error>);
      }
      if (data != null){
        console.log(data)
      return (
        <div>
        <div className="row">
        <div className="col-md-8">
              <Serving  washer = {props.match.params.washerCode}  allWash ={processAllWash(data.washSearch.nodes.filter(value => value.status ==='SERVING'))}/>
            </div>
            <div className="col-md-4">
            <WashChart dataChart = {processChart(processAllWash(data.washSearch.nodes.filter(value => value.washerCode === props.match.params.washerCode)))}/>
            </div>
            
    </div>
       <div className="row">
       <div className="col-md-12">
             
           <BigTable  washer = {props.match.params.washerCode}  allWash ={processAllWash(data.washSearch.nodes)}/>
           </div>
           
   </div>
   </div>
      );
      }
    }}
    </Query>
    
  </div>
);

export default withRouter(AssignWorkDetail);