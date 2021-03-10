import { useState } from 'react'
import PropTypes from 'prop-types'

import Tooltip from '../Tooltip'

const SearchBar = ({ searchUsers, history, clearUsers, isDisabled }) => {

    const [text, setText] = useState('')
    const [alert, setAlert] = useState({ msg: 'Enter search text', type: 'info' })
    const [showTooltip, setShowTooltip] = useState(false)

    const onChange = (e) => {
        if (text.length === 0) {
            setShowTooltip(false)
        }
        setText(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (text.length > 0) {
            searchUsers(text)
            setText('')
            history.push(`/search?q=${text}`)
        }
    }

    const onMouseOver = () => {
        if (text.length === 0) {
            setShowTooltip(true)
        }
    }

    const onMouseOut = () => {
        setShowTooltip(false)
    }

    return (
        <div className="search-cont">
            <form
                autoComplete="off"
                className="search"
                onSubmit={onSubmit}>
                <input
                    type="text"
                    name="text"
                    value={text}
                    onChange={onChange}
                    placeholder="Search users"
                />
                <input
                    type="submit"
                    value="Search"
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    className={text === '' ? "btn search-btn disabled" : "btn search-btn hover-search-btn"}
                />

                {
                    showTooltip &&
                    <Tooltip alert={alert} />
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

SearchBar.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
}

export default SearchBar