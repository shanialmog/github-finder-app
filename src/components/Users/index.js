import UserItem from '../UserItem'
import Spinner from '../Spinner'
import PropTypes from 'prop-types'

const Users = ({ users, isLoading, alert }) => {
    if (isLoading && !alert) {
        return <Spinner />
    } else if (alert) {
        return <div className="error-message">
            <i className="fas fa-info-circle" /> {alert}</div>
    } else {
        return (
            <div style={userStyle}>
                {
                    users.map((user) => (
                        <UserItem key={user.id} user={user} />
                    ))
                }
            </div>
        )
    }
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users