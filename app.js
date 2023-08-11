const express = require('express');
const path = require('path');
const mainRoutes = require('./routes/mainRoutes');
const adminRoutes = require('./routes/adminRoutes');
const usersRoutes = require('./routes/usersRoutes');
const methodOverride = require('method-override');
const session = require('express-session');

const app = express();

require('dotenv').config();
const PORT = parseInt(process.env.PORT);

app.set("view engine", "ejs")

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({secret:'Soho secret'}));

app.use('/', mainRoutes);
app.use('/administrar', adminRoutes);
app.use('/users', usersRoutes);


app.use((req,res,next)=>{
    res.status(404).render('not-found');
})

app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT));