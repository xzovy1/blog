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
      console.log(d)
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
            <Link to={post.id}>{post.title}</Link>
            <p>{(post.published_date)}</p>

            {/* <p>{post.body}</p> */}
            {/* <h4>Comments</h4> */}
            {/* <ul>
              {post.comments.map(comment => {
                return <li key={comment.id} className='comment'>
                  <p>{comment.author_name}</p>
                  <p>{comment.date}</p>
                  <p>{comment.body}</p>
                </li>
              })}
            </ul> */}
            </div>
        })}
      </div>
    </>
  )
}

export default BlogPosts
