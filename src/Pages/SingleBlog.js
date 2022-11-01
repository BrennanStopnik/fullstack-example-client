const { useEffect, useState } = require("react")


const SingleBlog = (props) => {

  const { urlEndpoint } = props
  const [singleBlog, setSingleBlog] = useState({});
  const [id, setId] = useState("7e2361f5-7648-4532-94fa-366ed86cf147")
  
  useEffect(() => {
    const fetchBlog = async () => {
      const result = await fetch(`${urlEndpoint}/blogs/get-one${id}`)
      const blogPayload = await result.json()
      setSingleBlog(blogPayload.blog)
    }
    fetchBlog()
  }, [])

  return (
    <div>
      SingleBlog
      <p>{singleBlog.title}</p>
      <p>{singleBlog.text}</p>
    </div>
  )
}

export default SingleBlog;