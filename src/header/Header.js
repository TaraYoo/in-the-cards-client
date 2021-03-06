import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
    <Link to="/history">History</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <Link to="/"><h1>In The Cards</h1></Link>
    <nav>
      { user && <span>Welcome, {user.email.split('@')[0]}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
    </nav>
  </header>
)

export default Header
