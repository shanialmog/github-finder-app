import { Component } from 'react'
import PropTypes from 'prop-types'

class SearchBar extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired
    }

    onChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.searchUsers(this.state.text)
        this.setState({ text: '' })
    }

    render() {
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
                        placeholder="Search users" />
                    <input
                        type="submit"
                        value="Search"
                        className="btn search-btn" />
                </form>
                <button
                    className="btn clear-btn"
                    onClick={this.props.clearUsers}
                    disabled={this.props.isDisabled} >
                    Clear
                </button>
            </div>
        )
    }
}


export default SearchBar