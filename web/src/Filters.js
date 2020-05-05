import React, { Component } from 'react';

const Filters = (props) => {
  return (
    <div>
      <button onClick={props.setFilterToAll}>All</button>
      <button onClick={props.setFilterToCompleted}>Completed</button>
      <button onClick={props.setFilterToIncompleted}>Incompleted</button>
  </div>
  )
}

export default Filters;