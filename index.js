const express = require('express');
const path = require('path');
const { connectToMongoDB } = require('./connection');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const profileRouter = require('./routes/profile');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');
const { Blog } = require('./models/blog');

const app = express();
const port = 8000;

// Mongodb Connection Starts
connectToMongoDB("mongodb://localhost:27017/blogify").then(() =>
    console.log("Mongodb is connected")
);
// Mongodb Connection Ends

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
// Middleware Start
app.use(express.static(path.resolve('./public')))
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))


// Middleware Ends

// Route Start
app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({})
    return res.render('home', {
        user: req.user,
        blogs: allBlogs
    });

});
app.use('/user', userRouter)
app.use('/blog', blogRouter)
app.use('/profile', profileRouter)
// Route Ends

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:` + port);
});

