import React, { Component } from 'react';
import Filters from './Filters';
import TodosList from './TodosList';
import { listTodos, createTodo, updateTodo, deleteTodo } from './todos';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      todos: [],
      filter: 'ALL',
    }
  }

  checkTodo = async (id, isCompleted) => {
    await updateTodo(id, isCompleted);
    const todos = await listTodos(); 
    this.setState({ todos: todos });
  }; 
  
  deleteTodo = async(id) => {
    await deleteTodo(id);
    const todos = await listTodos(); 
    this.setState({ todos: todos }); 
  }

  setFilterToAll = () => {
    this.setState({ filter: "ALL"});
  }

  setFilterToCompleted = () => {
    this.setState({ filter: "COMPLETED"});
  }  

  setFilterToIncompleted = () => {
    this.setState({ filter: "INCOMPLETED"});
  } 

  filterTodos = (todos, filter) => {
    if (filter === 'ALL') {
      return todos;
    } 

    if (filter === 'COMPLETED') {
      return todos.filter((element) => element.isCompleted === 1); // daca element.isCompelted === true, atunci returnam true
    }

    if (filter === 'INCOMPLETED') {
      return todos.filter((element) => element.isCompleted === 0); // daca element.isCompelted === true, atunci returnam true
    }    
  }

  async componentDidMount() {
    const todos = await listTodos(); //await pt ca vreau todos din promisuunea respectiva
    this.setState({ todos: todos }); 
  }

  onInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ inputValue: inputValue })
  }

  onInputKeyPress = async (event) => {
    if(event.nativeEvent.keyCode === 13) {
      await createTodo(this.state.inputValue, false);
      const todos = await listTodos(); 
      this.setState({ todos: todos, inputValue: "" });     }
  }

    render() {
      const filteredTodos = this.filterTodos(this.state.todos, this.state.filter);

      return (
        <div className="container">
          <input className="input" 
                value={this.state.inputValue}
                onChange={this.onInputChange}
                onKeyPress={this.onInputKeyPress}
          />

          <TodosList 
            filteredTodos={filteredTodos} //nu am pus this pt ca var e in interiorul functiei render
            checkTodo={this.checkTodo}
            deleteTodo={this.deleteTodo}
          />

          <Filters 
            setFilterToAll={this.setFilterToAll} 
            setFilterToCompleted={this.setFilterToCompleted} 
            setFilterToIncompleted={this.setFilterToIncompleted}          
          />

        </div>
      );
    }
}

export default TodoList;
