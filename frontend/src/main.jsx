import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import UserProvider from "./Context/AuthContext.jsx";

import App from "./App.jsx";
import {
  BrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router";
import Home from "./Components/Home.jsx";
import CreatePost from "./Components/CreatePost.jsx";
import Post from "./Components/Post.jsx";
import Login from "./Components/Login.jsx";
import Registration from "./Components/Registration.jsx";
import Layout from "./Layout.jsx";
import PostProvider from "./Context/PostContext.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />,
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Route>
    </>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
