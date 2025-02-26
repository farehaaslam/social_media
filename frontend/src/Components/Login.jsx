import React from 'react'
import {Formik,Form,Field,ErrorMessage} from "formik"
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useState,useContext } from 'react';
import { UserContext } from '../Context/AuthContext';

function Login() {
    const [errorMessage, seterrorMessage] = useState("")
    const {setauth}=useContext(UserContext)
    
      const navigate=useNavigate()
        const  initialValues={
            username:"",
            password:""
        }
        const validationSchema=Yup.object().shape({
                username:Yup.string().required("username is required"),
                password:Yup.string().required("password is required")
            })
            const checkData=async (data) => {
                try {
                  const res=  await axios.post("/api/auth/login",data)
                  console.log(res);
                  if(res.status==200 && res.data.success){
                    setauth(true)
                    navigate("/")
                  }
                  else{
                    seterrorMessage(res.data.message)
                    console.log(errorMessage);
                  }
                  
                } catch (error) {
                    console.log(error);
                    
                }
            }
            const onSubmit=(data)=>{
                console.log(data);
                checkData(data)
                
            }
  return (
    <div className="h-[100vh] flex flex-row items-center justify-center">
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
     <Form className="bg-slate-300 text-slate-900 max-w-lg mx-auto p-6 rounded-xl shadow-xl space-y-6">
      <h2 className="text-4xl font-bold mb-4 text-center capitalize">sign in </h2>
        {/* Post Title */}
        <div>
          <label htmlFor="username" className="block mb-1 text-lg font-semibold">username</label>
          
          <Field
            type="text"
            name="username"
            placeholder="Enter your username"
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
           <ErrorMessage name='username' component='span' className='text-red-700'/>
        </div>
      
        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-1 text-lg font-semibold">Password </label>
          <Field
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
           <ErrorMessage name='password' component='span' className='text-red-700'/>
        </div>
      
<p className='text-red-700 text-sm'>{errorMessage}</p>
    <button
        type="submit"
        className="w-full bg-slate-600 text-white p-3 rounded-lg hover:bg-slate-700 transition duration-300 capitalize"
      >
        log in
      </button>
    </Form>
            
            </Formik>
    </div>
  )
}

export default Login