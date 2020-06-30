import _ from 'lodash'

import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'

const todoReducer = (state={}, action) => {
    switch(action.type){
        case 'TODO_CREATE':
            return {...state, [action.payload.id] : action.payload}
        case 'TODOS_GET':
            return {...state, ..._.mapKeys(action.payload, 'id')}
        case 'TODO_DELETE':
            return  _.omit(state, action.payload)
        case 'TODOS_EDIT':
            return {...state, [action.payload.id] : action.payload}
        default:
            return state
    }
}

const activeToDoReducer = (state = {}, action) => {
    switch(action.type){
        case 'TODO_GET':
            return {id: action.payload.id, input : action.payload.input}
        case 'DESELECT_ACTIVE_TODO':
            return {}
        default: 
            return state
    }
}

export default combineReducers({
    todos: todoReducer, 
    activeToDo: activeToDoReducer,
    form: formReducer
})