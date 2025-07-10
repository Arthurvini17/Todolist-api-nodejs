const express = require('express');
const app = express();
const port = 3000;


app.route('/user')
    .get((req, res) => {
        res.send('Get a random user')
    })
    .post((req, res) => {
        res.send('Send a user')
    })
    .put((req, res) => {
        res.send('update a user')
    })
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})