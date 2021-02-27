import { Component } from 'react'
import './App.css'
import axios from 'axios'

import Navbar from './components/Navbar'
import Users from './components/Users'

class App extends Component {
  state = {
    users: [],
    isLoading: false
  }

  async componentDidMount() {
    this.setState({isLoading: true})
    const res = await axios.get('https://api.github.com/users')
    this.setState({users: res.data, isLoading: false})
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Users users={this.state.users} isLoading={this.state.loading}/>
        </div>
      </div >
    )
  }
}

export default App
