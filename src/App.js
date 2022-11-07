import { useState, useEffect } from "react";
import SingleBlog from "./Pages/SingleBlog";
import CreateBlogForm from "./Pages/CreateBlogForm";
import UpdateBlogForm from "./Pages/UpdateBlogForm";
import './App.css';

const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
console.log(urlEndpoint);

function App() {
  const [blogs, setBlogs] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await fetch(`${urlEndpoint}/blogs/all`)
      console.log(result);
      const fetchedBlogs = await result.json();
      setBlogs(fetchedBlogs.blogs)
    }
    fetchBlogs()
  }, [shouldRefetch])

  return (
    <div className="App">
      <header className="App-header">
        <h3>{shouldRefetch && "Refetching"}</h3>
        <UpdateBlogForm
          urlEndpoint={urlEndpoint} 
          blogs={blogs}
          setShouldRefetch={setShouldRefetch}
        />
        <CreateBlogForm 
          urlEndpoint={urlEndpoint}
          setShouldRefetch={setShouldRefetch}
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


