import { useParams } from "react-router-dom";

const CommentForm = ({ setComments, comments, setCommenting }) => {
    let params = useParams();
    const { postId } = params;

    async function submitComment(formData) {
        const body = formData.get("body");
        const author = formData.get("author")
        let comment;
        try {
            await fetch(`${import.meta.env.VITE_URL}/api/posts/${postId}/comments`,
                {
                    headers: { "authorization": `bearer ${localStorage.getItem("jwt")}`, "Content-Type": "application/x-www-form-urlencoded" },
                    body: `body=${encodeURIComponent(body)}&author=${encodeURIComponent(author)}`,
                    method: "post",
                    mode: "cors"
                }
            ).then(r => r.json()).then(d => comment = d);
            setComments([
                comment,
                ...comments])
        } catch (err) {
            console.error(err);
        }
        setCommenting(false)
    }

    return (
        <div >
            <form action={submitComment}className="commentForm">
                <span>
                    <label htmlFor="author">Name: </label>
                    <input type="text" id="author" name="author"/>
                </span>
                <label htmlFor="comment-body"></label>
                <textarea name="body" id="comment-body" cols={25} rows={5} placeholder="share your thoughts"></textarea>
                <button type="submit">Submit</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    setCommenting(false);
                }}>
                    Cancel
                </button>
            </form>
        </div>
    )
}

export default CommentForm