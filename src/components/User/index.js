import { Fragment, useEffect } from 'react'
import Spinner from '../Spinner'
import Repos from '../Repos'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'



const User = ({user, isLoading, repos, clearUsers, getUserDetails, getUserRepos, match}) => {
    useEffect(() => {
        getUserDetails(match.params.login)
        getUserRepos(match.params.login)
        // eslint-disable-next-line
    }, [])

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
        hireable } = user

    if (isLoading) return <Spinner />
    else {
        return (
            <Fragment>
                <Link to="/" onClick={clearUsers} className="btn-light">
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
                            <li>
                                {blog &&
                                    <Fragment>
                                        <strong>Blog: </strong> <a href={blog}>{blog}</a>
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
                <Repos repos={repos} />
            </Fragment >
        )
    }
}

User.proptype = {
    isLoading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUserDetails: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    getUserRepos: PropTypes.func.isRequired
}

export default User