import { Component } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import UserItem from './components/UserItem'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <UserItem />
      </div>
    )
  }
}

export default App
