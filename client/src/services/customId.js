const { customAlphabet } = require("nanoid");
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const customId = (length) => {
  const nanoid = customAlphabet(alphabet, length);
  return nanoid();
};

export default customId;
