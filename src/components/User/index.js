import { Fragment, Component } from 'react'
import Spinner from '../Spinner'
import Repos from '../Repos'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'



class User extends Component {
    componentDidMount() {
        this.props.getUserDetails(this.props.match.params.login)
        this.props.getUserRepos(this.props.match.params.login)
    }

    static proptype = {
        isLoading: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        getUserDetails: PropTypes.func.isRequired,
        repos: PropTypes.array.isRequired,
        getUserRepos: PropTypes.func.isRequired
    }

    render() {
        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            company,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable } = this.props.user

        const { isLoading, repos } = this.props
        if (isLoading) return <Spinner />
        else {
            return (
                <Fragment>
                    <Link to="/" className="btn-light">
                        <i className="fas fa-arrow-left" /> Back to search
                    </Link>
                    Hireable: {''}
                    {hireable ? <i className="fas fa-check" /> :
                        <i className="fas fa-times-circle" />
                    }
                    <div className="card grid-2">
                        <div className="center-text user-col1">
                            <img src={avatar_url} className="round-img" alt="user" />
                            <h1>{name}</h1>
                            <h4>Location: {location}</h4>
                            <a href={html_url} className="btn">Github profile</a>
                        </div>
                        <div className="user-col2">
                            {bio &&
                                <Fragment>
                                    <h4>Bio:</h4>
                                    <p>{bio}</p>
                                </Fragment>
                            }
                            <ul>
                                <li>
                                    {login &&
                                        <Fragment>
                                            <strong>Username: </strong> {login}
                                        </Fragment>}
                                </li>
                                <li>
                                    {company &&
                                        <Fragment>
                                            <strong>Company: </strong> {company}
                                        </Fragment>}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card row center-text">
                        <div className="badge">Followers: {followers}</div>
                        <div className="badge">Following: {following}</div>
                        <div className="badge">Public Repos: {public_repos}</div>
                        <div className="badge">Public Gists: {public_gists}</div>
                    </div>
                    <Repos repos={repos}/>
                </Fragment >
            )
        }
    }
}

export default User