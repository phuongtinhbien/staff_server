import gql from 'graphql-tag';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BranchForm from './branchForm';
import Error from '../../Error';
import { Query } from 'react-apollo';
const SERVICE_QUERY = gql`query allService {
    allServiceTypes{
      nodes{
        nodeId
        serviceTypeName
        id
      }
    }
  }`;
const optionValue = (val,lab )=>{
    return {value: val,label: lab};
  }
  
  const processOption =  (data, type)=>{
  let res=[];
  if (data!= null){
    for (let i = 0; i<data.length;i++){
        res.push(optionValue(data[i].id, data[i].serviceTypeName));
      
    }
  }
  return res;
  
}
class EditBranch extends Component {
    state = {
        data: this.props,
        show: true,
        deleteItem: false,
        error: false
      };

      
      render(){
        let {match,data} = this.props;
          return(
           
            <div className="container-fluid">
              <Query query={SERVICE_QUERY} >
                {({loading, error,data, refetch}) => {
                  if (loading) return null;
                  if (error){
                    return (<Error errorContent= {error.message}></Error>);
                   }
                  if (data!= null){
                    console.log(data);
                    return  (
                    //    <Mutation
                    //             mutation={CREATE_ORDER}
                    //             onCompleted={data=> {
                  
                    //               this.showNotification("Tạo đơn hàng mới thành công", "success") 
                    //               handleOnCompleted(data,history)
                    //              }}
                    //             onError={error => this.showNotification(error.message, "error")}
                    //           >
                    //           {
                    //             (createCusOrderAndDetail) =>(
                    //             <div>
                    <BranchForm allService = {processOption(data.allServiceTypes.nodes)}></BranchForm>
                                
                                  
                    //             </div>
                    //             )
                    //           }
                      
                    //   </Mutation>
                    );
                    
                  }
                }
                }
                </Query>

            
            </div>
      
          );
      }
}

export default withRouter(EditBranch);