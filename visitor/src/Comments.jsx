import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";

const Comments = ({ comments, setComments }) => {
    const [commenting, setCommenting] = useState(false);
    const [replying, setReplying] = useState(false);
    const [comment, setComment] = useState(null)
    const [error, setError] = useState(null)
    const handleReply = (comment) => {
        setComment(comment)
        setCommenting(false);
        setReplying(true)
    }
    return (
        <>
            <h4>Comments</h4>
            {comments.length > 0 ?
                <div className="comments">
                    {comments.map(comment => {
                        return <div key={comment.id} className="card comment">
                            <span>{new Date(comment.date).toDateString()}</span>
                            <span> {comment.author_name}:</span>
                            <div>{comment.body}</div>
                            <Replies replies={comment.replies} />
                            <button onClick={() => handleReply(comment)}>Reply</button> 
                        </div>
                    })}
                </div> : <div>No comments</div>
            }
            {!commenting ?
                <button onClick={() => {setCommenting(true); setReplying(false)}}>Add Comment</button> :
                <CommentForm setComments={setComments} comments={comments} setCommenting={setCommenting} />
            }
            {replying ? 
                <ReplyForm comment={comment} setReplying={setReplying}/> : ""
            }
        </>
    )
}

const ReplyForm = ({ comment, setReplying }) => {
    const [error, setError] = useState(null);
    const handleReply = async (formdata) => {
        const reply = formdata.get("replyBody");
        const author = formdata.get("author")
        await fetch(`${import.meta.env.VITE_URL}/api/posts/comments/${comment.id}`, {

            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "post",
            body: `body=${encodeURIComponent(reply)}&author=${encodeURIComponent(author)}`

        })
            .then(response => response.json())
            .then(response => { if (response.status >= 400) { throw new Error }; })
            .catch(error => setError(error))
    }
    return (
        <>
            {error ? <div style={{ color: "red" }}>an error occurred</div> : ''}
            <form action={handleReply}>
            <div>Replying to: {comment.author_name}</div>
                <span>
                    <label htmlFor="author">Author:</label>
                    <input type="text" name="author" id="author" />
                </span>
                <span>
                    <label htmlFor="replyBody">Reply:</label>
                    <input type="text" name="replyBody" id="replyBody" />
                </span>
                <button>Submit</button>
                <button onClick={()=>setReplying(false)}>Cancel</button>
            </form>
        </>
    )
}

const Replies = ({ replies }) => {
    const [error, setError] = useState(null)
    const [commentReplies, setCommentReplies] = useState(replies);
    if(commentReplies){
        return ( commentReplies.map(reply => {
            return <span key={reply.id} className="card reply">
                {error ? <div style={{ color: "red" }}>an error occurred</div> : ''}
                <span>{new Date(reply.date).toDateString()}</span>
                <span>{reply.author_name}: </span>
                <span>{reply.body}</span>
            </span>
        }))
    }
}
export default Comments