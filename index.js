const express = require('express');
const { logErrors, respondNoRessourceFound } = require('./controller/errorController');
const homeRouter = require('./routes/homeRoute');
const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'pug')
app.set('views', './views')
app.use(logErrors)
app.use('/', homeRouter);
app.use(respondNoRessourceFound)


app.listen(port, () => console.log(`Server is running on port : ${port}`));