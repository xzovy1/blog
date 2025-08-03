import { Outlet, Link } from 'react-router-dom'
import './App.css'
import BlogPosts from './BlogPosts'
import Login from './Login'
import Navbar from './Navbar'
import { useState, useEffect } from 'react'

function App() {
  return (
    <>
      <Navbar />
      <h1>Hello there!</h1>
      <div>Welcome to my blog. This is where I share my thoughts and ideas.</div>
      {/* <BlogPosts /> */}
    </>
  )
}

export default App
