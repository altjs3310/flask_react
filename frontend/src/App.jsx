import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Index from './Index'
import Signup from './Signup'
import Login from './Login'
import { useEffect, useState } from 'react'
import Write from './Write'
import Detail from './Detail'
import Edit from './Edit'
import Recommend from './Recommend'
import Movie from './Movie'

function App() {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {

    fetch('http://localhost:5000/auth/me', {
      credentials : 'include'
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      setUserInfo(data.user)
    })

  }, [])

  return (
    <>
    {
      userInfo && <h4>{userInfo.nickname}님 어서오십시오</h4>
    }
      <header>
        <Link to='/'>인덱스|</Link>
        <Link to='/signup'>회원가입|</Link>
        {
          userInfo
          ? <Link onClick={() => {
            fetch('http://localhost:5000/auth/logout', {
              method: 'POST',
              credentials:'include'
            }).then(response => response.json())
            .then(data => {
              alert(data.message)
              setUserInfo(null)
            }).catch(e => {
              console.error(e)
            })
          }}>로그아웃|</Link>
          : <Link to='/login'>로그인|</Link>
        }
        <Link to='/write'>글등록|</Link>
        <Link to='/recommend'>음식추천|</Link>
        <Link to='/movie'>영화추천|</Link>
      </header>

      <Routes>
        <Route path='/' element={<Index/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login setUserInfo={setUserInfo}/>}/>
        <Route path='/write' element={<Write />} />
        <Route path='/post/:id' element={<Detail/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
        <Route path='/recommend' element={<Recommend />} />
        <Route path='/movie' element={<Movie />} />
      </Routes>


      
    </>
  )
}

export default App
