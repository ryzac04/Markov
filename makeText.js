const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require('./markov');

function makeText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText())
}

function readText(path) {
    fs.readFile(path, 'utf8', (err, text) => {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
            process.kill(1);
        } else {
            makeText(text)
        }
    })
}

async function readURL(url) {
    try {
        let res = await axios.get(url);
        console.log(res);
    } catch (err) {
        console.log(`Error fetching ${url}: ${err}`);
        process.kill(1);
    }
    makeText(res.data)
}

let method = process.argv[2]
let path = process.argv[3]

if (method === 'file') {
    readText(path);
}
else if (method === 'url') {
    readURL(path);
}
else {
    console.log(`Unknown method: ${method}`);
    process.exit(1)
}
