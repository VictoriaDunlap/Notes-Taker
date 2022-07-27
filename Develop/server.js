const express = require('express')
const path = require('path')
const uuid = require('./helpers/uuid')
const data = require('./db/db.json')
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils')
const { fstat, writeFile } = require('fs')

const PORT = 3333
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// return notes from notes.html
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// return index.html 
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

// reads the db.json file 
app.get('/api/notes', (req,res) => {
    res.json(data)
})

// create a new note 
app.post('/api/notes', (req,res) => {
    const { title, text } = req.body 

    if(title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        }
      const parsedData = JSON.parse(newNote)
      const readData = fs.readFile(parsedData)
      const stringifiedData = JSON.stringify(readData, null, 4)
      fs.writeFile(data,stringifiedData)
      
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

app.delete('/api/notes/delete', (req, res) => {
    console.info(`${req.method} request received to delete note`)

    const { title, text } = req.body 
    
    if (title && text) {
      const note = {
        title,
        text,
        note_id: uuid()
      }
    
      readFromFile(note, data)
      res.json(`Delete successful`)
    } else {
      res.error('Error in deleting appointment')
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });