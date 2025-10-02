import { useState } from "react"

const Recommend = () => {
  const [data, setData] = useState({
    spicy:0,
    soup:0,
    food_type:0,
    sweet:0,
    cheap:0
  })
  const [foods, setFoods] = useState(null)

  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name] : Number(e.target.value)
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/recommend', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      setFoods(data.top3)
    })
  }

  return (
    <>
      <h2>음식 추천</h2>

      {
        foods && (
        <>
          <h4>추천 음식 Top3</h4>
          {
            foods.map((food, i) => {
              return (
                <p key={i}>{food.label}</p>
              )
            })
          }
        </>
        )
      }

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="">음식종류</label>
          <select name="food_type" id="food_type" onChange={onChangeHandler}>
            <option value="0">한식</option>
            <option value="1">중식</option>
            <option value="2">일식</option>
            <option value="3">양식</option>
          </select>
        </div>

        <fieldset>
          <legend>맵기</legend>
          <label>
            <input type="radio" name="spicy" value='0' onChange={onChangeHandler} />순한맛
          </label>
          <label>
            <input type="radio" name="spicy" value='1' onChange={onChangeHandler} />매운맛
          </label>
        </fieldset>

        <fieldset>
          <legend>국물</legend>
          <label>
            <input type="radio" name="soup" value='0' onChange={onChangeHandler} />국물없음
          </label>
          <label>
            <input type="radio" name="soup" value='1' onChange={onChangeHandler} />국물있음
          </label>
        </fieldset>

        <fieldset>
          <legend>단맛</legend>
          <label>
            <input type="radio" name="sweet" value='0' onChange={onChangeHandler} />단맛없음
          </label>
          <label>
            <input type="radio" name="sweet" value='1' onChange={onChangeHandler}/>단맛있음
          </label>
        </fieldset>

        <fieldset>
          <legend>가격</legend>
          <label>
            <input type="radio" name="cheap" value='0' onChange={onChangeHandler} />비쌈
          </label>
          <label>
            <input type="radio" name="cheap" value='1' onChange={onChangeHandler} />저렴
          </label>
        </fieldset>

        <input type="submit" value='음식추천받기' />


      </form>

    </>
  )
}

export default Recommend