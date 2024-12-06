import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom';
// import './header.css';
import { useState } from 'react';
import '../styles/header.css'
import {AuthContext} from '../context/AuthContext'


const Header = () => {
    const [id, setId] = useState(29)
    const {auth, logout, isAdmin} = useContext(AuthContext)
  return (
    <header>
        <nav>
           <ul>
            <li>
                <NavLink to ='/'
                className={({isActive}) => isActive ? 'active' : 'inactive'
                }
                > Home</NavLink>
            </li>
            {auth && isAdmin() && (
            <li>
                <NavLink to ="/article/addArticle"> Add Article</NavLink>
            </li>
            )}
            {/* Affiche le lien vers le dashboard uniquement si l'utilisateur est admin */}
            {auth && isAdmin() && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
            <li>
                <NavLink to ="/register"> Register</NavLink>
            </li>
            <li>
            { auth ?
            <button className="logout-btn" onClick={logout}>Logout</button>
            :
            <Link to= '/sign'>Login</Link>
            }
            </li>
           </ul>
        </nav>
    </header>
      

  )
}

export default Header