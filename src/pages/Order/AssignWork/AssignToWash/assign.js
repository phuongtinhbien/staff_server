import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";


let client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  headers: {
    authorization: "BEARER " + localStorage.getItem("luandryStaffPage.staff_key"),
  },
  cache: new InMemoryCache(),

});

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


const ERROR = "Xảy ra lỗi !!!";
const SUCCESS = "Phân công thành công";

const getSortedOrderList = (branch) => {

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

    }
  }

  return index;
}



function assignWork(orderList, washerInfoList, curr_user) {
  // itemResul = {
  //   sn,
  //   re_id,
  //   washer_id,
  //   curr_user
  // }
  let result = [];
  orderList.forEach(order => {
    let isAssigned = false;
    let sn = 1;

    if (isAssigned) {
      result.push({
        sn: sn,
        re_id: order.receiptsByOrderId.nodes[0].id,

        curr_user:curr_user
      });
    }
    
  });
  console.log(result);
  console.log(washerInfoList);




}


function main(branch, curr) {
  let orderList;
  let washInfo;
  getSortedOrderList(branch).then(
    data => {
      if (data.data) {
        orderList = data.data.sortedOrderList.nodes;
        washInfo = data.data.getInfoWasher.nodes;
        console.log(orderList);
        console.log(washInfo);
        assignWork(orderList, washInfo, curr);
      } else if (!data.data || data.errors) {
        console.log(data.errors.toString);
      }
    }
  ).catch(errors => {
    console.log(errors);
  });

}

export default main;