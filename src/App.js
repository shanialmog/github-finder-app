import { Fragment } from 'react'
import './App.css'
import GithubState from './context/github/GithubState'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Users from './components/Users'
import SearchBar from './components/SearchBar'
import About from './components/About'
import User from './components/User'

const App = () => {

  return (
    <GithubState>
      <Router>
        <div>
          <Navbar
          />
          <div className="container">
            <Switch>
              <Route exact path="/" component={(props) => (
                <Fragment>
                  <SearchBar
                    {...props}
                  />
                </Fragment>
              )} />
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
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  )
}

export default App
