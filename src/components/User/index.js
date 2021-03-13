import { Fragment, useEffect, useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import Spinner from '../Spinner'
import Repos from '../Repos'
import { Link } from 'react-router-dom'



const User = ({ match }) => {
    const githubContext = useContext(GithubContext)

    const { user, isLoading, repos, clearUsers, getUserDetails, getUserRepos, } = githubContext

    useEffect(() => {
        getUserDetails(match.params.login)
        getUserRepos(match.params.login)
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
                        <a href={html_url} target="_blank" rel="noreferrer" className="btn">Github profile</a>
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

export default User