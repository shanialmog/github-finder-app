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

  async componentDidMount() {
    this.setState({ isLoading: true })
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}$client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ users: res.data, isLoading: false })
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
        <SearchBar />
          <Users users={this.state.users} isLoading={this.state.isLoading} />
        </div>
      </div >
    )
  }
}

export default App
