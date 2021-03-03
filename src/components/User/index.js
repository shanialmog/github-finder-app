import { Fragment, Component } from 'react'
import Spinner from '../Spinner'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'



class User extends Component {
    componentDidMount() {
        this.props.getUserDetails(this.props.match.params.login)
    }

    static proptype = {
        isLoading: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        getUserDetails: PropTypes.func.isRequired
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
        if (isLoading) return <Spinner />
        else {
            return (
                <Fragment>
                    <Link to="/" className="btn">
                        Back to search
                    </Link>
                    Hireable: {''}
                    {hireable ? <i className="fas fa-check" /> :
                        <i className="fas fa-times-circle" />
                    }
                    <div>
                        
                    </div>
                </Fragment>
            )
        }
    }
}

export default User