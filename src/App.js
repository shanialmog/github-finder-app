import { Fragment, useState } from 'react'
import './App.css'
import axios from 'axios'
import GithubState from './context/github/GithubState'
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

  const searchUsers = async (text) => {
    setIsLoading(true)
    setAlert(null)
    try {
      const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      setIsLoading(false)
      setUsers(res.data.items)
      if (res.data.items.length < 1) {
        setAlert(`No search results found for "${text}"`)
      }
    } catch (err) {
      setAlert('Error fetching data, please try again')
    }
  }

  const getUserDetails = async (username) => {
    setIsLoading(true)
    setAlert(null)
    try {
      const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      setIsLoading(false)
      setUser(res.data)
      if (Object.keys(res.data.items).length < 1) {
        setAlert(`No search results found for "${username}"`)
      }
    } catch (err) {
      setAlert('Error fetching data, please try again')
    }
  }

  const clearUsers = () => {
    setUsers([])
    setIsLoading(false)
  }

  const getUserRepos = async (username) => {
    setRepos([])
    setIsLoading(true)
    setAlert(null)
    try {
      const res = await axios.get(`https://api.github.com/users/${username}/repos?sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      setRepos(res.data)
      setIsLoading(false)
    } catch (err) {
      setAlert('Error fetching data, please try again')
    }
  }

  const isDisabled = users.length > 0 ? false : true
  return (
    <GithubState>
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
                    {...props}
                  />
                  <Users
                    users={users}
                    isLoading={isLoading}
                    alert={alert}
                  />
                </Fragment>
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  )
}

export default App
