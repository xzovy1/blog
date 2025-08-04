import { Form, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
const NewPost = () => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current){
            return editorRef.current.getContent() //optional: {format: 'text'}
        }
    }
    const navigate = useNavigate();
    async function submitPost (e){
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const title = formData.get("title");
        console.log(log())
        await fetch(`${import.meta.env.VITE_URL}/api/posts`, 
            {
                method: "post", 
                headers: { "authorization": `bearer ${localStorage.getItem("jwt")}`, "Content-Type": "application/x-www-form-urlencoded"},
                body: `title=${encodeURIComponent(title)}&body=${log()}`,
            }
        ).then(navigate('/posts'))
    }
    const apiKey = import.meta.env.VITE_TINYMCE
    return (
        <div>
            <h1>Create an Article:</h1>
            <Form onSubmit={submitPost} method="post">
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" />
                <Editor
                    id="body"
                    name="body"
                    apiKey={apiKey}
                    onInit={ (_evt, editor) => editorRef.current = editor}
                            initialValue="Share your thoughts."
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
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}

export default NewPost