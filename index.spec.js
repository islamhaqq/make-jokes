const assert = require('assert');
const fs = require('fs');

const app = require('./index');

const testJokesFile = {
  "jokes": [
    "some joke",
    "some other joke"
  ]
};

// stub file system
fs.readFile = (filename, callback) => {
  callback(null, new Buffer(JSON.stringify(testJokesFile)));
};

// test makeJoke returns a joke from the file
let {makeJoke} = app;
makeJoke((err, joke) => {
  assert(testJokesFile.jokes.includes(joke), "makeJoke returns a joke from the file");
});

// test makeJokes calls makeJoke
let isMakeJokeCalled = false;
app.makeJoke = callback => {
  isMakeJokeCalled = true;
  makeJoke(callback);
}
// stub to make a joke only once to prevent infinite loop
setInterval = (callback, delay) => {
  setTimeout(callback, delay);
}
app.makeJokes(app.config.intervalTime = 1000, (err, joke) => {
  assert(isMakeJokeCalled === true, 'makeJoke is called');
});

// test if joke is made on every set interval time
// app.makeJokes = (intervalTime) => {

// app.makeJokes(intervalTime)

// test that there is no error
