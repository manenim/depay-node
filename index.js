import express from 'express'
import depayRoute from './src/routes/depay.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    return res.send('tested hello world')
})


app.use('/depay', depayRoute)




app.listen(5001, (() => 'server running at port 5001'))