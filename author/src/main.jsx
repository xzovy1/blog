import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import BlogPosts from './BlogPosts.jsx'
import ErrorPage from './ErrorPage.jsx'
const router = createBrowserRouter([
  {path: "/", element: <App />, errorElement: <ErrorPage />},
  {path: "/login", element: <Login />, },
  // {path: "/api/posts", element: <BlogPosts />},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
