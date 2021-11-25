const getUsdAmount = require("./getUsdAmount");
const convertTransaction = require("./convertTransactionBase.js");

function withdrawalEntries(t) {
  return [
      {
        account: `Assets:Current Assets:Nexo:${t.currency}`,
        currency: t.currency,
        amount: t.amount,
      },
      {
        account: `Equity:Withdrawals:Nexo:${t.currency}`,
        currency: "USD",
        amount: getUsdAmount(t.usd_equivalent),
      },
    ];
}

const convertWithdrawal = convertTransaction("Withdrawal", withdrawalEntries);

module.exports = convertWithdrawal;
