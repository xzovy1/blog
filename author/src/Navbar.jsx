import { Link } from "react-router-dom"
const Navbar = () => {
    return (
        <div>
            <ul>
                <li><Link to="/posts">Blog Posts</Link></li>
                <li><Link to="/posts/new">Compose New Post</Link></li>
            </ul>
        </div>
    )
}
export default Navbar