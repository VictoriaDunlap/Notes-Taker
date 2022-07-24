const express = require('express')
const path = require('path')
const uuid = require('./helpers/uuid')
// const data = require('.../db/db.json')

const PORT = 3333
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.get('/api/notes', (req,res) => {
    res.json(data)
})

app.post('/api/notes', (req,res) => {
    const { title, text } = req.body 

    if(title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        }

        const response = {
            status: 'success',
            body: newNote,
        }
        console.log(response)
        res.json(response)
    } else {
        res.json('Error in saving note')
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });