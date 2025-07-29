import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(()=>{
    fetch("http://192.168.20.127:8000/api/posts")
    .then((response) =>{
      if(response.status >= 400)throw new Error("server error")
      return response.json()
    })
    .then(d => {
      console.log(d)
     return setPosts(d)
    })
    .catch(err => console.error(err))
  }, [])
  console.log(posts)
  return (
    <>
      <div>
        <h1>Posts</h1>
        {posts.map(post => {
          return <div key={post.id} id={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <h4>Comments</h4>
            </div>
        })}
      </div>
    </>
  )
}

export default App
