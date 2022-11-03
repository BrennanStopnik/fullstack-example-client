import { useEffect, useState } from "react";


const SingleBlog = (props) => {

  const { urlEndpoint } = props
  const [newBlog, setNewBlog] = useState([])
  const [singleBlog, setSingleBlog] = useState({});
  const [id, setId] = useState("")
  
  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await fetch(`${urlEndpoint}/blogs/all`);
      const fetchedBlogsPayload = await result.json();
      setNewBlog(fetchedBlogsPayload.blogs);
    };
    fetchBlogs();
  }, []);
  
  useEffect(() => {
    const fetchBlog = async () => {
      const result = await fetch(`${urlEndpoint}/blogs/get-one/${id}`)
      const blogPayload = await result.json()
      setSingleBlog(blogPayload.blog)
    }
    fetchBlog()
  }, [id])

  return (
    <div>
      Single Blog
      <p>{singleBlog.title}</p>
      <p>Author: {singleBlog.author}</p>
      <p>ID: {singleBlog.id}</p>
      <p>{singleBlog.text}</p>
      <select value={id} onChange={(e)=>{
        setId(e.target.value)
      }}>
        <option>Choose One</option>
        {newBlog.map((blog, index) => {
          return (
            <option value={blog.id} key={index}>
              {blog.id}
            </option>
          )
        })}
      </select>
      <hr/>
    </div>
  )
}

export default SingleBlog;
