import React from 'react'
import { useState } from 'react'
// import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import {useNavigate} from 'react-router-dom'

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault(); //이걸 써야 페이지가 초기화되는 것을 막을 수 있다.
    console.log('Email',Email)
    console.log('Password',Password)
    
    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
    //랜딩페이지(초기페이지로 렌딩)
    //로그인 성공시 '/'로 이동.
      .then(response => {
        if(response.payload.loginSuccess) {
          navigate('/')
        } else {
          alert('로그인에 실패했습니다.')
        }
      })
 
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
  }}>
    <form style={{display: 'flex', flexDirection: 'column'}}
    onSubmit={onSubmitHandler}
    >
      <label>ID</label>
      <input type="text" value={Email} onChange={onEmailHandler}/>
      <label>Password</label>
      <input type="password" value={Password} onChange={onPasswordHandler}/>
      <br />
      <button type="submit">Login</button>
    </form>
    </div>
  )
}
