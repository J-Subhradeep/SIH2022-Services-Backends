const checkResType = (file) => {
  const [one, two] = ["image", "video"].map((unit) => file != unit);
  return one == two;
};
module.exports = checkResType;
