const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

// GET路由处理器，用于获取学生信息
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

// GET路由处理器，用于获取老师信息
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

// POST路由处理器，用于保存新用户信息
app.post('/saveUser', (req, res) => {
    const postData = req.body;
    const jsonFile = postData.type === 'student' ? 'student.json' : 'teacher.json';
    const newData = postData.newUser;
    
    fs.readFile(jsonFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error saving user');
            return;
        }
        const userData = JSON.parse(data);
        userData.push(newData);
        fs.writeFile(jsonFile, JSON.stringify(userData), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                res.status(500).send('Error saving user');
                return;
            }
            console.log('User has been saved successfully');
            res.send('User saved successfully');
        });
    });
});

// 启动服务器，监听端口
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
