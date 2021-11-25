const getUsdAmount = require("./getUsdAmount");
const convertTransaction = require("./convertTransactionBase.js");

function dividendEntries(t) {
  return [
    {
      account: `Assets:Current Assets:Nexo:${t.currency}`,
      currency: t.currency,
      amount: t.amount,
    },
    {
      account: `Income:Dividends:Nexo:${t.currency}`,
      currency: "USD",
      amount: getUsdAmount(t.usd_equivalent) * -1,
    },
  ];
}

const convertDividend = convertTransaction("Dividend", dividendEntries);

module.exports = convertDividend;
