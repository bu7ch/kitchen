const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const homeController = require('./controller/homeController')
app.set('view engine', 'pug')
app.set('views', './views')


app.get("/name/:myName", homeController.respondWithMyName)


app.listen(port, () => console.log(`Server is running on port : ${port}`));