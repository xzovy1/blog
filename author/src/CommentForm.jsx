import { useParams } from "react-router-dom";

const CommentForm = ({ setComments, comments, setCommenting }) => {
    let params = useParams();
    const { postId } = params;

    async function submitComment(formData) {
        const body = formData.get("body");
        let comment;
        try {

            await fetch(`${import.meta.env.VITE_URL}/api/posts/${postId}/comments`,
                {
                    headers: { "authorization": `bearer ${localStorage.getItem("jwt")}`, "Content-Type": "application/x-www-form-urlencoded" },
                    body: `body=${encodeURIComponent(body)}&author=author`,
                    method: "post",
                    mode: "cors"
                }
            ).then(r => r.json()).then(d => comment = d);
            console.log(comment)
            setComments([
                comment,
                ...comments])
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <form action={submitComment}>
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