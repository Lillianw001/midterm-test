const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());


app.get('/student.json', (req, res) => {
    fs.readFile('student.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error fetching student data');
            return;
        }
        res.json(JSON.parse(data));
    });
});


app.get('/teacher.json', (req, res) => {
    fs.readFile('teacher.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error fetching teacher data');
            return;
        }
        res.json(JSON.parse(data));
    });
});


app.post('/saveUser', (req, res) => {
    const postData = req.body;
    const jsonFile = (postData.type === 'student' )? 'student.json' : 'teacher.json';
    const newData = postData.newUser;
    
    fs.readFile(jsonFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error saving user');
            return;
        }
        const userData = JSON.parse(data);
        userData.push(newData);
        fs.writeFile(jsonFile, JSON.stringify(userData,null,2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                res.status(500).send('Error saving user');
                return;
            }
            console.log('User has been saved successfully!!!!!');
            res.send('User saved successfully');
        });
    });
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


