import gql from "graphql-tag";
import React from 'react';
import { Query } from 'react-apollo';
import Error from './../../Error';
import BigTable from './BigTable';
import TableWithLinks from './TableWithLinks';


const ASSIGN_WORK = gql`query assignWork($branch: BigFloat!) {
  allEnvVars(condition: {
    keyName: "AUTO_ARRANGE"
  }){
    nodes{
      keyName
      valueKey
    }
  }
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
  allWashingMachines(condition:{
    status:"ACTIVE",
    branchId: $branch
  }){
    totalCount
  }


}
`;

const ALL_WASH = gql `query allWash ($brId: BigFloat!){
   allEnvVars(condition: {
    keyName: "AUTO_ARRANGE"
  }){
    nodes{
      keyName
      valueKey
    }
  }
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
      washesByWashingMachineId{
        totalCount
      }
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
    let unique2 = {};
    for (let i =0;i<data.length;i++){
      if (!(unique[data[i].orderId])) {
        let temp = data.filter(item => item.orderId === data[i].orderId);
        temp.forEach(el => {
          if (!data[i].wbName.includes(el.wbName))
            data[i].wbName = data[i].wbName.concat(el.wbName);
        });
        data[i].wbName = removeDuplicates(data[i].wbName);
        res.push( data[i]);
        unique[data[i].orderId] = data[i].orderId;
        unique2[data[i].washerCode] = data[i].washerCode;
    }
    }
      return res;

}

const processPendingServing = (data)=>{
  let a = data.getprepareorderserving.nodes;
  let res =[];
  for (let i =0;i<a.length;i++){
    res.push({
      nodeId: a[i].nodeId,
      customerOrderId: a[i].customerOrderByOrderId.id,
      customerName: a[i].customerOrderByOrderId.customerByCustomerId.fullName,
      deliveryDate: a[i].customerOrderByOrderId.deliveryDate,
      deliveryTimeStart: a[i].customerOrderByOrderId.timeScheduleByDeliveryTimeId.timeStart,
      deliveryTimeEnd: a[i].customerOrderByOrderId.timeScheduleByDeliveryTimeId.timeEnd,
      washbag: a[i].washBagsByReceiptId.totalCount,
      isAssignToWash: a[i].washBagsByReceiptId.totalCount>0 && a[i].washBagsByReceiptId.nodes[0].washesByWashBagId.totalCount >0? true: false
    })
  }
    return res;
}


const processAllWash = (data, type)=>{

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
      if (type === "TYPE_TWO"){
        return res;
      }
      else{
        return filterWashbag(res);
      }

      
}


const AssignWork = ({CURRENT_USER= JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"))}) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12">
      {(CURRENT_USER.staffType.staffCode === 'STAFF_01' || CURRENT_USER.staffType.staffCode === 'STAFF_02') &&
      <Query
      query={ASSIGN_WORK}
      fetchPolicy={"network-only"}
      variables = {{branch: CURRENT_USER.branch.id }}
 
    >{({ loading, error, data, refetch, }) => {
      if (loading) return null;
      if (refetch) {
        console.log(refetch);
      }
      if (error){
        return (<Error errorContent= {error.message}></Error>);
      }
      if (data != null){
      return (
        <TableWithLinks noWasher={data.allWashingMachines.totalCount>0?true:false}  assignWork ={processPendingServing(data)}/>
      );
      }
    }}
    </Query>}
      </div>
      <div className="col-md-12">
      {/* <SalesChart/> */}
      </div>
     
    </div>
    <div className="row">
      <div className="col-md-12">
      <Query
      query={ALL_WASH}
      fetchPolicy={"network-only"}
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
        <BigTable  washer = {data.allWashingMachines.nodes.sort(function(a, b) {
          if (a.washesByWashingMachineId.totalCount <b.washesByWashingMachineId.totalCount) {
            return 1;
          }
          if (a.washesByWashingMachineId.totalCount > b.washesByWashingMachineId.totalCount) {
            return -1;
          }
          return 0;
        })}  allWash ={processAllWash(data.washSearch.nodes, data.allEnvVars.nodes[0].valueKey).filter(value => value.status != 'FINISHED_SERVING')}/>
      );
      }
    }}
    </Query>
      </div>
    </div>
  </div>
);

export default AssignWork;