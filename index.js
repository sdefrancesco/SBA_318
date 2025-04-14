// modules
const express = require('express')
const app = express()
// express options
app.set('views', './views')
app.set('view engine', 'hbs')

// routes
app.get('/', (req, res)=> {
    res.render('index.hbs')
})


// express server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`)
})