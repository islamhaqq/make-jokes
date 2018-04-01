const fs = require('fs');

const app = {};

app.config = {
  intervalTime: 1000,
};

app.makeJoke = callback => {
  fs.readFile('./src/jokes.json', (err, data) => {
    if (err) callback(err);

    try {
      const { jokes } = JSON.parse(data);
      callback(null, jokes[0]);
    } catch(err) {
      if (err) callback(err);
    }
  })
}

app.makeJokes = (intervalTime, callback) => {
  setInterval(() => {
    app.makeJoke((err, joke) => {
      if (err) callback(err);
      callback(null, joke);
    });
  }, intervalTime);
}

module.exports = app;
