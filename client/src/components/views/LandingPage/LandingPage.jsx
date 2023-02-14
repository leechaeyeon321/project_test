import React, {useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

export default function LandingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response))
  }, [])
  const onClickHandler = () => {
    axios.get(`/api/users/logout`)
    .then(response => {
      console.log(response.data)
      if(response.data.success) {
        navigate('/login')
      } else {
        alert("로그아웃 실패.")
      }
    })
  }
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
  }}>
    <h2>시작 페이지</h2>
    <button onClick={onClickHandler}>로그 아웃</button>
    </div>
  )
}
