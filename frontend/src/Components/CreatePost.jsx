import React from 'react'
import {Formik,Form,Field,ErrorMessage} from "formik"
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useState,useContext } from'react';
function CreatePost() {
      const navigate=useNavigate()
  
    const initialValues={
        title:"",
        postText:"",
        username:"",
    }
    const validationSchema=Yup.object().shape({
        title:Yup.string().required(),
        postText:Yup.string().required(),
        username:Yup.string().min(5).max(15).required(),
    })
    const sendData=async (data) => {
        try {
        await axios.post("/api/posts",data)
        } catch (error) {
            console.log(error);
        }
    }
    const onSubmit=(data)=>{
        console.log(data)
        sendData(data)
        navigate("/")

    }
    
  return (
   <div className="h-[100vh] flex flex-row items-center justify-center">
   <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
   <Form className="bg-slate-300 text-slate-900 max-w-lg mx-auto p-6 rounded-xl shadow-xl space-y-6 ">
  <h2 className="text-4xl font-bold mb-4 text-center">📝 Create a New Post</h2>

  {/* Post Title */}
  <div>
    <label htmlFor="title" className="block mb-1 text-lg font-semibold">Post Title</label>
    <ErrorMessage name='title' component='span' className='text-red-700'/>
    <Field
      type="text"
      name="title"
      id="title"
      placeholder="Enter a catchy title..."
      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
    />
  </div>
  {/* Post Content */}
  <div>
    <label htmlFor="postText" className="block mb-1 text-lg font-semibold">Content</label>
    <ErrorMessage name='postText' component='span' className='text-red-700'/>
    <Field
      type="text"
      name="postText"
      id="postText"
      placeholder="What's on your mind today? 😊"
      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
    />
  </div>

  {/* Created By */}
  <div>
    <label htmlFor="createdBy" className="block mb-1 text-lg font-semibold">Created By</label>
    <ErrorMessage name='username' component='span' className='text-red-700'/>
    <Field
      type="text"
      name="username"
      id="createdBy"
      placeholder="Your name..."
      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-slate-600 text-white p-3 rounded-lg hover:bg-slate-700 transition duration-300"
  >
    🚀 Create Post
  </button>
</Form>

   </Formik>
   
   </div>
  )
}

export default CreatePost