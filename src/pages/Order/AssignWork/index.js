import React from 'react';
import TableWithLinks from './TableWithLinks';
import BigTable from './BigTable';
import { Query, Mutation } from 'react-apollo';
import gql  from "graphql-tag";
import Error from './../../Error';
import SalesChart from './SalesChart';


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
    })
  }
    return res;
}

const CURRENT_USER = JSON.parse(localStorage.getItem("luandryStaffPage.curr_staff_desc"));
const AssignWork = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
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
        <TableWithLinks  assignWork ={processPendingServing(data)}/>
      );
      }
    }}
    </Query>
        
      </div>
      <div className="col-md-6">
      <SalesChart/>
      </div>
     
    </div>
    <div className="row">
      <div className="col-md-12">
        <BigTable />
      </div>
    </div>
  </div>
);

export default AssignWork;