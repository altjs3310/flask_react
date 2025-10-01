import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = ({setUserInfo}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username : '',
    password : ''
  })

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  return (
    <>
      <h2>로그인 페이지</h2>
      아이디 : <input type="text" name="username" onChange={onChangeHandler}/> <br />
      비밀번호 : <input type="text" name="password" onChange={onChangeHandler}/> <br />
      <button onClick={async () => {
        const response = await fetch('http://localhost:5000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(user),
          credentials: 'include'
        })

        const data = await response.json()

        alert(data.message)

        if(data.ok) {
          setUserInfo(data.user)
          navigate('/')
        }

      }}>로그인</button>
    </>
  )
}

export default Login