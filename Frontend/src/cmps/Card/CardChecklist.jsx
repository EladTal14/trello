import { Component } from 'react'
import { cardService } from '../../services/cardService'
// import { on, emit } from '../services/eventBusService.js'

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

    let updatedTodos = todos.map((currTodo) => {
      if (currTodo.id === todo.id) {
        if (ev.target.type === 'checkbox') currTodo.isDone = !currTodo.isDone
        else currTodo.title = ev.target.value
      }
      return currTodo
    })

    this.saveTodos(updatedTodos)
  }

  onRemoveTodo = (idx) => {
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
    this.setState(prevState => {
      return {
        ...prevState,
        newTodoTitle: value
      }
    })
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
    if (!checklist) return <div>Loading...</div>
    return (
      <div className="checklist flex column" >
        <div className="checklist-header flex">
          <span>L </span>
          <input
            className="my-input"
            type="text"
            name="title"
            placeholder="Checklist"
            value={checklist.title}
            onChange={this.onHandleTitleChange}
          />
        </div>
        <div className="progress-bar"><div style={{ width: `${this.progressBarPrecentage()}%` }}></div></div>
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
            <button onClick={() => this.onRemoveTodo(idx)}>✕</button>
          </div>
        })}

        {isAddOpen && <div>
          <input
            type="text"
            autoFocus
            placeholder="Add an item"
            className="my-input"
            value={newTodoTitle}
            onChange={this.onHandleNewTodoChange}
            onBlur={this.toggleIsAddOpen}
          />
          <button onMouseDown={this.saveNewTodo} >Save</button>
        </div>}

        {!isAddOpen && <button className="add-todo" onClick={this.toggleIsAddOpen}>Add todo</button>}
      </div >
    )
  }
}
