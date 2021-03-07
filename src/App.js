import { Component, Fragment } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Users from './components/Users'
import SearchBar from './components/SearchBar'
import About from './components/About'
import User from './components/User'

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
    alert: null,
    error: null
  }

  searchUsers = async (text) => {
    this.setState({ isLoading: true, error: null })
    try {
      const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      this.setState({ users: res.data.items, isLoading: false }, () => {
        return this.state.users.length < 1 ? this.setState({ error: `No search results found for "${text}"` }) : ''
      })

    } catch (err) {
      this.setState({ error: 'Error fetching data, please try again' })
    }
  }

  getUserDetails = async (username) => {
    this.setState({ isLoading: true, error: null })
    try {
      const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      this.setState({ user: res.data, isLoading: false }, () => {
        return Object.keys(this.state.user).length < 1 ? this.setState({ error: `No search results found for "${username}"` }) : ''
      })

    } catch (err) {
      this.setState({ error: 'Error fetching data, please try again' })
    }
  }

  clearUsers = () => {
    this.setState({ users: [], isLoading: false })
  }

  getUserRepos = async (username) => {
    this.setState({ repos: [], isLoading: true, error: null })
    try {
      const res = await axios.get(`https://api.github.com/users/${username}/repos?sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      this.setState({ repos: res.data, isLoading: false }, () => {
        return Object.keys(this.state.user).length < 1 ? this.setState({ error: `No search results found for "${username}"` }) : ''
      })

    } catch (err) {
      this.setState({ error: 'Error fetching data, please try again' })
    }
  }


  render() {
    const { users, isLoading, error, user, repos } = this.state
    console.log(typeof repos)
    const isDisabled = this.state.users.length > 0 ? false : true
    return (
      <Router>
        <div>
          <Navbar />
          <div className="container">
            {/* {
              this.state.alert &&
              <Tooltip alert={alert} />
            } */}
            <Switch>
              <Route exact path="/" component={(props) => (
                <Fragment>
                  <SearchBar
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    isDisabled={isDisabled}
                    setAlert={this.setAlert}
                    {...props}
                  />
                </Fragment>
              )} />
              {/* <Route exact path='/' render={props => (
                <Fragment>
                  <SearchBar
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    isDisabled={isDisabled}
                    setAlert={this.setAlert}
                  />
                  <Users
                    users={users}
                    isLoading={isLoading}
                    error={error}
                  />
                </Fragment>
              )} /> */}
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render={props => (
                <User
                  {...props}
                  getUserDetails={this.getUserDetails}
                  user={user}
                  isLoading={isLoading}
                  getUserRepos={this.getUserRepos}
                  repos={repos}
                />
              )} />
              <Route path="/search" render={props => (
                <Fragment>
                  <SearchBar
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    isDisabled={isDisabled}
                    setAlert={this.setAlert}
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
}

export default App
