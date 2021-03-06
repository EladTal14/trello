import { Component } from 'react'
import { cardService } from '../../services/cardService'
import Loader from 'react-loader-spinner'

export class CardChecklist extends Component {
  state = {
    checklist: null,
    isAddOpen: false,
    newTodoTitle: ''
  }

  componentDidMount() {
    const { checklist } = this.props.card
    this.setState({ checklist })
  }

  onHandleTitleChange = ({ target }) => {
    const { value, name } = target

    this.setState(prevState => ({
      checklist: {
        ...prevState.checklist,
        [name]: value
      }
    }), () => this.props.onHandleChecklistChange(this.state.checklist))
  }

  onHandleTodosChange = (ev, todo) => {
    const { todos } = this.state.checklist
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
    const { name } = ev.target
    todo[name] = value

    const updatedTodos = [...todos]

    this.saveTodos(updatedTodos)
  }

  onRemoveTodo = (idx) => {
    if (this.state.checklist.todos.length === 1) this.props.addOrCancelChecklist(null)

    const todosCopy = [...this.state.checklist.todos]
    todosCopy.splice(idx, 1)
    this.saveTodos(todosCopy)
  }

  saveNewTodo = () => {
    const { todos } = this.state.checklist
    const { newTodoTitle } = this.state
    let todosCopy = [...todos]

    const todoToSave = cardService.createTodo(newTodoTitle)
    todosCopy.push(todoToSave)

    this.saveTodos(todosCopy)
  }

  saveTodos = (updatedTodos) => {
    this.setState(prevState => ({
      checklist: {
        ...prevState.checklist,
        todos: [...updatedTodos]
      },
      newTodoTitle: ''
    }), () => this.props.onHandleChecklistChange(this.state.checklist))
  }

  onHandleNewTodoChange = ({ target }) => {
    const { value } = target
    this.setState({ newTodoTitle: value })
  }

  toggleIsAddOpen = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isAddOpen: !this.state.isAddOpen
      }
    })
  }

  progressBarPrecentage = () => {
    const { checklist } = this.state
    let acc = 0;
    checklist.todos.forEach((todo) => { if (todo.isDone) acc += 1 })

    const todosPrecent = 100 / checklist.todos.length

    if (acc === 0) return 0
    return todosPrecent * acc
  }

  render() {
    const { checklist, isAddOpen, newTodoTitle } = this.state
    if (!checklist) return <div className="loader-wrapper"><Loader className="loader" type="TailSpin" color="gray" height={100} width={100} timeout={3000} /></div>
    return (
      <div className="checklist flex column" >
        <div className="checklist-header flex">
          <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625361/check-box_pzd2ul.png" alt="" />
          <input
            className="my-input"
            type="text"
            name="title"
            placeholder="Checklist"
            value={checklist.title}
            onChange={this.onHandleTitleChange}
          />
        </div>
        <div className="progress-container flex space-between"><p>{Math.floor(this.progressBarPrecentage())}%</p>
          <div className="progress-bar flex"><div style={{ width: `${this.progressBarPrecentage()}%` }} className="todo-progress"></div></div></div>
        {checklist.todos && checklist.todos.map((todo, idx) => {
          return <div className="checklist-todo flex" key={idx}>
            <input
              type="checkbox"
              name="isDone"
              checked={todo.isDone}
              onChange={(ev) => this.onHandleTodosChange(ev, todo)}
            />
            <input
              className="add-todo-input my-input"
              type="text"
              name="title"
              placeholder="Add an item"
              value={todo.title}
              onChange={(ev) => this.onHandleTodosChange(ev, todo)}
            />
            <button className="delete-todo" onClick={() => this.onRemoveTodo(idx)}>✕</button>
          </div>
        })}

        {isAddOpen && <div className="flex">
          <input
            type="text"
            autoFocus
            placeholder="Add an item"
            className="new-todo-input"
            value={newTodoTitle}
            onChange={this.onHandleNewTodoChange}
            onBlur={this.toggleIsAddOpen}
          />
          <button className="save-btn" onMouseDown={this.saveNewTodo} >Save</button>
        </div>}

        {!isAddOpen && <button className="add-todo" onClick={this.toggleIsAddOpen}>Add todo</button>}
      </div >
    )
  }
}
