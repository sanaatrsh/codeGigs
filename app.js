const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/database');
const { render } = require('ejs');


const app = express();

//Ejs
// app.engine('ejs', )
app.set('view engine', 'ejs');
app.set('views', 'views');

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.render('index', {
        path: '/'
    })
})

// Gig routes
app.use('/gigs', require('./routes/gigs'))


sequelize.sync()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    })