import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
function Home() {
  const [posts, setposts] = useState([]);
  const data = async () => {
    try {
      const res = await axios.get("/api/posts");
      console.log(res.data);
      setposts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      // year: "numeric",
      month: "long",
      day: "numeric",
      
    });
  };
  useEffect(() => {
    data();
  }, []);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center  gap-6 p-2.5 mt-7">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-500 rounded-xl  gap-1 w-lg p-3 "
              onClick={() => navigate(`/post/${post.id}`)}
            >
              <h2 className="text-center text-3xl font-bold uppercase">
                {post.title}
              </h2>
              <p className="text-center">{post.postText}</p>
              <p className="text-slate-300 font-extralight ">
                { formatDate(post.createdAt)}
              </p>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </>
  );
}

export default Home;
