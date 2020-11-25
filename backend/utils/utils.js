module.exports.regIdCheck = (id) => {
  const regex = /[0-9a-fA-F]{24}/;

  return id.length === 24 && regex.test(id);
};
