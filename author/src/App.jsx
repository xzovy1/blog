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
      <h1>Hello blog post author!</h1>
      <div>Welcome to your blog. This is where to share your thoughts and ideas.</div>
    </>
  )
}

export default App
