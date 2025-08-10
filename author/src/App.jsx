import './App.css'
import Logout from './Logout'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import Login from './Login'
import ErrorPage from './ErrorPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/api/posts/`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("jwt")}`
      }
    }).then(response => {
      if (!response.ok) {
        throw new Error("Network err")
      }
      setLoading(false);
      setIsAuthenticated(true);

    })
      .catch(e => setError(e))
      .finally(() => setLoading(false))
  }, [])
  if (loading) { return <><h1>Loading...</h1></> }
  if (isAuthenticated) {
    return (
      <>
        <h1>Hello, author!</h1>
        <div>Welcome to your blog. This is where you can share your thoughts and ideas.</div>
        <Navbar />
        <Logout />
      </>
    )
  } else if (!error) {
    return <Login />
  }
  if (error) { return <ErrorPage /> }
}
export default App