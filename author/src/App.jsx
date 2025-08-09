import './App.css'
import Logout from './Logout'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(()=>{
    try{
        fetch(`${import.meta.env.VITE_URL}/api/posts/`, {
          headers: {
          authorization: `bearer ${localStorage.getItem("jwt")}` 
          }
        }).then(response => {
          console.log(response)
          if(response.ok){setIsAuthenticated(true)}
        })
    }catch(e){
      console.error(e)
    }
  },[])

  if(isAuthenticated){
    return (
      <>
        <h1>Hello, author!</h1>
        <div>Welcome to your blog. This is where you can share your thoughts and ideas.</div>
        <Navbar />
        <Logout />
      </>
    )
  }else{
    return(

    <>
      <h1>Looks like there is nothing here.</h1>
      <Link to="/login">Login</Link>
    </>
    )
  }
}

export default App
