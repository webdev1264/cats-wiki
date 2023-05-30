const isValidObjId = (id) => {
  regex = /^[0-9a-fA-F]{24}$/;
  return regex.test(id);
};

module.exports = isValidObjId;
