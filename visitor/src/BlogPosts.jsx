import ErrorPage from './ErrorPage';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'


function BlogPosts() {

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/api/posts/published`, {
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

  return (
    <>
      <Link to={post.id}>{post.title}</Link>
      <p>Published: {new Date(post.published_date).toDateString()}</p>
    </>
  )
}

export default BlogPosts
