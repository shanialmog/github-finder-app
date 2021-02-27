import PropTypes from 'prop-types'

const UserItem = ({user: { login, avatar_url, html_url }}) => {

    return (
        <div className="user-card center-text">
            <img src={avatar_url} alt="" className="round-img" />
            <h3>{login}</h3>
            <div>
                <a href={html_url} target="_blank" rel="noopener noreferrer" className="btn">Github profile</a>
            </div>
        </div>
    )
}

UserItem.propTypes = {
    user: PropTypes.object.isRequired
}

export default UserItem