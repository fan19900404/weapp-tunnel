const sha1 = require("./sha1");
const config = require("../config");

/**
 * 计算签名
 */
const compute = input => {
  return sha1(input + config.tunnelSignatureKey);
};

/**
 * 校验签名
 */
const check = (input, signature) => {
  return compute(input) === signature;
};

module.exports = { compute, check };
