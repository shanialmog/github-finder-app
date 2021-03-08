import { Component } from 'react'
import PropTypes from 'prop-types'

import Tooltip from '../Tooltip'

class SearchBar extends Component {
    state = {
        text: '',
        alert: { msg: 'Enter search text', type: 'info' },
        showTooltip: false,
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        isDisabled: PropTypes.bool.isRequired,
    }


    onChange = (e) => {
        if (this.state.text.length === 0) {
            this.setState({ showTooltip: false })
        }
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.text.length > 0) {
            this.props.searchUsers(this.state.text)
            this.setState({ text: '' })
            this.props.history.push(`/search?q=${this.state.text}`)
        }
    }


    onMouseOver = () => {
        if (this.state.text.length === 0) {
            this.setState({ showTooltip: true })
        }
    }

    onMouseOut = () => {
        this.setState({ showTooltip: false })
    }

    render() {
        const { clearUsers, isDisabled } = this.props
        return (
            <div className="search-cont">
                <form
                    autoComplete="off"
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
                        className={this.state.text === '' ? "btn search-btn disabled" : "btn search-btn hover-search-btn"}
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