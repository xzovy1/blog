import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Link, Form } from "react-router-dom";
import parse from 'html-react-parser'
import CommentForm from "./CommentForm";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Post = () => {
    const [editing, setEditing] = useState(false)
    const navigate = useNavigate();
    let params = useParams();
    const { postId } = params;
    const [post, setPost] = useState({ body: "" });
    const [comments, setComments] = useState([])
    useEffect(() => {
        fetch(`${import.meta.env.VITE_URL}/api/posts/${postId}`)
            .then(res => res.json())
            .then(data => {

                setPost({ ...data, body: data.body });
                setComments(data.comments);

            })
    }, [postId])

    const deletePost = async () => {
        if (confirm('Delete post?')) {
            const response = await fetch(`${import.meta.env.VITE_URL}/api/posts/${postId}`,
                {
                    method: "delete",
                    headers: { "authorization": `bearer ${localStorage.getItem("jwt")}` },
                }
            )
            if (!response.ok) { throw new Error(`HTTP error. Status: ${response.status}`) }
            const data = response.json();
            console.log(data)
            navigate('/posts')
        }
    }
    const toggleEdit = () => {
        return setEditing(!editing);
    }
    return (
        <div>
            <Link to="/posts">View more posts</Link>
            <div>
                <button onClick={deletePost}>Delete Post</button>
                <button onClick={() => setEditing(!editing)}>{!editing ? "Edit Post" : "Cancel Edit"}</button>
            </div>
            <h1>{post.title}</h1>
            <h5> Published: {new Date(post.published_date).toLocaleString()}</h5>
            <h5> Updated: {new Date(post.updated_date).toLocaleString()}</h5>

            <div>
                {!editing ? <div>{parse(post.body)}</div> : <UpdateForm post={post} setPost={setPost} setEditing={setEditing} />}

            </div>
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
            <CommentForm setComments={setComments} comments={comments} />
        </div>
    )
}
const UpdateForm = ({ post, setPost, setEditing }) => {
    const editorRef = useRef(null);
    const [title, setTitle] = useState(post.title);
    const log = () => {
        if (editorRef.current) {
            return editorRef.current.getContent() //optional: {format: 'text'}
        }
    }
    async function updatePost(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        let title = formData.get("title");
        if (title == '') { title = new Date().toLocaleDateString() };
        console.log(title)
        await fetch(`${import.meta.env.VITE_URL}/api/posts/${post.id}`,
            {
                method: "put",
                headers: { "authorization": `bearer ${localStorage.getItem("jwt")}`, "Content-Type": "application/x-www-form-urlencoded" },
                body: `title=${encodeURIComponent(title)}&body=${log()}`,
            }
        )
            .then(r => r.json())
            .then(d => {
                console.log(d)
                setEditing(false);
                setPost(d);
            })

    }
    const apiKey = import.meta.env.VITE_TINYMCE;
    return (
        <Form onSubmit={updatePost} method="put">
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button type="submit">Update Post</button>
            <Editor
                id="body"
                name="body"
                apiKey={apiKey}
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue={post.body}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />

        </Form>
    )
}

export default Post