import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import { UserContext } from "../Context/AuthContext";

function Post() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [post, setpost] = useState([]);
  const [comments, setcomments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const handleDelete = async (params) => {
    try {
      const res = await axios.delete(`/api/comment/delete/${params}`, {
        withCredentials: true, // ✅ Ensures cookies (JWT) are sent with the request
      });
      console.log(res.data);
      // navigate("/")
      // commentdata()
      setcomments((prevComments) =>
        prevComments.filter((comment) => comment.id !== params)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const postdata = async () => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      console.log(res.data);
      setpost(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const commentdata = async () => {
    try {
      const res = await axios.get(`/api/comment/${id}`);
      console.log(res.data);
      setcomments(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // Prevent empty comments

    try {
      console.log("sending post request");
      const response = await axios.post(
        "/api/comment",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          withCredentials: true, // ✅ Ensures cookies (JWT) are sent with the request
        }
      );

      console.log(response.data);

      setcomments([
        ...comments,
        {
          id: response.data.id || Date.now(),
          commentBody: newComment,
          username: response.data.username,
        }, // Use response ID if available
      ]);

      setNewComment("");
    } catch (error) {
      // console.error(error.message);

      if (error.response) {
        if (error.response.status === 403) {
          alert("You are not authorized. Please log in.");
          navigate("/login");
        } else if (error.response.status === 401) {
          alert("Invalid or expired session. Please log in again.");
          navigate("/login");
        } else {
          alert(
            `Error: ${error.response.data.error || "Something went wrong"}`
          );
        }
      } else {
        console.error("Network error:", error.message);
        alert("Network error. Please try again.");
      }
    }
  };

  useEffect(() => {
    postdata();
    commentdata();
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <div
          key={post.id}
          className="bg-gray-500 rounded-xl  gap-1 w-1/2 p-3 h-[100vh] m-20  flex flex-col justify-between items-center"
        >
          <h2 className="text-center text-3xl font-bold uppercase">
            {post.title}
          </h2>
          <p className="text-center bg-slate-900 h-[70%] w-4/5 rounded-xl ">
            {post.postText}
          </p>
          <p className="text-slate-300 font-extralight self-end">
            {post.createdAt}
          </p>
        </div>
        <div className="text-white m-20 h-[100vh]">
          {/* Comments Heading */}
          <h1 className="font-bold uppercase text-3xl mb-6 text-center border-b-4 border-blue-400 pb-3">
            Comments
          </h1>

          {/* Comments List */}
          <div className="space-y-4 overflow-y-auto h-[500px]">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={comment.id}
                  className={`p-1 rounded-lg shadow-lg bg-gray-500 w-[400px]`}
                >
                  <span className="font-extralight text-[15px]">
                    {comment.username}
                  </span>
                  <h3 className="text-lg font-medium px-3.5">
                    {comment.commentBody}
                  </h3>
                  { user.username===comment.username?(
                    
                    <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/material-sharp/24/filled-trash.png"
                    alt="filled-trash"
                    onClick={() => handleDelete(comment.id)}
                  />

                  ): null
                  }
                 
                </div>
              ))
            ) : (
              <p className="text-gray-300 italic">No comments available.</p>
            )}
          </div>
          <div className=" bg-gray-800 p-4 rounded-b-xl shadow-md">
            <form
              className="flex items-center space-x-4"
              onSubmit={handleAddComment}
            >
              {/* Input Field */}
              <input
                type="text"
                name="commentBody"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Type your comment here..."
                className="flex-grow p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />

              {/* Submit Button (Aligned Right) */}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
