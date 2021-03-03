import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserItem = ({ user: { login, avatar_url, html_url } }) => {

    return (
        <div className="user-card center-text">
            <img src={avatar_url} alt="" className="round-img" />
            <h3>{login}</h3>
            <div>
                <Link to={`/user/${login}`} target="_blank" rel="noopener noreferrer" className="btn">More</Link>
            </div>
        </div>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired
}

export default UserItem