const express = require('express')
const path = require('path')
const cors = require('cors')


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
app.use(cors())
app.use(express.json())
app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../public/index.html'))

})
app.use(express.static(path.join(__dirname, '../public')))

let students = []

app.get('/api/students', (req, res) =>{
    res.status(200).send(students)
})

const index = students.findIndex(studentName=> studentName === name)

app.post('/api/students', (req, res) =>{
    let {name} = req.body
    name = name.trim()
    //checcking to see if its a vaild index
    const index = students.findIndex(studentName=> studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('student was added succesfully', {author: 'jake', type: 'manual'})
        res.status(200).send(students)
    } else if (name === ''){
        rollbar.error('no name given')
    } else{
        rollbar.critical('student already exists')
        res.status(400).send('that student already exists')
    }

})


//pre built code from rollbar we import right here. using dot.use
app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545
app.listen(port, () => console.log(`take us to warp ${port}`))