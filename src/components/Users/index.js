import { useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import UserItem from '../UserItem'
import Spinner from '../Spinner'

const Users = () => {
    const githubContext = useContext(GithubContext)

    const { users, isLoading, alert } = githubContext

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

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gridGap: '1rem'
}

export default Users