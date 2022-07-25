const express = require('express')
const path = require('path')
const uuid = path.basename('C:\\Users\\Charli\\Desktop\\Notes-Taker\\Develop\\helpers\\uuid.js')
const data = path.basename('C:\\Users\\Charli\\Desktop\\Notes-Taker\\Develop\\db\\db.json')
const notesHTML = path.basename('C:\\Users\\Charli\\Desktop\\Notes-Taker\\Develop\\public\\assets\\notes.html')
const indexHTMl = path.basename('C:\\Users\\Charli\\Desktop\\Notes-Taker\\Develop\\public\\assets\\index.html')

const PORT = 3333
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, notesHTML))
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, indexHTMl))
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