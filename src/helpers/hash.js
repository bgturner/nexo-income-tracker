const crypto = require("crypto");

/**
 * A simple hash function for generating fingerprints.
 *
 * @param d - A piece of data to generate the hash from.
 *
 * @returns string
 */
const hash = (d) => {
  const buffer = Buffer.isBuffer(d) ? d : Buffer.from(d.toString());
  return crypto.createHash("sha256").update(buffer).digest("hex");
};

module.exports = hash;
