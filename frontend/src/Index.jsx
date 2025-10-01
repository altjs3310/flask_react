import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Index = () => {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/post')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setPosts(data.posts)
    })
  }, [])

  if(!posts)
    return <div>게시글 없음</div>

  return (
    <>
      <h2>인덱스 페이지</h2>

      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {
            posts.map((post) => {
              return (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </td>
                  <td>{post.author.nickname}</td>
                  <td>{new Date(post.created_at).toLocaleDateString('ko-KR')}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <button onClick={async () => {
        const response = await fetch('http://localhost:5000/check')
        const data = await response.json()
        console.log(data)
      }}>체크</button>

      <button onClick={async () => {
        const response = await fetch('http://localhost:5000/check2',{
          credentials: 'include'
        }) 
        const data = await response.json()
        console.log(data)
      }}>체크2</button>
    </>
  )
}

export default Index