const { useEffect, useState } = require("react")


const SingleBlog = (props) => {

  const { urlEndpoint, blogs } = props
  const [singleBlog, setSingleBlog] = useState({});
  const [id, setId] = useState("")
  
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
        {blogs.map((blog, index) => {
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
