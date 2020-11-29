const express = require('express');
const axios = require('axios');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://localhost:4000/events', event); //POSTS
    axios.post('http://localhost:4001/events', event); //COMMENTS
    axios.post('http://localhost:4002/events', event); // QUERY
    axios.post('http://localhost:4003/events', event); // MODERATION
   

    res.send({ status: 'OK'});
});

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(4005, () => {
    console.log('Listening on 4005');
})