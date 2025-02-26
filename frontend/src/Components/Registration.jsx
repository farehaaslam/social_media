import React from 'react'
import {Formik,Form,Field,ErrorMessage} from "formik"
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router';
function Registration() {
    const navigate=useNavigate()
    const  initialValues={
        username:"",
        password:"",
        confirmPassword:""
    }
    const validationSchema=Yup.object().shape({
        username:Yup.string().required("username is required"),
        password:Yup.string().required("password is required").min(8,"password must be 8 character long"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords must match")
            .required("Confirm Password is required")
    })
    const sendData=async (data) => {
        try {
            await axios.post("/api/auth",data)
            console.log("data posted succesfully");
        } catch (error) {
            console.log(error);
            
        }
    }

    const onSubmit=(data)=>{
        console.log(data);
        sendData(data)
        alert("Registered succesfully")
        navigate("/login")
    }
  return (
    <div className="h-[100vh] flex flex-row items-center justify-center">
     <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
 <Form className="bg-slate-300 text-slate-900 max-w-lg mx-auto p-6 rounded-xl shadow-xl space-y-6">
  <h2 className="text-4xl font-bold mb-4 text-center">Create an acount</h2>

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

  {/* Confirm password  */}
  <div>
    <label htmlFor="confirmPassword" className="block mb-1 text-lg font-semibold">confirm Password </label>
    <Field
      type="password"
      name="confirmPassword"
      placeholder="••••••••"
      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
    />
     <ErrorMessage name='confirmPassword' component='span' className='text-red-700'/>
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-slate-600 text-white p-3 rounded-lg hover:bg-slate-700 transition duration-300"
  >
    SIGN UP 
  </button>
</Form>
        
        </Formik>
        </div>
  )
}

export default Registration