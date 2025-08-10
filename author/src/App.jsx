import './App.css'
import Logout from './Logout'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import Login from './Login'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_URL}/api/posts/`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("jwt")}`
        }
      }).then(response => {
        if (response.ok) { setIsAuthenticated(true) }
      })
    } catch (e) {
      console.error(e)
    }
  }, [])

  if (isAuthenticated) {
    return (
      <>
        <h1>Hello, author!</h1>
        <div>Welcome to your blog. This is where you can share your thoughts and ideas.</div>
        <Navbar />
        <Logout />
      </>
    )
  } else {
    return <Login />
  }
}

export default App
