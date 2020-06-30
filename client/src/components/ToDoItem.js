import React from 'react'
import {connect} from 'react-redux'

import {Field, reduxForm} from 'redux-form'
import {deleteToDo, getToDo} from '../actions'


class ToDoItem extends React.Component{
    onCheck = ({itemId, input}) => {
        if(input.value){
            this.props.deleteToDo(itemId);
        }
    }
    onEditClick = (formProps) => {
        this.props.getToDo(formProps);      
    }
    renderCheckMark = (formProps) => {
        this.onCheck(formProps);
        return (
            <input {...formProps.input} type ="checkbox" value="false"></input> 
        )
    }
    render(){
        const {id, input} = this.props.itemProps
        return(
            <form id = {id}>
                <div onClick={(e) => e.stopPropagation()} style={{display: `inline-block`}}>
                    <Field 
                    name = {input} 
                    component = {this.renderCheckMark} 
                    item = {input} 
                    itemId = {id}/>
                    <span  onClick = {() => this.onEditClick(this.props.itemProps)} >{input}</span> 
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activeToDo : state.activeToDo
    }
}

ToDoItem =  connect(mapStateToProps, {deleteToDo, getToDo})(ToDoItem);


export default reduxForm({
    form: 'items', 
    enableReinitialize : true,
})(ToDoItem)



// is it bad that there's state being saved here when we have redux already?
// i think before, state was on the full form, not each of the items, so inputFieldShown was for all of the items, instead of having one per item
// deleting numbers was a problem - prob bc they all shared the same form. now each checkmark is its own form
// why does the click to show edit input work when console.logging doesn't log true/false like how it'd expect?
// when state changes, not all of the related functions are rerendered
// deleting >1 of the same thing will delete all of them, even though they have different ids