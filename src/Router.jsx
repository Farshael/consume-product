import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Category from "./pages/Category";
import User from "./pages/User";


export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/product', element: <Product /> },
    { path: '/category', element: <Category /> },
    { path: '/user', element: <User /> },
])