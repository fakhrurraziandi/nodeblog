
const express = require('express')
const app = express();



app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/', require('./route/public'));


// app.get('post')


app.listen(8080, () => console.log('Example app listening on port 8080!'))
