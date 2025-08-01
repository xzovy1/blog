import { Link } from "react-router-dom";

const ErrorPage =  () => {
    return (
        <div>
            <h1>Uh oh, this route doesn't exist</h1>
            <Link to="/login">Try to login</Link>
            <br></br>
            <Link to="/">Go home</Link>
        </div>
    )
}

export default ErrorPage