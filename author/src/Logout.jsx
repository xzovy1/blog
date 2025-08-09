import { useNavigate } from "react-router-dom"
const Logout = () => {
    const navigate = useNavigate()
    const logout = async() => {
        await fetch(`${import.meta.env.VITE_URL}/logout`, {mode: "cors"})
        localStorage.clear();
        navigate('/login')
    } 
    return(
        <>
            <button onClick={logout}>Log out</button>
        </>
    )
}

export default Logout