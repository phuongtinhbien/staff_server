import React, { Component } from 'react';
import { Accordion, Panel } from 'react-bootstrap';

const sumMoney = (data)=>{
    let res=0;
    if (data!= null){
        for (let i=0;i<data.length;i++){
            res = res+ data[i].money;
        }
    }
    return res;
}

const processData = (data)=>{
    if (data){
        for (let i=0;i<data.length;i++){
            data[i].id = i+1;
        }
    }
    return data;
   
}
class ItemCreateOrderDetail extends Component {
  state = {
    todos: [
        {
          id: 1,
          content: 'Sign contract for "What are conference organizers afraid of?"',
          productId: "product",
          materialId: "material",
          amount: "amount",
          colorId: "color",
          serviceType: "service",
          unitId: "unit",
          money: 64656,
          note: "Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. ",
          completed: false
        },
        {
            id: 2,
            content: 'Sign contract for "What are conference organizers afraid of?"',
            productId: "product",
            materialId: "material",
            amount: "amount",
            colorId: "color",
            serviceType: "service",
            unitId: "unit",
            money: 64656,
            note: "Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. ",
            completed: false
          },
          {
            id: 3,
            content: 'Sign contract for "What are conference organizers afraid of?"',
            productId: "product",
            materialId: "material",
            amount: "amount",
            colorId: "color",
            serviceType: "service",
            unitId: "unit",
            money: 64656,
            note: "Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. ",
            completed: false
          },
        
      ]
  };

  toggleComplete = todoId => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === todoId) todo.completed = !todo.completed;
        return todo;
      })
    });
  }

  deleteTodo = todoId => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== todoId)
    });
  }



  render() {
    console.log(this.props.ClothesList)
    if (this.props.ClothesList)
    this.setState({
        todos: this.state.todos.push(processData(this.props.ClothesList))
    });
    
    return (
      <div className="card ">
            <div className="header">
                <h4 className="title">List CLothes</h4>
                <p className="category">Your chosen clothes</p>
            </div>
            <div className="content">
                <form>
            {this.state.todos.map(todo => (
                 <div> <div className={"todo-item"} key={todo.id}>
                        <Accordion>
                            <Panel header={<span><b>&nbsp;&nbsp;{todo.productId.toUpperCase()}</b><b className="caret"></b> </span>}  eventKey="1">
                            <div className="todo-item-wrapper">
                            <div className="todo-content">
                            <ul className="list-unstyled">
                            
                                    <li> <b>Service: </b>{todo.serviceTypeId}</li>
                                    <li> <b>Material: </b>{todo.materialId}</li>
                                    <li> <b>Amount: </b>{todo.amount}</li>
                                    <li> <b>Color: </b>{todo.colorId}</li>
                                    <li> <b>Unit: </b>{todo.unitId}</li>
                                    
                            </ul>
                                <b><i className="pe-7s-info"> </i> Note: </b><i>{todo.note}</i>
                            </div>
                            
                            </div>
                            </Panel>
                        </Accordion>
                        <div className="text-right">
                        <a className="btn btn-danger btn-fill btn-sm ml-2" onClick={() => this.deleteTodo(todo.id)}>
                            Remove
                            </a>
                        </div>
                       
                        </div>
                        </div>
            
        ))}
        
        </form>
    </div>
        <div className="footer">
                <hr />
               
                <div className="row">
                    <div className="col-sm-6">
                        <div className="stats">
                            <i className="pe-7s-cart"></i> Total:&nbsp; {this.state.todos.length} &nbsp;item(s)
                        </div>
                    </div>
                    <div className="col-sm-6 text-right" >
                    
                        <h5 className="title">Money: {sumMoney(this.state.todos)}</h5>
                 
                    </div>
                </div>
                
            </div>
      </div>
    );
  }
}


export default (ItemCreateOrderDetail);
