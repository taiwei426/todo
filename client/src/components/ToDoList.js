import React from 'react';
import {connect} from 'react-redux'


import ToDoItem from './ToDoItem'
import {getToDos} from '../actions'
import ToDoEdit from './ToDoEdit'

class ToDoList extends React.Component{
    componentDidMount(){
        this.props.getToDos();
    }
    render(){
        if(!this.props.todos){
            return <div>loading...</div>
        }
        return this.props.todos.map( (el) => {
            if(el.id === this.props.activeToDo.id){
                // return <div>edit item</div>
                return <ToDoEdit itemProps={el}  key = {el.id}/>
            } else {
                return <ToDoItem itemProps={el}  key = {el.id}/>
            }
        })
    }
}

const mapStateToProps = (state) => {
    return {
        todos : Object.values(state.todos), 
        activeToDo : state.activeToDo
    }
}

export default connect(mapStateToProps, {getToDos})(ToDoList);



// ToDoList = connect(mapStateToProps, {getToDos})(ToDoList);

// export default reduxForm({
//     form: 'list'
// })(ToDoList)



// TO DO
// when checkboxing numbers at the beginning, will throw error
// when 2 items have the same input, will delete both

// need to spread the formProps.input onto input in order to get onChange, etc props 


// this.itemRef was only for the last item
// componentDidMount(){
//    this.itemRef = React.createRef(); 
// }
{/* <div id = {formProps.itemId} ref={this.itemRef}> */}


//forgot e.target
