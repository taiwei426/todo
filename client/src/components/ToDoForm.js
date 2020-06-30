import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import {deselectActiveToDo, getToDo} from '../actions'

class ToDoForm extends React.Component{
    componentDidMount(){
        this.props.initialize(this.props.initialValues);
    }
    renderInput = (formProps) => {
        return( 
            <div>
                <input {...formProps.input} autoComplete="off" autoFocus onKeyDown = {this.onKeyPress}></input>
                {formProps.meta.error}
            </div>
        )
    }
    formOnChangeSubmit = (formValues) => {
        this.props.formOnChangeSubmit(formValues)
    }
    formOnSubmit = () => {
        this.props.formOnSubmit()
    }
    onKeyPress = (event) => {
        this.props.arrowsKeyPress(event);
    }
    render(){
        return(
            <form onChange={ () => setTimeout(this.props.handleSubmit(this.formOnChangeSubmit))} onSubmit={this.props.handleSubmit(this.formOnSubmit)} > 
                <div onClick={(e) => e.stopPropagation()} style={{display: `inline-block`}}>
                    <Field name="input" component={this.renderInput} ></Field>
                </div>
            </form>
        )
    }
}

const validate = (formValues) => {
    const error = {};
    if(!formValues.input){
        error.input = ' '
    }
    return error;
}

const mapStateToProps = (state) => {
    return {
        initialValues :  {input: state.activeToDo.input}, 
        activeToDo : state.activeToDo,
        todos: Object.values(state.todos)
    }
}



ToDoForm = reduxForm({
    form: 'create-todo', 
    enableReinitialize : true,
    validate: validate
})(ToDoForm);

export default connect( mapStateToProps, {deselectActiveToDo, getToDo} )(ToDoForm)

// export default ToDoForm;


// form's getting cleared before post response has been resolved
// dispatch(reset('to-dos')) 
// this.props.reset();

// what does settimeout do? and why pass it as another function?

// onClickOut = (meta) => {
//     if(meta.active === false && meta.touched === true){
//         // this.formSubmit();
//         (this.props.handleSubmit(this.formSubmit))(); // Cannot update a component (`ConnectFunction`) while rendering a different component (`Unknown`).
//     }
// }