const fs = require('fs');

const app = {};

app.config = {
  intervalTime: 1000,
};

app.getAllJokes = callback => {
  fs.readFile(`${process.cwd()}/lib/db.json`, (err, data) => {
    if (err) callback(err);
    try {
      const { jokes } = JSON.parse(data);
      callback(null, jokes);
    } catch(err) {
      if (err) callback(err);
    }
  })
}

app.setTimeBetweenJokes = timeBetweenJokes => {
  app.config.intervalTime = timeBetweenJokes;
}

app.makeJoke = jokes => {
  const max = jokes.length;
  const randomJoke = jokes[Math.floor(Math.random() * max)];
  return randomJoke;
}

app.makeJokes = () => {
  app.getAllJokes((err, jokes) => {
    if (err) throw err;
    setInterval(() => {
      const joke = app.makeJoke(jokes);
      console.log(joke);
    }, app.config.intervalTime);
  });
}

module.exports = app;
