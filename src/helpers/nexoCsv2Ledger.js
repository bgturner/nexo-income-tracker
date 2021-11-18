function convertInterest(t) {
  return {
    date: t.date___time,
    transactionId: t.transaction,
  };
}
module.exports = convertInterest;
