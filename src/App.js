import { Fragment } from 'react'
import './App.css'
import GithubState from './context/github/GithubState'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Users from './components/Users'
import SearchBar from './components/SearchBar'
import Home from './components/Home'
import About from './components/About'
import User from './components/User'
import NotFound from './components/NotFound'

const App = () => {

  return (
    <GithubState>
      <Router>
        <div>
          <Navbar
          />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login"
                component={User}
              />
              <Route path="/search" render={props => (
                <Fragment>
                  <SearchBar
                    {...props}
                  />
                  <Users
                  />
                </Fragment>
              )} />
              <Route component={NotFound}/>
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  )
}

export default App
