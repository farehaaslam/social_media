import { createContext,useState ,useEffect} from "react";
import axios from "axios";
export const UserContext = createContext();
  

const UserProvider=({children})=>{
const[auth,setauth]=useState(false)
const [user,setuser]=useState(null)
useEffect(() => {
 const checkAuth=async (params) => {
    try {
        const res=await axios.get("/api/auth/isAuth",{withCredentials:true})
        if(res.data.Authenticated){
            setauth(true)
            setuser(res.data.user)
         }
         else{
            setauth(false)
         }
        
    } catch (error) {

        console.log(error);
        setauth(false)
    
        
    }
  

 }

 checkAuth()

 
}, [])


    return (
        <UserContext.Provider value={{auth,setauth,user,setuser}}>
            {children}
        </UserContext.Provider>
    )
 
}
export default UserProvider;
