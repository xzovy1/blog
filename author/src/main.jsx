import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import BlogPosts from './BlogPosts.jsx'
import NewPost from './NewPost.jsx'
import BlogPost from "./BlogPost.jsx"
import ErrorPage from './ErrorPage.jsx'
const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <ErrorPage />, },
  { path: "/login", element: <Login />, errorElement: <ErrorPage />,},
  { path: "/posts", element: <BlogPosts />, errorElement: <ErrorPage />, },
  { path: "/posts/new", element: <NewPost />, errorElement: <ErrorPage />, },
  { path: "/posts/:postId", element: <BlogPost />, errorElement: <ErrorPage />, }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
