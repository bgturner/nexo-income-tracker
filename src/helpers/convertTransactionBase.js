const hash = require("./hash");
const getUsdAmount = require("./getUsdAmount");

function convertTransaction(transactionType, entriesCallback) {
  return function (transaction) {
    return {
      date: transaction.date___time,
      transactionId: transaction.transaction,
      csvFingerprint: hash(transaction),
      usdEquivalent: getUsdAmount(transaction.usd_equivalent),
      transactionType: transactionType,
      details: transaction.details,
      entries: entriesCallback(transaction),
    };
  };
}

module.exports = convertTransaction;
