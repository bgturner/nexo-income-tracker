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

/**
 * The desired state after transforming the interest transaction.
 *
 * Note that the csvFingerprint is a hash generated from the original
 * transaction object so that we have a way of easily determining if
 * that transaction has already been imported and transformed.
 */
const nexoJournalTransactions = {
  interest: {
    transactionId: "NXTcblPhKYupm",
    csvFingerprint:
      "b28c94b2195c8ed259f0b415aaee3f39b0b2920a4537611499fa044956917a21",
    date: "2021-11-12 01:00:03",
    transactionType: "Interest",
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

describe("The main parts of the Income transaction are correct", () => {
  test("The details property is correctly set.", () => {
    expect(convertedInterestTransaction).toHaveProperty("details");
    expect(convertedInterestTransaction.details).toEqual(
      nexoJournalTransactions.interest.details
    );
  });

  test("The date___time property is converted to the date property.", () => {
    expect(convertedInterestTransaction).toHaveProperty("date");
    expect(convertedInterestTransaction).not.toHaveProperty("date___time");
    expect(convertedInterestTransaction.date).toEqual(
      nexoCsvReaderTransactions.interest.date___time
    );
  });

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
      nexoJournalTransactions.interest.csvFingerprint
    );
  });

  test("The usd_equivalent is converted to a float.", () => {
    expect(convertedInterestTransaction).toHaveProperty("usdEquivalent");
    expect(convertedInterestTransaction).not.toHaveProperty("usd_equivalent");
    expect(convertedInterestTransaction.usdEquivalent).toBeCloseTo(
      nexoJournalTransactions.interest.usdEquivalent
    );
  });

  test("The transactionType property is correctly set.", () => {
    expect(convertedInterestTransaction).toHaveProperty("transactionType");
    expect(convertedInterestTransaction.transactionType).toBe("Interest");
  });
});

describe("The transaction entries are generated correctly.", () => {
  test("The entries property has at least two entries.", () => {
    expect(convertedInterestTransaction.entries.length).toBeGreaterThanOrEqual(
      2
    );
  });

  describe("The Asset entry has the correct values.", () => {
    test("The amount property of the Asset entry is correct.", () => {
      expect(convertedInterestTransaction.entries[0].amount).toBeCloseTo(
        nexoJournalTransactions.interest.entries[0].amount
      );
    });
    test("The currency property of the Asset entry is correct.", () => {
      expect(convertedInterestTransaction.entries[0].currency).toBe(
        nexoJournalTransactions.interest.entries[0].currency
      );
    });
    test("The account property of the Asset entry is correct.", () => {
      expect(convertedInterestTransaction.entries[0].account).toBe(
        nexoJournalTransactions.interest.entries[0].account
      );
    });
  });

  describe("The Income entry has the correct values.", () => {
    test("The amount property of the Income entry is correct.", () => {
      expect(convertedInterestTransaction.entries[1].amount).toBeCloseTo(
        nexoJournalTransactions.interest.entries[1].amount
      );
    });
    test("The currency property of the Income entry is correct.", () => {
      expect(convertedInterestTransaction.entries[1].currency).toBe(
        nexoJournalTransactions.interest.entries[1].currency
      );
    });
    test("The account property of the Income entry is correct.", () => {
      expect(convertedInterestTransaction.entries[1].account).toBe(
        nexoJournalTransactions.interest.entries[1].account
      );
    });
  });
});
