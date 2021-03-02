import { Component } from 'react'
import PropTypes from 'prop-types'

import Tooltip from '../Tooltip'

class SearchBar extends Component {
    state = {
        text: '',
        alert: { msg: 'Enter search text', type: 'info' },
        showTooltip: false
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        // setAlert: PropTypes.func.isRequired
    }


    onChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.text.length > 0) {
            this.props.searchUsers(this.state.text)
            this.setState({ text: '' })
        }
    }

    onMouseOver = () => {
        this.setState({ showTooltip: true })
    }

    onMouseOut = () => {
        this.setState({ showTooltip: false })
    }

    render() {
        const { clearUsers, isDisabled } = this.props
        return (
            <div className="search-cont">
                <form
                    className="search"
                    onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        name="text"
                        value={this.state.text}
                        onChange={this.onChange}
                        placeholder="Search users"
                    />
                    <input
                        type="submit"
                        value="Search"
                        onMouseOver={this.onMouseOver}
                        onMouseOut={this.onMouseOut}
                        className={this.state.text === '' ? "btn search-btn disabled" : "btn search-btn"}
                    />
                    {
                        this.state.showTooltip &&
                        <Tooltip alert={this.state.alert} />
                    }
                </form>
                <button
                    className="btn clear-btn"
                    onClick={clearUsers}
                    disabled={isDisabled}
                >
                    Clear
                </button>
            </div>
        )
    }
}


export default SearchBar