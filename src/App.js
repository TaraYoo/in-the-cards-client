import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Cards from './deck/components/Cards'
import History from './deck/components/History'
import Deck from './deck/components/Deck'
import Edit from './deck/components/Edit'

import Upload from './upload/components/Upload'

toast.configure()

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    if (type === 'success') {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    } else {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }

  render () {
    const { user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        <div>
          <button onClick={this.notify}>Notify</button>
          <ToastContainer autoClose={2500} />
        </div>
        <main className="container">
          <Route exact path='/' render={() => (
            <Cards alert={this.alert} user={user}/>
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/upload' component={Upload} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/history' render={() => (
            <History alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/history/:id' render={(props) => (
            <Deck user={user} alert={this.alert} {...props}/>
          )}/>
          <AuthenticatedRoute user={user} exact path='/history/:id/edit' render={(props) => (
            <Edit user={user} alert={this.alert} {...props}/>
          )}/>
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
