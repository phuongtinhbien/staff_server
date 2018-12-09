import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";
require('dotenv').config();

const SORTED_ORDER_LIST = gql `query sortedOrderList($brId: BigFloat!) {
    sortedOrderList(brId: $brId) {
      totalCount
      nodes {
        nodeId
        id
        status
        customerByCustomerId {
          id
          fullName
        }
        deliveryDate
        timeScheduleByDeliveryTimeId {
          id
          timeStart
          timeEnd
        }
        receiptsByOrderId{
          nodes{
            id
            washBagsByReceiptId {
            nodes {
              id
              nodeId
              washBagName
              washBagDetailsByWashBagId {
                nodes {
                  id
                  serviceTypeId
                  colorByColorId {
                    id
                    colorGroupId
                  }
                }
              }
            }
          }
          }
        }
      }
    }
    getInfoWasher(brId: $brId) {
      nodes {
        id
        sum
        pending
        serving
        code
      }
    }
  }
`;


const CLARIFY = gql`mutation clarify ($brId: BigFloat!, $currUser: BigFloat!){
  assignAutoToWash(input:{
    brId:$brId,
    currUser: $currUser
  }){
    boolean
  }
}
`;


const ASSIGN_TYPE_ONE = gql`mutation assignWash ($list: [AssignWorkInput!]){
  assignTypeOneToWash(input: {
    list: $list
  }){
    boolean
  }
}`;

Array.prototype.hasMin = function(attrib) {
  return this.reduce(function(prev, curr){ 
      return prev[attrib] < curr[attrib] ? prev : curr; 
  });
}



const getSortedOrderList = (client,branch) => {
 
      return client.query({
        query: SORTED_ORDER_LIST,
        variables: {
          brId: branch
        },
        fetchPolicy: "network-only"
      });
 
 
}

function findMinWasher (washerInfoList){
  let index;
  for (let i = 0; i < washerInfoList.length; i++) {
    let washer = washerInfoList[i];
    if (washer.pending.length === 0 || washer.pending === null) {
        index = i;
    } 
    else {
      index  = washerInfoList.indexOf(washerInfoList.hasMin('sum'));
      break;
    }
  }

  return index;
}


function assignWorkTypeOne(client,orderList, washerInfoList, curr_user) {
  // itemResul = {
  //   sn,
  //   re_id,
  //   washer_id,
  //   curr_user
  // }
  console.log(orderList);
  let result = [];
  orderList.forEach(order => {
    let sn = 1;
    let index = findMinWasher (washerInfoList);
    if (index != null){
      let washer = washerInfoList[index];
      washer.pending.push(order.id);
      washer.sum = Number(washer.sum)+1;
      sn =  washer.sum;
      result.push({
        sn: sn,
        reId: order.receiptsByOrderId.nodes[0].id,
        washerId: washer.id,
        currUser:curr_user
      });
    }
  });
  console.log(result);
  console.log(washerInfoList);
  if (result){
    client.mutate({mutation: ASSIGN_TYPE_ONE,
    variables:{list:result}}).then(
        result =>{
          if (result){
            console.log("Thanh cong");
          }
        }
    ).catch(error =>{
      console.log(error.message)
    })
  }
}


function main(branch, curr) {
  let orderList;
  let washInfo;
  let client = new ApolloClient({
    uri: 'http://laundryserver.eastus.cloudapp.azure.com:5000/graphql',
    headers: {
      authorization: "BEARER " + localStorage.getItem("luandryStaffPage.staff_key"),
    },
    cache: new InMemoryCache(),
  
  });
  client.mutate({mutation: CLARIFY, variables:{
    brId: branch,
    currUser: curr,
  }}).then(data=>{
    if (data)
  getSortedOrderList(client,branch).then(
    data => {
      if (data.data) {
        orderList = data.data.sortedOrderList.nodes;
        washInfo = data.data.getInfoWasher.nodes;
        assignWorkTypeOne(client,orderList, washInfo, curr);
      } else if (!data.data || data.errors) {
        console.log(data.errors.toString);
      }
    }
  ).catch(errors => {
    console.log(errors);
  });
}).catch(errors => {
  console.log(errors);
});

}

export default main;