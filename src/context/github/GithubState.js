import { useReducer } from 'react'
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

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        isLoading: false,
        alert: ''
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    const searchUsers = async (text) => {
        setIsLoading()
        setAlert(null)
        try {
            const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
            dispatch({
                type: SEARCH_USERS,
                payload: res.data.items
            })
            if (res.data.items.length < 1) {
                dispatch({
                    type: SET_ALERT,
                    payload: `No search results found for "${text}"`
                })
            }
        } catch (err) {
            dispatch({
                type: SET_ALERT,
                payload: "Error fetching data, please try again"
            })
        }
    }

    const getUserDetails = async (username) => {
        setIsLoading()
        try {
            const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
            dispatch({
                type: GET_USER,
                payload: res.data
            })
            if (Object.keys(res.data.items).length < 1) {
                dispatch({
                    type: SET_ALERT,
                    payload: `No search results found for "${username}"`
                })
            }
        } catch (err) {
            dispatch({
                type: SET_ALERT,
                payload: "Error fetching data, please try again"
            })
        }
    }

    const getUserRepos = async (username) => {
        setIsLoading()
        try {
            const res = await axios.get(`https://api.github.com/users/${username}/repos?sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
            dispatch({
                type: GET_REPOS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: SET_ALERT,
                payload: "Error fetching data, please try again"
            })
        }
    }

    const setIsLoading = () =>
        dispatch({
            type: SET_LOADING
        })

    const setAlert = () =>
        dispatch({
            type: SET_ALERT
        })

    const clearUsers = () =>
        dispatch({
            type: CLEAR_USERS
        })

    return <GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            isLoading: state.isLoading,
            alert: state.alert,
            searchUsers,
            clearUsers,
            getUserDetails,
            getUserRepos
        }}
    >
        {props.children}
    </GithubContext.Provider>
}

export default GithubState