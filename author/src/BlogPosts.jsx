import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
      if(response.status >= 403){
        throw new Error("server error");
      }
      return response.json()
    })
    .then(d => {
     return setPosts(d)
    })
    .catch(err => console.error(err))
  }, [])
  return (
      <div>
        <h1>Posts</h1>
        <Link to="/api/posts/new">Create new Post</Link>
        {posts.map(post => {
          return <li key={post.id} id={post.id}>
            <Link to={post.id}>{post.title}</Link>
            <p>Post Status: {post.published_status == true? "Published" : "Unpublished"}</p>
            <p>{new Date(post.published_date).toLocaleString()}</p>

          </li>
        })}
      </div>
  )
}

export default BlogPosts
