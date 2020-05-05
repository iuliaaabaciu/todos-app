import React from 'react';

const TodosList = (props) => {
  return (
    <div className="todosList">
      {props.filteredTodos.map((element) => {
        return <label key={element.id} className="todo">
          <input 
            type="checkbox" 
            checked={ element.isCompleted } 
            onChange={(event) => {
              props.checkTodo(element.id, event.target.checked)
            }} 
          />
          { element.title } 
          <button onClick={ () => props.deleteTodo(element.id)}>x</button>
        </label>
      })}
    </div>    
  )
}

export default TodosList;