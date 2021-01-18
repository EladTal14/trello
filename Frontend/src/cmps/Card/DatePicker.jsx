import { Component } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CSSTransition } from 'react-transition-group'

export class DatePicker extends Component {

    state = {
        mounted: false,
        value: new Date()
    }

    componentDidMount() {
        this.setState({ mounted: true })
    }

    onClose = () => {
        this.setState({ mounted: false })
    }

    onChange = (value) => {
        this.setState({ value }, () => this.props.onSavedueDate((this.state.value + '').substring(4, 32)))
        this.setState({ mounted: false })
    }


    render() {
        const { value, mounted } = this.state
        return (
            <CSSTransition in={mounted} classNames="modal" timeout={300} onExited={this.props.toggleDate}>
                <div className="date-picker">
                    <button onClick={this.onClose} className="close-date-btn">✕</button>
                    <Calendar style={{ zIndex: 2000, position: 'absolute' }}
                        onChange={this.onChange}
                        value={value}
                    />
                </div>
            </CSSTransition>
        )
    }
}
