import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const Edit = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [post, setPost] = useState(state.post)

  const onChangeHandler = (e) => {
    setPost({
      ...post,
      [e.target.name] : e.target.value
    })
  }
  return(
    <>
    <h2>게시글 수정 페이지</h2>
    제목 : <input type="text" name="title" value={post.title} onChange={onChangeHandler}/> <br />
    내용<br /> 
    <textarea name="content" onChange={onChangeHandler}>{post.content}</textarea><br />
    <button onClick={() => {
      fetch(`http://localhost:5000/post/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(post),
        credentials: 'include'
      }).then(response => response.json())
      .then(data => {
        alert(data.message)

        if(data.ok)
        navigate('/')
      })
    }}>수정</button>
    </>
  )
}

export default Edit