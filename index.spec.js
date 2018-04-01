const assert = require('assert');
const fs = require('fs');

const app = require('./index');

const testJokesFile = {
  "jokes": [
    "some joke",
    "some other joke",
    "another joke"
  ]
};

// test getAllJokes gets all jokes from file
fs.readFile = (filename, callback) => {
  callback(null, new Buffer(JSON.stringify(testJokesFile)));
};
let {getAllJokes} = app;
getAllJokes((err, jokes) => {
  assert.deepEqual(jokes, testJokesFile.jokes, "getAllJokes gets all jokes from file");
});

// test makeJoke gets a random joke
let {makeJoke} = app;
makeJoke((err, joke) => {
  assert(testJokesFile.jokes.includes(joke), "test makeJoke gets a random joke");
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
