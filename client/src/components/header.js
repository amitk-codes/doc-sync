import Cookies from 'js-cookie'
import React from 'react'

const Header = () => {
  const handleLogout = () => {
    Cookies.remove('jwtToken')
    Cookies.remove('loggedIn')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className=' container'>
        <a className="navbar-brand logo" href="/">
          Doc Sync
        </a>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className=" nav-link logout-btn" href="/login" onClick={handleLogout}>Logout</a>
          </li>
        </ul>

      </div>

    </nav>
  )
}

export { Header }