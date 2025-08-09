import { Link } from "react-router-dom"
const Navbar = () => {
    return (
        <div>
            <Link to="/posts">Current blog posts</Link>
            <br />
            <Link to="/posts/new">Compose something new</Link>
        </div>
    )
}
export default Navbar