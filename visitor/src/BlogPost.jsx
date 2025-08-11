import ErrorPage from "./ErrorPage";
import Comments from "./Comments";
import parse from 'html-react-parser'
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Post = () => {
    let params = useParams();
    const { postId } = params;
    const [post, setPost] = useState({ body: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/api/posts/${postId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status >= 400) {
                    throw new Error("server error");
                }
                setPost({ ...data, body: data.body });
                setComments(data.comments);
            })
            .catch(e => setError(e))
            .finally(() => setLoading(false))
    }, [postId])

    if (loading) { return <h1>Loading...</h1> }
    if (error) { return <ErrorPage /> }
    return (
        <div>
            <Link to="/">View more posts</Link>
            <h1>{post.title}</h1>
            <h5> Published: {new Date(post.published_date).toDateString()}</h5>
            <h5> Updated: {new Date(post.updated_date).toDateString()}</h5>
            <div id="blogPostBody">
                 <div>{parse(post.body)}</div>
            </div>
            <Comments comments={comments} setComments={setComments} postId={postId} />
        </div>
    )
}

export default Post