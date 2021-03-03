import { Component } from 'react'


class User extends Component {
    componentDidMount() {
        this.props.getUserDetails(this.props.match.params.login)
    }
    render() {
        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable } = this.props.user

        const { isLoading } = this.props
        return (
            <div>
                <h1>{name}</h1>
            </div>
        )
    }
}

export default User