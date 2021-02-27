import { Component } from 'react'
import UserItem from '../UserItem'
import Spinner from '../Spinner'

class Users extends Component {
    render() {
        return (
            <div style={userStyle}>
                <Spinner />
                {
                    this.props.isLoading ?
                        <Spinner />
                        :
                        this.props.users.map((user) => (
                            <UserItem key={user.id} user={user} />
                        ))
                }
            </div>
        )
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users