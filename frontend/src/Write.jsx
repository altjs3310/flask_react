import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Write = () => {
  const navigate = useNavigate()
  const [post, setPost] = useState({
    title:'',
    content:''
  })

  const onChangeHandler = (e) => {
    setPost({
      ...post,
      [e.target.name] : e.target.value
    })
  }
  return(
    <>
    <h2>게시글 등록 페이지</h2>
    제목 : <input type="text" name="title" onChange={onChangeHandler}/> <br />
    내용<br /> 
    <textarea name="content" onChange={onChangeHandler}></textarea><br />
    <button onClick={async () => {
      const response = await fetch('http://localhost:5000/post', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(post),
        credentials: 'include'
      }).then(response => response.json())
      .then(data => {
        alert(data.message)

        if(data.ok)
        console.log(data.post)
        navigate('/')
      })
    }}>글등록</button>
    </>
  )
}

export default Write