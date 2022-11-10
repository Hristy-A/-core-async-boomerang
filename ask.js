const readline = require('readline');

module.exports = (question) =>
  new Promise((res, rej) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, (answer) => {
      rl.close();
      res(answer);
    });
  });
