import {useReducer} from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING,
    SET_ALERT
} from '../types'

const GithubState = props =>{
    const initialState = {
        users: [],
        user: {},
        repos: [],
        isLoading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)
    
    return <GithubContext.Provider
    value={{
        users: state.users,
        user:  state.user,
        repos: state.repos,
        isLoading: state.isLoading
    }}
    >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState