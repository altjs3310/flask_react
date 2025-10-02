import { useState } from "react"

const Movie = () => {
  const [data, setData] = useState({
    age_group:0,
    gender:0,
    genre:"action"
  })

  const [movies, setMovies] = useState(null)

  const genreHandler = (e) => {
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }

  const numHandler = (e) => {
    setData({
      ...data,
      [e.target.name] : Number(e.target.value)
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/movie', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      setMovies(data.top3)
    })
  }

  return (
    <>
     <h2>영화 추천</h2>

     {
      movies && (
        <>
        <h4>추천 영화 Top3</h4>
        {
          movies.map((movie, i) => {
            return (
              <p key={i}>{movie.label}</p>
            )
          })
        }
        </>
      )
     }

     <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="">영화장르</label>
        <select name="genre" id="genre" onChange={genreHandler}>
          <option value="action">액션</option>
          <option value="romance">로맨스</option>
          <option value="comedy">코미디</option>
          <option value="thriller">스릴러</option>
          <option value="animation">애니메이션</option>
        </select>
      </div>

      <fieldset>
        <legend>나이</legend>
        <label>
          <input type="text" name="age_group" onChange={numHandler}/>
        </label>
      </fieldset>

      <fieldset>
        <legend>성별</legend>
        <label>
          <input type="radio" name="gender" value='0' onChange={numHandler}/>여성
        </label>
        <label>
          <input type="radio" name="gender" value='1' onChange={numHandler}/>남성
        </label>
      </fieldset>

      <input type="submit" value="영화추천받기" />

     </form>
    </>
  )
}

export default Movie