import { Component, Fragment } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Users from './components/Users'
import SearchBar from './components/SearchBar'
// import Tooltip from './components/Tooltip'
import About from './components/About'

class App extends Component {
  state = {
    users: [],
    isLoading: false,
    alert: null,
    error: null
  }

  searchUsers = async (text) => {
    this.setState({ isLoading: true, error: null })
    try {
      const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
      this.setState({ users: res.data.items, isLoading: false }, () => {
        return this.state.users.length < 1 ? this.setState({error: `No search results found for "${text}"`}) : ''
      })

    } catch (err) {
      this.setState({ error: 'Error fetching data, please try again' })
    }
  }

  clearUsers = () => {
    this.setState({ users: [], isLoading: false })
  }


  render() {
    const { users, isLoading, error } = this.state
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
              <Route exact path='/' component={(props) => (
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
              <Route exact path='/about' component={About}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
