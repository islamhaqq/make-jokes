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

const {makeJoke} = app;
makeJoke((err, joke) => {
  assert(testJokesFile.jokes.includes(joke), "makeJoke returns a joke from the file");
});

let isMakeJokeCalled = false;
makeJoke = () => {
  makeJoke();
  isMakeJokeCalled = true;
};
let {intervalTime} = app.config;
intervalTime = 1000;
app.makeJokes(intervalTime, joke => {
  assert(isMakeJokeCalled, true);

});

// test if joke is made on every set interval time
// app.makeJokes = (intervalTime) => {

}
// app.makeJokes(intervalTime)

// test that there is no error
