const hash = require("./hash");
const getUsdAmount = require("./getUsdAmount");

function convertDeposit(t) {
  return {
    date: t.date___time,
    transactionId: t.transaction,
    csvFingerprint: hash(t),
    usdEquivalent: getUsdAmount(t.usd_equivalent),
    transactionType: 'Deposit',
    details: t.details,
    entries: [
      {
        account: `Assets:Current Assets:Nexo:${t.currency}`,
        currency: t.currency,
        amount: t.amount,
      },
      {
        account: `Equity:Deposits:Nexo:${t.currency}`,
        currency: "USD",
        amount: getUsdAmount(t.usd_equivalent) * -1,
      },
    ],
  };
}
module.exports = convertDeposit;
