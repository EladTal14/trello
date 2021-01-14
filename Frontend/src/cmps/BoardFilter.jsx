import React, { Component } from 'react'
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import Input from '@material-ui/core/Input';

export class BoardFilter extends Component {

    state = {
        filterBy: {
            title: '',
        }
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        // this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
        //     this.props.onSetFilter(this.state.filterBy)
        // })
    }

    render() {
        const { filterBy } = this.state
        return (
            <section className="board-filter">
                {/* <Input type="text" name="name" value={filterBy.name} onChange={this.handleChange} placeholder="Filter by title..." /> */}
            </section>
        )

    }

}