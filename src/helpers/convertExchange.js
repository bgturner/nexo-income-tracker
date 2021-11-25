const getUsdAmount = require("./getUsdAmount");
const convertTransaction = require("./convertTransactionBase.js");

/**
 * Split and sanitize exchange transaction currencies.
 *
 * @param value  The value to split. Will look something like 'DAI/BTC'
 *
 * @returns array
 */
function splitCurrency(value) {
  return value.toString().split("/");
}

/**
 * Split and sanitize exchange transaction amounts.
 *
 * @param value  The value to split. Will look something like "-560.09712514 / +0.01447053"
 *
 * @returns array
 */
function splitAmount(value) {
  return value.toString().replace(/[ +]/g, "").split("/");
}

function exchangeEntries(t) {
  return [
    {
      account: `Assets:Current Assets:Nexo:${splitCurrency(t.currency)[1]}`,
      currency: splitCurrency(t.currency)[1],
      amount: +splitAmount(t.amount)[1],
    },
    {
      account: `Assets:Current Assets:Nexo:${splitCurrency(t.currency)[0]}`,
      currency: splitCurrency(t.currency)[0],
      amount: +splitAmount(t.amount)[0],
    },
  ];
}

/**
 * Convert 'Exchange' transactions from a Nexo CSV format to Ledger-ready format.
 */
const convertExchange = convertTransaction("Exchange", exchangeEntries);

module.exports = convertExchange;
