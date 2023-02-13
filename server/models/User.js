//Model&Schema

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        //trim스페이스 바를 없애주는 역할 
        //john ahm@naver.com
        unigue: 1
    },
    password: {
        type: String,
        maxlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    //어떤 유저가 관리자가 될 수도 있고 일반 유저가 될 수도 있으므로 role 추가
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        //토큰을 이용해서 유효성 관리할 수 있다.
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User}