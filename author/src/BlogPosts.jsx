import { useEffect, useState } from 'react'
import './App.css'


function BlogPosts() {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/posts/", {
      headers: {
       authorization: `bearer ${localStorage.getItem("jwt")}` 
      }
    })
    .then((response) =>{
      if(response.status >= 400)throw new Error("server error");
      return response.json()
    })
    .then(d => {
     return setPosts(d)
    })
    .catch(err => console.error(err))
  }, [])
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

export default BlogPosts
