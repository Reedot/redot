function Todo(state = ['기본값'], action: any) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, '추가된 값']
    case 'REMOVE_TODO': {
      if (state.length > 0) {
        state.splice(state.length - 1, 1)
        return [...state]
      }
      else
        return [...state]
    }
    default:
      return state
  }
}

export default Todo