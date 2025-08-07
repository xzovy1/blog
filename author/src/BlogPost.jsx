import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import parse from 'html-react-parser'
import CommentForm from "./CommentForm";

const Post = () => {
    const navigate = useNavigate();
    let params = useParams();
    const {postId} = params;
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([])
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_URL}/api/posts/${postId}`)
        .then(res => res.json())
        .then(data => {
            
            setPost({...data, body: parse(data.body)});
            setComments(data.comments);
            
        })
    },[postId])

    const deletePost = async () => {
        if(confirm('Delete post?')){
            const response = await fetch(`${import.meta.env.VITE_URL}/api/posts/${postId}`,
                {
                method: "delete",
                headers: { "authorization": `bearer ${localStorage.getItem("jwt")}`},
                }
            )
            if(!response.ok){throw new Error(`HTTP error. Status: ${response.status}`)}
            const data =  response.json();
            console.log(data)
            navigate('/posts')
        }
    }
    return (
        <div>
                <Link to="/posts">View more posts</Link>
            <div>
                <button onClick={deletePost}>Delete Post</button>
                <button>Edit Post</button>
            </div>
            <h1>{post.title}</h1>
            <h5> Published: {new Date(post.published_date).toLocaleString()}</h5>
            <h5> Updated: {new Date(post.updated_date).toLocaleString()}</h5>
            <div>{post.body}</div>
            <h4>Comments</h4>
            {comments.length > 0 ? 
            <ul>
                {comments.map(comment => {
                    return <li key={comment.id}>
                        <div>{comment.body}</div>
                        <div>-{comment.author_name}</div>
                        <div>{new Date(comment.date).toLocaleString()}</div>
                    </li>
                })}
            </ul> : <div>No comments</div>
            }
            <CommentForm setComments={setComments} comments={comments}/>
        </div>
    )
}
export default Post