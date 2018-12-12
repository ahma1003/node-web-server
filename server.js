const express = require('express');             
const hbs = require('hbs');         // templates
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


// vi tracker who server is working
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n')
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));       // middle ware teach the node program to do some think

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
   res.render('home.hbs', {
       pageTitle: 'Home Page',
       welcomeMessage: 'Welcome to my website',
       
   });
     
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        
    });
});

app.get('/bad', (req, res) => {
    res.send( {
        errorMessage: 'Unable to handle page'
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});                                       


/**
 * // to stop server: killall node
 */