// //Model&Schema
// const mongoose = require('mongoose');
// const bycrypt = require('bcrypt');
// //salt 생성 -> salt를 이용해서 비밀번호를 암호화 해야 함.
// //saltRounds -> salt가 몇글자인지
// const saltRounds = 10;
// const jwt = require('jsonwebtoken')
// const {JsonWebTokenError} = require('jsonwebtoken')

// const userSchema = mongoose.Schema({
//     name: {
//         type: String,
//         maxlength: 50,
//     },
//     email: {
//         type: String,
//         trim: true,
//         //trim스페이스 바를 없애주는 역할 
//         //john ahm@naver.com
//         unigue: 1
//     },
//     password: {
//         type: String,
//         minlength: 3
//     },
//     lastname: {
//         type: String,
//         maxlength: 50
//     },
//     //어떤 유저가 관리자가 될 수도 있고 일반 유저가 될 수도 있으므로 role 추가
//     role: {
//         type: Number,
//         default: 0
//     },
//     image: String,
//     token: {
//         //토큰을 이용해서 유효성 관리할 수 있다.
//         type: String
//     },
//     // tokenExp: {
//     //     type: Number
//     // }
// })

// userSchema.pre('save', function(next) {
//     //'save'하기 전에 일어날 동작
//     var user = this;
//     //비밀번호를 암호화 시킨다.
//     if(user.isModified('password')){
//         bycrypt.genSalt(saltRounds, function(err, salt){
//             if(err) return next(err);
//             bycrypt.hash(user.password, salt, function(err, hash){
//                 if(err) return next(err);
//                 user.password = hash
//                 next()
//             })
//         })
//     } else {
//         //비밀번호가 아닌 다른 것을 바꿀 때는 그냥 next()을 해줘야 함.
//         next()
//     }
// })


// //로그인_비밀번호 비교
// userSchema.methods.comparePassword = function(plainPassword, cb) {
//     //plainPassword 1234 암호화된 비밀번호 $2b$10$pwjjgiiH9F2LZjk0q2oTSu6KEfH9RiJDJSrU2Mtq9ZMGaM1SXshZu
//     bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
//         if(err) return cb(err);
//         cb(null, isMatch); // 즉, isMatch: true
//     })
// }

// userSchema.methods.generateToken = function(cb) {
//     var user = this;
//     // jsonwebtoken을 이용해서 토큰 생성
//     var token = jwt.sign(user._id.toHexString(), 'secretToken')
//     // user._id + 'secretToken' = token 을 통해 토큰 생성
//     // 토큰 해석을 위해 'secretToken' 입력 -> user._id 가 나옴
//     // 토큰을 가지고 누구인지 알 수 있는 것
//     user.token = token

//     user.save(function(err, user) {
//         if(err) return cb(err)
//         cb(null, user)
//     })
// }


// const User = mongoose.model('User', userSchema)

// module.exports = {User}

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const { JsonWebTokenError } = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,  // 스페이스와 같은 공백을 없애주는 역할
        unique: 1  // 똑같은 이메일을 쓰지 못하도록
    },
    password: {
        type: String,
        minlength: 5
    },
    // lastname: {
    //     type: String,
    //     maxlength: 50
    // },
    role: {
        type: Number,
        default: 0
    },
    // image: String,
    token: {
        type:String
    },
    tokenExp: {
        type: Number
    }
})

// Bcrypt로 비밀번호 암호화 하기
userSchema.pre('save', function(next){
    var user = this;
    // salt를 이용해서 비밀번호 암호화한 후 보내줌 (비밀번호와 관련될 때만)
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else { // 그 외에는 그냥 내보냄
        next()
    }
})

// 로그인 - 비밀번호 비교
userSchema.methods.comparePassword = function(plainPassword, cb) {
    // 입력된 비밀번호와 데이터베이스에 있는 암호화된 비밀번호가 같은지 확인(비교) -> 평문을 암호화해서 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch) // 즉, true
    })
}

// 로그인 - 토큰 생성
userSchema.methods.generateToken = function(cb) {
    var user = this;
    // jsonwebtoken을 이용해서 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token 을 통해 토큰 생성
    // 토큰 해석을 위해 'secretToken' 입력 -> user._id 가 나옴
    // 토큰을 가지고 누구인지 알 수 있는 것
    user.token = token

    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    //토큰을 디코드 한다.
    jwt.verify(token, 'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null, user)

        })
    })
}

const User = mongoose.model('User', userSchema)
module.exports = {User}