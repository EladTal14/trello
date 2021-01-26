import { Component } from 'react'
import { eventBusService } from '../../services/eventBusService.js'

export class CardAdd extends Component {
    state = {
        isAddOpen: false,
    }
    componentDidMount() {
        this.eventBusTerminate = eventBusService.on('close-card-add', this.closeInput)
    }

    componentWillUnmount() {
        this.eventBusTerminate()
    }
    openInput = () => {
        this.setState({ isAddOpen: true }, () => {
            this.props.onScroll(null, 1000)
            eventBusService.emit('open-card-add', { isAddOpen: true, groupId: this.props.groupId })
        })
    }

    closeInput = ({ groupId }) => {
        this.setState({ isAddOpen: false }, () => setTimeout(() => {
            if (this.props.groupId === groupId)
                this.props.onScroll(null, 1000)
        }, 150))
    }

    render() {
        const { isAddOpen } = this.state
        return (
            <section className="add-card-container" >
                {!isAddOpen && <button className="add-card-btn" onClick={this.openInput}>
                    <img src="https://res.cloudinary.com/basimgs/image/upload/v1610625350/plus_ljzrkm.png" alt="" />
                    <span>Add another card</span></button>}
            </section>
        )
    }
}
