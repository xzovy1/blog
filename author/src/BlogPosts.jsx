import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'


function BlogPosts() {

  const [posts, setPosts] = useState([]);

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
  })


  const handlePublish = async (postId, currentStatus, e) =>{
    const newStatus = !currentStatus
    try{
      await fetch(`${import.meta.env.VITE_URL}/api/posts/${postId}`,
        {
          method: "put",
          headers: { "authorization": `bearer ${localStorage.getItem("jwt")}`, "Content-Type": "application/x-www-form-urlencoded"},
          body: `publishedStatus=${newStatus}`
        }
      )
      
      setPosts(previousPosts => {
        return previousPosts.map(post => {
          return post.id === postId ? {...post, publishedStatus: newStatus} : post
        })
      })
      e.target.blur();
    }catch(err){
      console.error(err);
    }
    }

  return (
      <div>
        <h1>Posts</h1>
        <Link to="/posts/new">Create new Post</Link>
        {posts.map(post => {
          return <li key={post.id} id={post.id} className='post'>
            <Link to={post.id}>{post.title}</Link>
            <p>{new Date(post.published_date).toLocaleString()}</p>
              <button onClick={(e)=>handlePublish(post.id, post.published_status, e)}>{post.published_status == false? "Publish" : "Unpublish"}</button>
          </li>
        })}
      </div>
  )
}

export default BlogPosts
