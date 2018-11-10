import gql from "graphql-tag";
import React from 'react';
import { Query } from 'react-apollo';
import Error from './../../Error';
import BigTable from './BigTable';
import TableWithLinks from './TableWithLinks';


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
}`;

const processPendingServing = (data)=>{
  let a = data.getprepareorderserving.nodes;
  let res =[];
  for (let i =0;i<a.length;i++){
    res.push({
      nodeId: a[i].nodeId,
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

function removeDuplicates(arr){
  var newarr = [];
  var unique = {};
   
  arr.forEach((item, index) =>{
      if (!unique[item.orderId]) {
          newarr.push(item);
          unique[item.orderId] = item;
      }
  });
  return newarr ;
}

const processAllWash = (data)=>{

      let res =[];

      if (data){
        for (let i=0;i<data.length;i++){
            let row = {
              sn: data[i].sn,
              orderId: data[i].customerOrderId,
              receiptId: data[i].receiptId,
              wbName: data[i].wbName,
              washerCode: data[i].washerCode,
              status: data[i].status,
              customerName: data[i].customerName
            }
            res.push(row);
        }
      }

      return removeDuplicates(res);
}


const AssignWork = ({CURRENT_USER= JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"))}) => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12">
      {CURRENT_USER.staffType.staffCode === 'STAFF_01' &&
      <Query
      query={ASSIGN_WORK}
      
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
        <TableWithLinks  assignWork ={processPendingServing(data)}/>
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
        <BigTable  allWash ={processAllWash(data.washSearch.nodes)}/>
      );
      }
    }}
    </Query>
      </div>
    </div>
  </div>
);

export default AssignWork;