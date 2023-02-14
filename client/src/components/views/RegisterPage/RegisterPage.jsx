import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import {useNavigate} from 'react-router-dom'

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault(); //이걸 써야 페이지가 초기화되는 것을 막을 수 있다.
    // console.log('Email',Email)
    // console.log('Password',Password)
    if(Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
    }
    let body = {
      email: Email,
      password: Password
    }
    //리덕스를 쓰지 않을 경우
    //axios.post('/api/users/register', body)

    dispatch(registerUser(body))
    //랜딩페이지(초기페이지로 렌딩)
    //회원가입 성공시 '/login'로 이동.
      .then(response => {
        if(response.payload.success) {
          navigate('/login')
        } else {
          alert("회원가입에 실패했습니다.")
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
      <label>Confirm Password</label>
      <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
      <br />
      <button type="submit">회원가입</button>
    </form>
    </div>
  )
}
