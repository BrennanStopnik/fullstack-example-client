import { useState } from "react";



const CreateBlogForm = (props) => {

  const { urlEndpoint, setShouldRefetch } = props

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [text, setText] = useState("")
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handlePostBlog = async () => {
    setShouldRefetch(true)
    const response = await fetch(`${urlEndpoint}/blogs/create-one`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        text,
        author,
        categories
      }),
      headers: {
        "Content-Type": 'application/json'
      }
    })
    setShouldRefetch(false)
    if (response.ok !== true) {
      setSuccessMessage("There was a problem with the network")
      return;
    }
    const payload = await response.json()
    if (payload.success !== true) {
      setSuccessMessage(`There was a server error. Error: ${payload.error}`)
      return;
    }
    setSuccessMessage("Successfully created the Blog")
  }
  
  return ( 
    <div>
      <h1>Create Blog Form</h1>
      <h3>{successMessage}</h3>
      <label>Title: </label>
      <input typeof="text" onChange={(e)=>{
        setTitle(e.target.value)
      }}/>
      <br/>
      <br/>
      <label>Author: </label>
      <input typeof="text" onChange={(e)=>{
        setAuthor(e.target.value)
      }}/>
      <br/>
      <br/>
      <label>Text: </label>
      <textarea onChange={(e)=>{
        setText(e.target.value)
      }}/>
      <br/>
      <br/>
      <label>Category: </label>
      <input type="text" onChange={(e)=>{
        setCategory(e.target.value)
      }}/>
      <button onClick={()=>{
        const newCategories = [...categories, category]
        setCategories(newCategories)
      }}>Add Category</button>
      <br/>
      <br/>
      <button onClick={()=>{
        handlePostBlog()
      }}>Create Blog</button>
      <hr/>
    </div>
  )
}

export default CreateBlogForm;