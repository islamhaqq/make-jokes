const fs = require('fs');
const http = require('http');

const apiUrl = 'http://jsonplaceholder.typicode.com';

http.get(`${apiUrl}/posts`, res => {
    let rawData = '';
    res.on('data', chunk => rawData += chunk);
    res.on('end', () => {
        try {
            parsedData = JSON.parse(rawData);
        } catch (err) {
            if (err) throw err;
        }

        fs.writeFile('db.json', JSON.stringify(parsedData), err => {
            if (err) throw err;
        });
    });
});

fs.readFile('db.json', (err, data) => {
    if (err) throw err;

    const parsedData = JSON.parse(data);
    console.log(parsedData);
});