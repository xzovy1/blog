import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";

const Comments = ({ comments, setComments }) => {
    const [commenting, setCommenting] = useState(false);
    const [error, setError] = useState(null)
    return (
        <>
            <h4>Comments</h4>
            {comments.length > 0 ?
                <div className="comments">
                    {comments.map(comment => {
                        return <div key={comment.id} className="comment">
                            <span>{new Date(comment.date).toDateString()}</span>
                            <span> {comment.author_name}:</span>
                            <div>{comment.body}</div>
                            <div>
                                <Replies replies={comment.replies} />
                            </div>
                        </div>
                    })}
                </div> : <div>No comments</div>
            }
            {!commenting ?
                <button onClick={() => setCommenting(true)}>Add Comment</button> :
                <CommentForm setComments={setComments} comments={comments} setCommenting={setCommenting} />
            }
        </>
    )
}

const ReplyForm = ({ comment }) => {
    const [error, setError] = useState(null);
    const handleReply = async (formdata) => {
        const reply = formdata.get("replyBody");
        await fetch(`${import.meta.env.VITE_URL}/api/posts/comments/${comment.id}`, {

            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "authorization": `bearer ${localStorage.getItem("jwt")}`,
            },
            method: "post",
            body: `body=${encodeURIComponent(reply)}&author=author`

        })
            .then(response => response.json())
            .then(response => { if (response.status >= 400) { throw new Error }; })
            .catch(error => setError(error))
    }
    return (
        <>
            {error ? <div style={{ color: "red" }}>an error occurred</div> : ''}
            <form action={handleReply}>
                <label htmlFor="replyBody">Reply:</label>
                <input type="text" name="replyBody" id="replyBody" />
                <button>Reply</button>
            </form>
        </>
    )
}

const Replies = ({ replies }) => {
    const [error, setError] = useState(null)
    const [commentReplies, setCommentReplies] = useState(replies);
    const deleteReply = async (id) => {
        console.log(id)
        if (confirm('Delete reply?')) {
            await fetch(`${import.meta.env.VITE_URL}/api/posts/replies/${id}`,
                {
                    method: "delete",
                    headers: { "authorization": `bearer ${localStorage.getItem("jwt")}` },
                }
            )
                .then(response => {
                    if (!response.ok) { throw new Error(`HTTP error. Status: ${response.status}`) }
                })
                .catch(error => setError(error))
            setCommentReplies(commentReplies.filter(r => r.id !== id))

        }
    }
    if(commentReplies){
        return ( commentReplies.map(reply => {
            return <div key={reply.id}>
                {error ? <div style={{ color: "red" }}>an error occurred</div> : ''}
                <span>{reply.author_name} </span><span>{new Date(reply.date).toDateString()}</span>
                <p>{reply.body}</p>
                <button onClick={() => deleteReply(reply.id)}>Delete</button>
            </div>
        }))
    }
}
export default Comments