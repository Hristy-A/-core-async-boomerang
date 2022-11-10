module.exports = function getRandom(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
};
