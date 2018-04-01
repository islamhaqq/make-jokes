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
const testJokes = testJokesFile.jokes;
getAllJokes((err, jokes) => {
  assert.deepEqual(jokes, testJokes, "getAllJokes gets all jokes from file");
});

// test makeJoke gets a random joke from the file
let {makeJoke} = app;
assert(testJokes.includes(makeJoke(testJokes)), "makeJoke makes a random joke");

// test makeJokes calls makeJoke
let wasMakeJokeCalled = false;
app.makeJoke = jokes => {
  wasMakeJokeCalled = true;
  return makeJoke(jokes);
}
// stub to make a joke only once to prevent infinite loop
setInterval = (callback, delay) => {
  setTimeout(callback, delay);
}
app.makeJokes(app.config.intervalTime = 1000);
// TODO: Fix async issue where assertion should only be called after makeJokes
// is completed.
assert(wasMakeJokeCalled === true, 'makeJoke is called by makeJokes');

// test if joke is made on every set interval time
// app.makeJokes = (intervalTime) => {

// app.makeJokes(intervalTime)

// test that there is no error
