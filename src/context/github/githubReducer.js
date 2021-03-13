import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING,
    SET_ALERT
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                isLoading: false
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                isLoading: false
            }
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                isLoading: false
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: true,
                alert: null
            }
        case SET_ALERT:
            return {
                ...state,
                alert: action.payload
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                isLoading: false
            }
        default:
            return state
    }
}