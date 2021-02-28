import { Component } from 'react'
import './App.css'
import axios from 'axios'

import Navbar from './components/Navbar'
import Users from './components/Users'
import SearchBar from './components/SearchBar'

class App extends Component {
  state = {
    users: [],
    isLoading: false
  }

  searchUsers = async (text) => {
    this.setState({ isLoading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ users: res.data.items, isLoading: false })
  }

  clearUsers = () => {
    this.setState({ users: [], isLoading: false })
  }

  // isDisabled = () => {
  //   console.log("wheee")
  //   return (this.state.users.length > 0 ? false : true)
  // }

  render() {
    const isDisabled = this.state.users.length > 0 ? false : true
    return (
      <div>
        <Navbar />
        <div className="container">
          <SearchBar
          searchUsers={this.searchUsers}
          clearUsers={this.clearUsers}
          isDisabled={isDisabled} />
          <Users
          users={this.state.users}
          isLoading={this.state.isLoading} />
        </div>
      </div >
    )
  }
}

export default App
