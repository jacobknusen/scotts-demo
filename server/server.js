const express = require('express')
const path = require('path')

const app = express()
app.get('/', (req, res) =>{
    res.sendFile(paht.join(__dirname, '../public/index.html'))

})

const port = process.env.Port || 4545
app.listen(port, () => console.log(`take us to warp ${port}`))