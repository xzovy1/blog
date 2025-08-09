import { Link } from "react-router-dom"
const Navbar = () => {
    return (
        <div>
            <ul>
                <li><Link to="/posts">Current blog posts</Link></li>
                <li><Link to="/posts/new">Compose something new</Link></li>
            </ul>
        </div>
    )
}
export default Navbar