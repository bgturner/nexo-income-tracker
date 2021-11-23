function getUsdAmount(amt) {
  return parseFloat(amt.replace(/\$/g, ""));
}

module.exports = getUsdAmount;
