import UserItem from '../UserItem'
import Spinner from '../Spinner'
import PropTypes from 'prop-types'

const Users = ({ users, isLoading, error }) => {
    console.log(error)
    if (isLoading && !error) {
        return <Spinner />
    } else if (error) {
        return <div className="error-message">
            <i className="fas fa-info-circle" /> {error}</div>
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