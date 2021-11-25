const getUsdAmount = require("./getUsdAmount");
const convertTransaction = require("./convertTransactionBase.js");

function depositEntries(t) {
  return [
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
    ];
}

const convertDeposit = convertTransaction("Deposit", depositEntries);

module.exports = convertDeposit;
