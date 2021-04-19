const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const posts = {};


app.use(express.json());
app.use(cors());
const handleEvent = (type, data) => {
    if( type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: []};
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status});
     }
     
     if ( type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
     }
}

app.get('/posts', (req, res) => {
    console.log("Fetching Posts ....")
    res.send(posts)
});
app.post('/events', (req, res) => {
    const { type, data } = req.body;   
    handleEvent(type, data);
     res.send({"status": "OK"});

});


app.listen(4002, async () => {
    console.log('Listening on 4002');
    const result = await axios.get('http://eventbus-srv:4005/events');
    for (let event of result.data) {
        console.log('Processing event: ', event.type);
        handleEvent(event.type, event.data);
    }
});