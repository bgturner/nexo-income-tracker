const convertInterest = require("../../src/helpers/nexoCsv2Ledger.js");

/**
 * Follows the JSON structure that `react-csv-reader` will produce.
 * The object properties follow the CSV headers that nexo uses.
 */
const nexoCsvReaderTransactions = {
  interest: {
    amount: 0.00002878,
    currency: "BTC",
    date___time: "2021-11-12 01:00:03",
    details: "approved / BTC Interest Earned",
    outstanding_loan: "$0.00",
    transaction: "NXTcblPhKYupm",
    type: "Interest",
    usd_equivalent: "$1.8642086360035",
  },
};

const nexoJournalTransactions = {
  interest: {
    transactionId: "NXTcblPhKYupm",
    csvFingerprint:
      "b28c94b2195c8ed259f0b415aaee3f39b0b2920a4537611499fa044956917a21",
    date: "2021-11-12 01:00:03",
    type: "Interest",
    details: "approved / BTC Interest Earned",
    usdEquivalent: 1.8643086360035,
    entries: [
      {
        account: "Assets:Current Assets:Nexo:BTC",
        currency: "BTC",
        amount: 0.00002878,
      },
      {
        account: "Income:Interest:Nexo:BTC",
        currency: "USD",
        amount: 1.8643086360035,
      },
    ],
  },
};

const convertedInterestTransaction = convertInterest(
  nexoCsvReaderTransactions.interest
);

test("The date___time property is converted to the date property.", () => {
  expect(convertedInterestTransaction).toHaveProperty("date");
  expect(convertedInterestTransaction).not.toHaveProperty("date___time");
  expect(convertedInterestTransaction.date).toEqual(
    nexoCsvReaderTransactions.interest.date___time
  );
});
test.todo("The entries property has two entries."), () => {};
test.todo("The entry for the income account has the correct values."), () => {};
test.todo("The entry for the asset account has the correct values."), () => {};
test("The transaction property is converted to the transactionId property.", () => {
  expect(convertedInterestTransaction).toHaveProperty("transactionId");
  expect(convertedInterestTransaction).not.toHaveProperty("transaction");
  expect(convertedInterestTransaction.transactionId).toEqual(
    nexoCsvReaderTransactions.interest.transaction
  );
});

test("The csvFingerprint is correctly generated from the original object.", () => {
  expect(convertedInterestTransaction).toHaveProperty("csvFingerprint");
  expect(convertedInterestTransaction.csvFingerprint).toEqual(
    "b28c94b2195c8ed259f0b415aaee3f39b0b2920a4537611499fa044956917a21"
  );
});

test("The usd_equivalent is converted to a float.", () => {
  expect(convertedInterestTransaction).toHaveProperty("usdEquivalent");
  expect(convertedInterestTransaction).not.toHaveProperty("usd_equivalent");
  expect(convertedInterestTransaction.usdEquivalent).toBeCloseTo(
    nexoJournalTransactions.interest.usdEquivalent
  );
});

