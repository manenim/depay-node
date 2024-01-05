import express from 'express'

const app = express()

app.get('/', (req, res) => {
    return res.send('tested hello world')
})



app.listen(5001, (() => 'server running at port 5001'))