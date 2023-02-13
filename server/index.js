const express = require('express');
const app = express();
const port = 5005

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://leechaeyeon:MTajoxkwh19@react-project.wuttlto.mongodb.net/?retryWrites=true&w=majority', {
    // //에러를 막기 위한 코드
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false, strictQuery: true
}).then(()=> console.log('mongoDB Connected...'))
    .catch(err => console.log(err))
app.get('/', (req, res) => {
    res.send('Hello World')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))