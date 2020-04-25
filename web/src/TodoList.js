import React, { Component } from 'react';
import './index.css';
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
    this.setState({ todos: todos }) 
  }; 
  
  async componentDidMount() {
    const todos = await listTodos(); //await pt ca vreau todos din promisuunea respectiva
    this.setState({ todos: todos }) 
  }

  onInputChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ inputValue: inputValue })
  }

  onInputKeyPress = async (event) => {
    if(event.nativeEvent.keyCode === 13) {
      await createTodo(this.state.inputValue, false);
      const todos = await listTodos(); 
      this.setState({ todos: todos }) 
    }
  }

    render() {
      return (
        <div>
          <input className='input' 
                value={this.state.inputValue}
                onChange={this.onInputChange}
                onKeyPress={this.onInputKeyPress}
          />

          {this.state.todos.map((element) => {
            return <label key={element.id} className="todo">
              <input 
                type="checkbox" 
                checked={ element.isCompleted } 
                onChange={(event) => {
                  this.checkTodo(element.id, event.target.checked)
                }} 
              />
              { element.title }
            </label>
          })}
        </div>
      );
    }
}

export default TodoList;
