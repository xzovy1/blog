import { useNavigate } from 'react-router-dom';
import './App.css'

function Login() {
    const navigate = useNavigate()
    async function login(formData){
        const username = formData.get("username");
        const password = formData.get("password");
        try{
            const response = await fetch(`${import.meta.env.VITE_URL}/login`, 
                {
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST", 
                    mode: "cors",
                    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
                })
            if(!response.ok) throw new Error(`HTTP error. status: ${response.status}`)
            const data = await response.json();
            if(data.token){
                localStorage.setItem("jwt", data.token);
                navigate('/');
            }else{
                throw new Error(`Token not received`)
            }
        }catch(err){
            console.error(err)
        }
    }

    return(
        <div>
            <h1>Login</h1>
            <form id='login-form' action={login} method='post' encType='application/x-www-form-urlencoded' navigate="true">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" value="author"/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value="admin"/>
                <input type="submit" />
            </form>
            {/* <NavLink to='/api/posts'>All Posts</NavLink> */}
        </div>
    )

}

export default Login