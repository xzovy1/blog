import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ErrorPage from './ErrorPage.jsx'
import BlogPosts from './BlogPosts.jsx'
import BlogPost from './BlogPost.jsx'

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <ErrorPage />, },
  { path: "/posts", element: <BlogPosts />, errorElement: <ErrorPage />, },
  { path: "/:postId", element: <BlogPost />, errorElement: <ErrorPage />, }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
