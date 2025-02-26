import { Link } from "react-router";
import  UserProvider from "../Context/AuthContext"
import { useContext } from "react";
import { UserContext } from "../Context/AuthContext"
import axios from "axios";
const Navbar = () => {
  const {auth,setauth,user,setuser}= useContext(UserContext)
  const handleLogout=async () => {
    await axios.post("/api/auth/logout",{},{withCredentials: true})  
setauth(false)
setuser(null)
  }
  return (
    <nav style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "10px 20px", 
      background: "#333", 
      color: "#fff" 
    }}>

      {/* Left Side Links */}
      <div>
        <Link to="/" style={{ margin: "10px", color: "#fff", textDecoration: "none" }}>Home</Link>
        <Link to="/createPost" style={{ margin: "10px", color: "#fff", textDecoration: "none" }}>Create Post</Link>
      </div>
      {!auth? (  
      <div>
        <Link to="/login" style={{ margin: "10px", color: "#fff", textDecoration: "none" }}>Login</Link>
        <Link to="/register" style={{ margin: "10px", color: "#fff", textDecoration: "none" }}>Register</Link>
      </div>):(
        <>
        <h2>{ user?user.username:null}</h2>

        <button onClick={handleLogout}>logout</button>
        </>)

      }
   
    </nav>
  );
};

export default Navbar;



