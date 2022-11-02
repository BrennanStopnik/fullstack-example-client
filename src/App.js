import { useState, useEffect } from "react";
import './App.css';
import SingleBlog from "./Pages/SingleBlog";
import CreateBlogForm from "./Pages/CreateBlogForm";

const urlEndpoint = "http://localhost:4000"

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await fetch(`${urlEndpoint}/blogs/all`)
      const fetchedBlogs = await result.json()
      console.log(fetchedBlogs)
      setBlogs(fetchedBlogs.blogs)
    }
    fetchBlogs()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <CreateBlogForm 
          urlEndpoint={urlEndpoint}
        />
        <SingleBlog 
          urlEndpoint={urlEndpoint}
          blogs={blogs}
        />
        {blogs.map((blog, index)=>{
          return (
            <div key={index}>
              <h2>{blog.title}</h2>
              <p>Author: {blog.author}</p>
              <p>ID: {blog.id}</p>
              <p>{blog.text}</p>
            </div>
          )
        })}
      </header>
    </div>
  );
}

export default App;


