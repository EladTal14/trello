import { Component } from 'react'

export class BoardFilter extends Component {
    state = {
        filterBy: {
            title: '',
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
            //  () => { this.props.onSetFilter(this.state.filterBy)}
        )
    }

    render() {
        const { filterBy } = this.state
        return (
            <section className="board-filter">
                <input type="text" name="title" value={filterBy.title} onChange={this.handleChange} placeholder="Filter by title..." />
            </section>
        )
    }
}