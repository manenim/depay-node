import express from 'express'
import depayRoute from './src/routes/depay.js'

const app = express()

app.get('/', (req, res) => {
    return res.send('tested hello world')
})


app.use('/api', depayRoute)



app.listen(5001, (() => 'server running at port 5001'))