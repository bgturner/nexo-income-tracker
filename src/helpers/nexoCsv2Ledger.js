const hash = require("./hash");

function convertInterest(t) {
  return {
    date: t.date___time,
    transactionId: t.transaction,
    csvFingerprint: hash(t),
    usdEquivalent: parseFloat(t.usd_equivalent.replace(/\$/g, "")),
  };
}
module.exports = convertInterest;
