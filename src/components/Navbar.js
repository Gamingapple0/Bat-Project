import './Navbar.css';
import logo from '../images/bat-project-logo.png';
import { React, useEffect, useState } from 'react';
import Footer from './Footer';
import { NavLink, Outlet } from 'react-router-dom';

import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

function Navbar(props) {
  const [signnedIn, setSignnedIn] = useState(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSignnedIn(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setSignnedIn(user);
      } else {
        setSignnedIn(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  var signed = signnedIn ? 'Sign-Out' : 'Sign-In';

  const navItems = ['', '', '', signed];

  useEffect(() => {
    const navCheck = document.getElementById('nav-check');
    const navLinks = document.querySelector('.nav-links');

    const handleChange = () => {
      if (navCheck.checked) {
        reduceZ()        
      } else {
        setTimeout(increaseZ,400) // Reset to default height
      }
    };

    navCheck.addEventListener('change', handleChange);

    return () => {
      navCheck.removeEventListener('change', handleChange);
    };
  }, []);

  function increaseZ(){
    console.log('The Other rule has been triggered!');
    const el = document.querySelector('.z-applicable')
    if (el){
      el.style.zIndex = 0;
      el.style.position = '';
    }

  }

  // Function to be triggered when the CSS rule is applied
  function reduceZ() {
    console.log('The CSS rule has been triggered!');
    console.log('The Other rule has been triggered!');
    const el = document.querySelector('.z-applicable')
    if (el){
      el.style.zIndex = -1;
      el.style.position = 'relative';
    }
  }

  if (props.location === undefined) {
    var bgDisplay = props.location == '/' ? '' : `url(${process.env.PUBLIC_URL}/images/batman-homepage.jpg)`;
  }

  return (
    <>
      <div style={{ backgroundImage: bgDisplay }} className="nav navbar fadeInDown animate-fadeInDown">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            <NavLink to="/">
              <img className="logo" src={logo} alt="Logo" />
            </NavLink>
          </div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className="nav-links navbar-items">
          <NavLink to="/">Home</NavLink>
          {<NavLink to="/nutrition">Nutrition</NavLink>}
          {signnedIn && <NavLink to="/profile">Profile</NavLink>}
          {<NavLink to="/workouts">Workouts</NavLink>}
          {!signnedIn && <NavLink to={`/signup`}>Sign-Up</NavLink>}
          {signnedIn && <NavLink onClick={handleSignOut}>Sign-Out</NavLink>}
          {!signnedIn && <NavLink to="/signin">Sign-In</NavLink>}
        </div>
      </div>
      <main>
        <Outlet></Outlet>
      </main>

      {props.location && <Footer></Footer>}
    </>
  );
}

export default Navbar;
