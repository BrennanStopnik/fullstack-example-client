import { useEffect, useState } from "react";


const UpdateBlogForm = ({ props, updateBlog }) => {

  const {urlEndpoint, blogs, setShouldRefetch } = props;

  const[id, setId] = useState("");
  const[blogToUpdate, setBlogToUpdate] = useState({});

  useEffect(() => {
    const fetchBlog = async () => {
      const result = await fetch(`${urlEndpoint}/blogs/get-one/${id}`);
      const fetchedBlogToUpdate = await result.json();
      setBlogToUpdate(fetchedBlogToUpdate.blog);
    };
    fetchBlog();
  }, [id]);

  const handleUpdateBlog = async () => {
    setShouldRefetch(true);
    const response = await fetch(`${urlEndpoint}/blogs/update-one/${id}`, {
      method: 'PUT',
      body: JSON.stringify({blogToUpdate}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const updatePayload = await response.json();
    setShouldRefetch(false);
  };

  return (
    <div>
      <h1>Update Blog Form</h1>
      <label>Title: </label>
      <input value={blogToUpdate.title} typeof="text" onChange={(e)=>{
        // setTitle(e.target.value)
        const blogToUpdate = {
          ...blogToUpdate, 
          title: e.target.value}
        setBlogToUpdate(blogToUpdate)
      }}/>
      <br/>
      <br/>
      <label>Author: </label>
      <input value={blogToUpdate.author} typeof="text" onChange={(e)=>{
        // setAuthor(e.target.value)
        const blogToUpdate = {
          ...blogToUpdate, 
          author: e.target.value}
        setBlogToUpdate(blogToUpdate)
      }}/>
      <br/>
      <br/>
      <label>Text: </label>
      <textarea value={blogToUpdate.author} onChange={(e)=>{
        // setText(e.target.value)
        const blogToUpdate = {
          ...blogToUpdate, 
          text: e.target.value}
        setBlogToUpdate(blogToUpdate)
      }}/>
      <button onClick={() => {
        handleUpdateBlog();
      }}>Update Blog</button>
      <select value={id} onChange={(e)=>{
        setId(e.target.value)
      }}>
        <option>Choose One</option>
        {blogs.map((blog, index) => {
          return (
            <option value={blog.id} key={index}>
              {blog.id}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default UpdateBlogForm;