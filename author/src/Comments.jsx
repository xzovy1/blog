import { useState } from "react";

const Comments = ({ comments, setComments }) => {
    const [commenting, setCommenting] = useState(false);

    return (
        <>
            <h4>Comments</h4>
            {comments.length > 0 ?
                <ul>
                    {comments.map(comment => {
                        return <li key={comment.id} className="comment">
                            <span>{new Date(comment.date).toLocaleString()}</span>
                            <span> {comment.author_name}:</span>
                            <div>{comment.body}</div>
                            <ReplyForm comment={comment} />
                        </li>
                    })}
                </ul> : <div>No comments</div>
            }
            {!commenting ?
                <button onClick={() => setCommenting(true)}>Add Comment</button> :
                <CommentForm setComments={setComments} comments={comments} setCommenting={setCommenting} />
            }
        </>
    )
}

const ReplyForm = ({ comment }) => {
    console.log(comment)
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
            .then(response => { if (response.status >= 400) { throw new Error }; })
            .catch(error => setError(error))
    }
    return (
        <>
            {error ? <div style={{ color: "red" }}>an error occurred</div> : ''}
            <form action={handleReply} method="post" encType='application/x-www-form-urlencoded'>
                <label htmlFor="replyBody">Reply:</label>
                <input type="text" name="replyBody" id="replyBody" />
                <button>Reply</button>
            </form>
        </>
    )
}

export default Comments