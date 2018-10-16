var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var app = express()  // new express
app.use('/static', express.static(path.join(__dirname, 'public'))) // if static แปลว่า Node js จะมอง รูปภาพเป็น static ไฟล์ต้องเอาไปวางแะระบุให้ถูก  static เป็น virtual path
app.use('/main', express.static(path.join(__dirname)))


// set router
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'searchFlight.html'))

})


app.listen(3000, function () {
    console.log('Server started at Port 3000');
})
