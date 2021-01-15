import React, { Component } from 'react'
// import { on, emit } from '../services/eventBusService.js'

export class CardChecklist extends Component {

  state = {
    checklist: null,
    isAddOpen: false
  }

  componentDidMount() {
    const { checklist } = this.props.card
    this.setState({ checklist })
    console.log(checklist.todos)
  }

  onHandleInputChange = ({ target }) => {
    const { value } = target
    const { name } = target

    this.setState(prevState => ({
      checklist: {
        ...prevState.checklist,
        [name]: value
      }
    }), () => this.props.onHandleChecklistChange(this.state.checklist))
  }

  onHandleTodosChange = (ev, todo) => {
    let { todos } = this.state.checklist

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

  saveTodos = (todos) => {
    this.setState(prevState => ({
      checklist: {
        ...prevState.checklist,
        todos: [...todos]
      }
    }), () => this.props.onHandleChecklistChange(this.state.checklist))
  }

  openTodo = () => {
    this.setState({
      isAddOpen: !this.state.isAddOpen
    })
    // },() => emit('add-open', { isAddOpen: this.state.isAddOpen }))
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
    const { checklist } = this.state
    const { isAddOpen } = this.state
    if (!checklist) return <div>Loading...</div>
    console.log(checklist.todos)
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
            onChange={this.onHandleInputChange}
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
            name=""
            id=""
            placeholder="Add an item"
            className="my-input"
          />
          <button>save</button>
        </div>}

        {!isAddOpen && <button className="add-todo" onClick={this.openTodo}>Add todo</button>}
      </div >
    )
  }
}
