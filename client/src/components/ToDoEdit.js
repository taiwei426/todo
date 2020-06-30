import React from 'react';
import {connect} from 'react-redux'

import ToDoForm from './ToDoForm'
import {editToDo, deselectActiveToDo, getToDo} from '../actions'

class ToDoEdit extends React.Component{
    constructor(props){
        super(props)
        this.handleKeyDown = this.arrowsKeyPress.bind(this)
    }
    formOnChangeSubmit = (formValues) => {
        this.props.editToDo(this.props.activeToDo.id, formValues)
    }
    getNextItem = (event) => {
        this.props.todos.forEach( el => {
            if(el.id === this.props.activeToDo.id){
                var nextItemIndex = -1;
                if(event === 'enter' || event === 40 || event === 9){
                    nextItemIndex = this.props.todos.indexOf(el) + 1;
                } else if (event === 38){
                    nextItemIndex = this.props.todos.indexOf(el) - 1;
                }
                if(nextItemIndex === this.props.todos.length){
                    this.props.deselectActiveToDo();
                }else if(nextItemIndex === -1){
                    return null //is this allowed?
                }else{
                    this.props.getToDo(this.props.todos[nextItemIndex])
                }
            }
        })
    }
    formOnSubmit = () => {
       this.getNextItem('enter');
    }
    arrowsKeyPress = (event) => {
        if(event.keyCode === 38){
            this.getNextItem(38);
        }else if(event.keyCode === 40){
            this.getNextItem(40);
        }else if(event.keyCode === 9){
            // this.getNextItem(9);
        }
    }
    render(){
        return (
            <ToDoForm formOnChangeSubmit = {this.formOnChangeSubmit} formOnSubmit = {this.formOnSubmit} arrowsKeyPress = {this.arrowsKeyPress}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeToDo : state.activeToDo,
        todos: Object.values(state.todos)
    }
}

export default connect(mapStateToProps, {editToDo, deselectActiveToDo, getToDo})(ToDoEdit);

// can set initial states on the form itself or where it's getting called. in this case, we have to set it on the form itself (i think) bc of this.props.initialize(this.props.initialValues) in componentDidMount
// // <ToDoForm id={this.props.itemProps.id} formSubmit = {this.formSubmit} initialValues={this.props.initialValues}/>
// const mapStateToProps = (state) => {
//     return {
//         initialValues : {input: state.activeToDo}
//     }
// }