// modules
const express = require('express')
const path = require('path')

const app = express()
// express options
app.set('views', './views')
app.set('view engine', 'hbs')
// serve static files in public directory like css and images
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.get('/', (req, res)=> {
    res.render('index.hbs')
})


// express server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`)
})