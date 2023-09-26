const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');

const mainRoutes = require('./routes/mainRoutes');
const adminRoutes = require('./routes/adminRoutes');
const usersRoutes = require('./routes/usersRoutes');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const restrictToAdmin = require('./middlewares/restrictAdminMiddleware');
const categoriasMiddleware = require('./middlewares/categoriasMiddleware');

const app = express();

require('dotenv').config();
const PORT = parseInt(process.env.PORT);

app.set("view engine", "ejs")

app.use(express.static(path.resolve(__dirname, './public')));

app.use(session({
    secret:"It's a secret",
    resave: false,
    saveUninitialized: false,
}));
app.use(cookies());
app.use(userLoggedMiddleware);
app.use(categoriasMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(methodOverride('_method'));


app.use('/', mainRoutes);
app.use('/administrar', restrictToAdmin, adminRoutes);
app.use('/users', usersRoutes);


app.use((req,res,next)=>{
    res.status(404).render('not-found');
})

app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT));