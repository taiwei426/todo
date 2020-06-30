import React from 'react'
import {connect} from 'react-redux'

import ToDoList from './ToDoList'
import ToDoCreate from './ToDoCreate'

import {deselectActiveToDo} from '../actions'

class App extends React.Component{
    render(){
        return(
            <div onClick ={() => this.props.deselectActiveToDo()} style={{minHeight: '100vh'}}>
                <h3>To Do</h3>
                <ToDoList />
                <ToDoCreate />
            </div>
        )
    }
}



export default connect(null, {deselectActiveToDo})(App);