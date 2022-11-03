import { useEffect, useState } from "react";


const UpdateBlogForm = (props) => {

  const {urlEndpoint, blogs, setShouldRefetch } = props;

  const[id, setId] = useState("");
  // const[blogToUpdate, setBlogToUpdate] = useState({});
  const[title, setTitle] = useState("");
  const[author, setAuthor] = useState("");
  const[text, setText] = useState("");

  useEffect(() => {
    const fetchedBlog = async () => {
      const result = await fetch(`${urlEndpoint}/blogs/get-one/${id}`);
      const fetchedBlogToUpdate = await result.json();
      setTitle(fetchedBlogToUpdate.blog.title);
      setAuthor(fetchedBlogToUpdate.blog.author);
      setText(fetchedBlogToUpdate.blog.text);
      // setBlogToUpdate(fetchedBlogToUpdate.blog);
    };
    fetchedBlog();
  }, [id]);

  const handleUpdateBlog = async () => {
    setShouldRefetch(true);
    const response = await fetch(`${urlEndpoint}/blogs/update-one/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        author,
        text
      }),
      
    })
    const updatePayload = await response.json();
    setShouldRefetch(false);
  };

  return (
    <div>
      <h1>Update Blog Form</h1>
      <label>Title: </label>
      <input 
        value={title} 
        typeof="text" 
        onChange={(e)=>{
          setTitle(e.target.value)
        // const blogToUpdate = {
        //   ...blogToUpdate, 
        //   title: e.target.value}
        // setBlogToUpdate(blogToUpdate)
        }}
      />
      <br/>
      <br/>
      <label>Author: </label>
      <input 
        value={author} 
        typeof="text" 
        onChange={(e)=>{
          setAuthor(e.target.value)
        // const blogToUpdate = {
        //   ...blogToUpdate, 
        //   author: e.target.value}
        // setBlogToUpdate(blogToUpdate)
        }}
      />
      <br/>
      <br/>
      <label>Text: </label>
      <textarea 
        value={text} 
        onChange={(e)=>{
          setText(e.target.value)
        // const blogToUpdate = {
        //   ...blogToUpdate, 
        //   text: e.target.value}
        // setBlogToUpdate(blogToUpdate)
        }}
      />
      <br/>
      <button 
        onClick={() => {
          handleUpdateBlog();
        }}
      >Update Blog</button>
      <br/>
      <select 
        value={id} 
        onChange={(e)=>{
          setId(e.target.value)
        }}
      >
        <option>Choose One</option>
        {blogs.map((blog, index) => {
          return (
            <option key={index}>
              {blog.id}
            </option>
          )
        })}
      </select>
      <hr/>
    </div>
  )
}

export default UpdateBlogForm;