// modules
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

// data
const data = require('./data')

const app = express()

// express options
app.set('views', './views')
app.set('view engine', 'hbs')

// serve static files in public directory like css and images
app.use(express.static(path.join(__dirname, 'public')))

// parse body data from form for post, and put requests
app.use(bodyParser.urlencoded({extended: false}))

// routes
app.get('/', (req, res) => {
    console.log(req.query);

    let filteredPosts = data.posts

    // search by title
    if (req.query.search) {
        const searchQuery = req.query.search.toLowerCase()
        filteredPosts = filteredPosts.filter(post => 
            post.title.toLowerCase().includes(searchQuery)
        );
    }

    // date filter
    if (req.query.date) {
        if (req.query.date === 'mostRecent') {
            // sort by most recent 
            filteredPosts = filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (req.query.date === 'oldestToNewest') {
            // sort by oldest to newest
            filteredPosts = filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
    }

    // render the view with filtered posts
    res.render('index.hbs', {
        users: data.users,
        posts: filteredPosts
    });
});


app.post('/users/new', (req, res)=> {
    console.log(req.body)
    let newUser = { ...req.body, id : data.users.length + 1}
    data.users.push(newUser)
    res.redirect('/')
})

app.post('/users/:id/delete', (req, res) => {
    const postIndex = data.users.findIndex(users => users.id == req.params.id);
    data.users.splice(postIndex, 1);
    res.redirect('/')
});


app.post('/posts/new', (req, res)=> {
    console.log(req.body)
    let newPost = { ...req.body, date : new Date(), id : data.posts.length + 1}
    data.posts.push(newPost)
    res.redirect('/')
})

// DELETE REQUEST
app.post('/posts/:id/delete', (req, res) => {
    const postIndex = data.posts.findIndex(post => post.id == req.params.id);
    data.posts.splice(postIndex, 1);
    res.redirect('/')
    
});


// express server
const PORT = 3000
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`)
})