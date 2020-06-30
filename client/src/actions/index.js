import todos from '../apis/todos'


export const createToDo = (formValues) => async (dispatch) => {
    const response = await todos.post('/todos', formValues);
    dispatch({
        type: 'TODO_CREATE', 
        payload: response.data
    },
    // reset('to-dos')
    )
}


export const getToDos = () => async (dispatch) => {
    const response = await todos.get('/todos')
    dispatch({
        type: 'TODOS_GET', 
        payload: response.data
    });   
}

export const editToDo = (id, formValues) => async (dispatch) => {
    const response = await todos.patch(`/todos/${id}`, formValues)
    dispatch({
        type: 'TODOS_EDIT', 
        payload: response.data
    });   
}

export const deleteToDo = (id) => async (dispatch) => {
    await todos.delete(`/todos/${id}`);
    console.log(`deleting id: ${id}`)
    dispatch({
        type: 'TODO_DELETE', 
        payload: id
    })
}

export const getToDo = (todoItem) => {
    return {
        type: 'TODO_GET', 
        payload: todoItem
    }
}

export const deselectActiveToDo = () => {
    return{
        type: 'DESELECT_ACTIVE_TODO', 
    }
}


/// put needs its own URL (so i needed the id) but json server creates its own id
// export const createToDo = (formValues) => async (dispatch) => {
//     const response = await todos.put(`/todos/${id}`, formValues);
//     dispatch({
//         type: 'TODO_CREATE', 
//         payload: response.data
//     })
// }
