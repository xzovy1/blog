import ErrorPage from './ErrorPage';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'


function BlogPosts() {

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/api/posts/`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json()
      })
      .then(data => setPosts(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])
  if (loading) { return <h1>Loading...</h1> }
  if (error) { return <ErrorPage /> }
  return (
    <div>
      <h1>Posts</h1>
      <Link to="/posts/new">Create new Post</Link>
      <br />
      <Link to="/">Go Home</Link>
      {posts.length == 0 ? <p>No posts found</p> :

        posts.map(post => {
          return <div key={post.id} id={post.id} className='post'>
            <PostInfo post={post} setPosts={setPosts} />
          </div>
        })}
    </div>
  )
}
const PostInfo = ({ post, setPosts }) => {
  const [buttonText, setButtonText] = useState(post.published_status == false ? "Publish" : "Unpublish");
  const handlePublish = async (postId, currentStatus, e) => {
    const newStatus = !currentStatus
    try {
      await fetch(`${import.meta.env.VITE_URL}/api/posts/${postId}`,
        {
          method: "put",
          headers: { "authorization": `bearer ${localStorage.getItem("jwt")}`, "Content-Type": "application/x-www-form-urlencoded" },
          body: `publishedStatus=${newStatus}`
        }
      )
      setPosts(previousPosts => {
        return previousPosts.map(post => {
          return post.id === postId ? { ...post, publishedStatus: newStatus } : post
        })
      })
      post.published_status = newStatus //changes post status to re-render component
      setButtonText(post.published_status == false ? "Publish" : "Unpublish")
      e.target.blur();

    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <Link to={post.id}>{post.title}</Link>
      <p>{new Date(post.published_date).toLocaleString()}</p>
      <button onClick={(e) => handlePublish(post.id, post.published_status, e)}>{buttonText}</button>
    </>
  )
}

export default BlogPosts
