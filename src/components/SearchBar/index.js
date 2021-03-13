import { useContext, useState } from 'react'
import GithubContext from '../../context/github/githubContext'

import Tooltip from '../Tooltip'

const SearchBar = ({ history }) => {
    const githubContext = useContext(GithubContext)

    const [text, setText] = useState('')
    const [tooltipText] = useState({ msg: 'Enter search text', type: 'info' })
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
            githubContext.searchUsers(text)
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
                    <Tooltip tooltipTest={tooltipText} />
                }
            </form>
            <button
                className="btn clear-btn"
                onClick={githubContext.clearUsers}
                disabled={githubContext.users.length > 0 ? false : true}
            >
                Clear
                </button>
        </div>
    )
}

export default SearchBar