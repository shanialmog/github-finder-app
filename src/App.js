import { Fragment, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Users from './components/Users'
import SearchBar from './components/SearchBar'
import About from './components/About'
import User from './components/User'

const App = () => {

  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState(null)
  const [error, setError] = useState(null)


  // useEffect(() => {
  //   Object.keys(user).length < 1 ? setError({ error: `No search results found for "${username}"` }) : ''
  // }, [user])

  // useEffect(() => {
  //   Object.keys(repos).length < 1 ? setError({ error: `No repos were found for "${username}"` }) : ''
  // }, [repos])

  const searchUsers = async (text) => {
    setIsLoading(true)
    setAlert(null)
    try {
      const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      setIsLoading(false)
      setUsers(res.data.items)
        // return users.length < 1 ? setError(`No search results found for "${text}"`) : ''
    } catch (err) {
      setError('Error fetching data, please try again')
    }
  }

  const getUserDetails = async (username) => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      setIsLoading(false)
      setUser(res.data.items)
      // return Object.keys(user).length < 1 ? setError({ error: `No search results found for "${username}"` }) : ''
      // })
    } catch (err) {
      setError('Error fetching data, please try again')
    }
  }

  const clearUsers = () => {
    setUsers([])
    setIsLoading(false)
  }

  const getUserRepos = async (username) => {
    setRepos([])
    setIsLoading(true)
    setError(null)
    try {
      const res = await axios.get(`https://api.github.com/users/${username}/repos?sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      setRepos(res.data)
      setIsLoading(false)
    } catch (err) {
      setError('Error fetching data, please try again')
    }
  }

  const isDisabled = users.length > 0 ? false : true
  return (
    <Router>
      <div>
        <Navbar
          clearUsers={clearUsers}
        />
        <div className="container">
          <Switch>
            <Route exact path="/" component={(props) => (
              <Fragment>
                <SearchBar
                  searchUsers={searchUsers}
                  clearUsers={clearUsers}
                  isDisabled={isDisabled}
                  setAlert={setAlert}
                  {...props}
                />
              </Fragment>
            )} />
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" render={props => (
              <User
                {...props}
                getUserDetails={getUserDetails}
                user={user}
                isLoading={isLoading}
                getUserRepos={getUserRepos}
                repos={repos}
                clearUsers={clearUsers}
              />
            )} />
            <Route path="/search" render={props => (
              <Fragment>
                <SearchBar
                  searchUsers={searchUsers}
                  clearUsers={clearUsers}
                  isDisabled={isDisabled}
                  setAlert={setAlert}
                  {...props}
                />
                <Users
                  users={users}
                  isLoading={isLoading}
                  error={error}
                />
              </Fragment>
            )} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
