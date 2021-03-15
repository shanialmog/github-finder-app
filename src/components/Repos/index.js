import {useContext} from 'react'
import GithubContext from '../../context/github/githubContext'
import RepoItem from '../RepoItem'


const Repos = () => {
    const githubContext = useContext(GithubContext)
    return (
        <div className="grid-3" >
            {githubContext.repos.map(repo => <RepoItem repo={repo} key={repo.id} />)}
        </div>
    )
}

export default Repos