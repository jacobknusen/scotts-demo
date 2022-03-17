const express = require('express')
const path = require('path')

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'f36a898d6c454be791044b8793623295',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!') 

const app = express()
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/index.html'))

})
let students = []

app.post('/api/student', (req, res) =>{
    let {name} = req.body
    name = name.trim()

    students.push(name)
    //roll bar is just a log 
    rollbar.log('student was added succesfully', {author: 'jake', type: 'manual'})

    res.send(200).send(students)
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545
app.listen(port, () => console.log(`take us to warp ${port}`))