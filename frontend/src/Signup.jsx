import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username : '',
    password : '',
    nickname : '',
    email : ''
  })

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  return (
    <>
      <h2>회원가입 페이지</h2>
      아이디 : <input type="text" name="username" onChange={onChangeHandler}/> <br />
      비밀번호 : <input type="text" name="password" onChange={onChangeHandler}/> <br />
      닉네임 : <input type="text" name="nickname" onChange={onChangeHandler}/> <br />
      이메일 : <input type="text" name="email" onChange={onChangeHandler}/> <br />
      <button onClick={async () => {
        const response = await fetch('http://localhost:5000/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(user)
        })

        const data = await response.json()

        alert(data.message)
        if(data.ok) {
          console.log(data.user)
          navigate('/')
        }

      }}>회원가입</button>
    </>
  )
}

export default Signup