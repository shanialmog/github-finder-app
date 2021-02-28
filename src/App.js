import { Component } from 'react'
import './App.css'
import axios from 'axios'

import Navbar from './components/Navbar'
import Users from './components/Users'
import SearchBar from './components/SearchBar'
import Alert from './components/Alert'

class App extends Component {
  state = {
    users: [],
    isLoading: false,
    alert: null
  }

  searchUsers = async (text) => {
    this.setState({ isLoading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ users: res.data.items, isLoading: false })
  }

  clearUsers = () => {
    this.setState({ users: [], isLoading: false })
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
  }

  render() {
    const { users, isLoading, alert } = this.state
    const isDisabled = this.state.users.length > 0 ? false : true
    return (
      <div>
        <Navbar />
        <div className="container">
          {
            this.state.alert &&
            <Alert alert={alert} />
          }
          <SearchBar
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            isDisabled={isDisabled}
            setAlert={this.setAlert} />
          <Users
            users={users}
            isLoading={isLoading} />
        </div>
      </div >
    )
  }
}

export default App
