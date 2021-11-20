const hash = require("./hash");

function getUsdAmount(amt) {
  return parseFloat(amt.replace(/\$/g, ""));
}

function convertInterest(t) {
  return {
    date: t.date___time,
    transactionId: t.transaction,
    csvFingerprint: hash(t),
    usdEquivalent: getUsdAmount(t.usd_equivalent),
    transactionType: 'Interest',
    details: t.details,
    entries: [
      {
        account: `Assets:Current Assets:Nexo:${t.currency}`,
        currency: t.currency,
        amount: t.amount,
      },
      {
        account: `Income:Interest:Nexo:${t.currency}`,
        currency: "USD",
        amount: getUsdAmount(t.usd_equivalent),
      },
    ],
  };
}
module.exports = convertInterest;
