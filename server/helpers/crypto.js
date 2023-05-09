const crypto = require('crypto');

const generateHash = (updatingValues, code = 'md5') => {
  const hash = crypto.createHash(code);
  if (updatingValues.length) {
    updatingValues.forEach((val) => {
      hash.update(val);
    });
  } else {
    hash.update(updatingValues);
  }
  const hashString = hash.digest('hex');
  return hashString;
};

const generatePassword = (
  length = 20,
  wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$',
) => Array.from(crypto.randomFillSync(new Uint32Array(length)))
  .map((x) => wishlist[x % wishlist.length])
  .join('');

module.exports = { generateHash, generatePassword };
