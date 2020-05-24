import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../store/actions/todo'
import { RootState } from '../store/reducers'


function useTodo() {
  const dispatch = useDispatch()

  const state = useSelector((store: RootState) => store.todoReducer)

  const addTodo = () => dispatch(actions.addTodo())
  const removeTodo = () => dispatch(actions.removeTodo())

  return {
    state,
    addTodo,
    removeTodo
  }
}

export default useTodo