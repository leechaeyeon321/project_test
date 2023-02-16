import React, { useEffect } from 'react';
// import axios from 'axios'
import {useDispatch} from 'react-redux'
import {auth} from '../_actions/user_action'
import {useNavigate} from 'react-router-dom'

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null){
    
    //null => 아무나 출입이 가능한 페이지
    //true => 로그인한 유저만 출입이 가능한 페이지
    //false => 로그인한 유저는 출입 불가능한 페이지

    // option- null, true, false
    // null => 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출입 불가능한 페이지
    // adminRoute => admin 유저만 들어갈 수 있도록 하려면 true (기본값은 null)

    function AuthenticationCheck (props) {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        useEffect(() => {
            //백엔드에서 처리한 정보가 response에 들어 있음.
            dispatch(auth()).then(response => {
                console.log(response)
                console.log(response.payload.isAuth)
                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        navigate('/login')
                    }
                } else {
                    //로그인 한 상태
                    //admin이 아닌데 adminpage에 들어가려고 할 때 막아줘야 하는 부분
                    if(adminRoute && !response.payload.isAdmin) {
                        //랜딩 페이지로 보내준다.
                        navigate('/')
                    } else {
                        if(option === false){
                            navigate('/')
                        }
                    }
                }
            })
            //리덕스를 사용하지 않을 때 -> axios.get('/api/users/auth')
        }, [])
        return (
            <SpecificComponent/>
        )
    }
    return AuthenticationCheck
}