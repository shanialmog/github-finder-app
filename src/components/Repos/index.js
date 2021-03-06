import PropTypes from 'prop-types'
import RepoItem from '../RepoItem'


const Repos = ({ repos }) => {
    return (
        <div className="grid-3" >
            {repos.map(repo => <RepoItem repo={repo} key={repo.id} />)}
        </div>
    )
}

Repos.propTypes = {
    repos: PropTypes.array.isRequired
}


export default Repos