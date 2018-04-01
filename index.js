const fs = require('fs');

const app = {};

app.config = {
  intervalTime: 1000,
};

app.getAllJokes = callback => {
  fs.readFile('./src/jokes.json', (err, data) => {
    if (err) callback(err);
    try {
      const { jokes } = JSON.parse(data);
      callback(null, jokes);
    } catch(err) {
      if (err) callback(err);
    }
  })
}

app.makeJoke = jokes => {
  const max = jokes.length;
  const randomJoke = jokes[Math.floor(Math.random() * max)];
  return randomJoke;
}

app.makeJokes = intervalTime => {
  app.getAllJokes((err, jokes) => {
    if (err) throw new Error('Error getting all jokes from file!', err);
    setInterval(() => {
      const joke = app.makeJoke(jokes);
      console.log(joke);
    }, intervalTime);
  });
}

// app.makeJokes(app.config.intervalTime);

module.exports = app;
