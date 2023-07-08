import logo from './logo.svg';
import './App.css';
import React from 'react';


import Navbar from './components/Navbar';
import Home from './components/Home'
import Nutrition from './components/Nutrition';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Workouts from './components/Workouts';
import Profile from './components/Profile';

import { auth } from './config/firebase'

import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
    useLocation,
    Router
  } from "react-router-dom";




function App() {
  var [location, setLocation] = React.useState('');
  // var [signedIn, setSignedIn] = React.useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={location != '/' && <Navbar location={location}/>}>
            <Route index element={<Home setLocation={setLocation}/>}></Route>
            <Route path="/nutrition" element={<Nutrition setLocation={setLocation}></Nutrition>}></Route>
            <Route path="/profile" element={<Profile setLocation={setLocation}></Profile>}></Route>
            <Route path="/workouts" element={<Workouts setLocation={setLocation}></Workouts>}></Route>
            <Route path="/signup" element={<Signup setLocation={setLocation}></Signup>}></Route>
            <Route path="/signin" element={<Signin setLocation={setLocation}></Signin>}></Route>
        </Route>
    )
  )

  return (
      <RouterProvider router={router}>
      </RouterProvider>
  )
}

export default App;
