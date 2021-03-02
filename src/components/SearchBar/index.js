import { Component } from 'react'
import PropTypes from 'prop-types'

import Tooltip from '../Tooltip'

class SearchBar extends Component {
    state = {
        text: '',
        alert: { msg: 'Enter search text', type: 'light' }
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
        // if (this.state.text === '') {
        //     this.props.setAlert('Please enter something', 'light')
        // } else {
        this.props.searchUsers(this.state.text)
        this.setState({ text: '' })
        // }
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
                        className="btn search-btn"
                        disabled={this.state.text === ''}
                    />
                </form>
                <button
                    className="btn clear-btn"
                    onClick={clearUsers}
                    disabled={isDisabled}
                >
                    Clear
                </button>
                    {
                        this.state.text === '' &&
                        <Tooltip alert={this.state.alert} />
                    }
            </div>
        )
    }
}


export default SearchBar