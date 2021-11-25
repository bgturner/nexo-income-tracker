const getUsdAmount = require("./getUsdAmount");
const convertTransaction = require("./convertTransactionBase.js");

function interestEntries(t) {
  return [
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
    ];
}

const convertInterest = convertTransaction("Interest", interestEntries);

module.exports = convertInterest;
