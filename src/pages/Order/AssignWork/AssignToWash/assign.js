import ApolloClient from 'apollo-boost';
import gql  from "graphql-tag";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { get } from 'https';


const client = new ApolloClient({ uri: 'http://localhost:5000/graphql' ,
headers:{
  authorization: "BEARER "+localStorage.getItem("luandryStaffPage.staff_key"),
},
cache: new InMemoryCache(),

});

const SORTED_ORDER_LIST = gql`query sortedOrderList($brId: BigFloat!) {
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

const getSortedOrderList =  (branch)=>{

    return client.query({query: SORTED_ORDER_LIST, 
        variables: {brId:branch }, 
        fetchPolicy: "network-only" });
}



function assignWork (orderList,washInfo){
    let newWashInfo = initData(washInfo);

   
    

}


function main (branch, curr){
    let orderList;
    let washInfo;
    getSortedOrderList(branch).then(
        data => {
            if (data.data){
                orderList = data.data.sortedOrderList.nodes;
                washInfo = data.data.getInfoWasher.nodes;
                console.log(orderList);
                console.log(washInfo);
                assignWork (orderList,washInfo);
            }
            else if (!data.data || data.errors){
                console.log(data.errors.toString);
            }
        }
    ).catch(errors=>{
        console.log(errors);
    });
    
}

export default main;