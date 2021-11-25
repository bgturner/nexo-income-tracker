const convertWithdrawal = require("../../src/helpers/convertWithdrawal.js");

/**
 * Follows the JSON structure that `react-csv-reader` will produce.
 * The object properties follow the CSV headers that nexo uses.
 */
const originalT = {
  amount: -0.1285,
  currency: "BTC",
  date___time: "2020-02-22 05:00:52",
  details: "approved / BTC withdrawal",
  outstanding_loan: "$0.00",
  transaction: "NXTlkeBtERqXF",
  type: "Withdrawal",
  usd_equivalent: "$1243.0833",
};

/**
 * The desired state after transforming the interest transaction.
 *
 * Note that the csvFingerprint is a hash generated from the original
 * transaction object so that we have a way of easily determining if
 * that transaction has already been imported and transformed.
 */
const desiredT = {
  transactionId: "NXTlkeBtERqXF",
  csvFingerprint:
    "b28c94b2195c8ed259f0b415aaee3f39b0b2920a4537611499fa044956917a21",
  date: "2020-02-22 05:00:52",
  transactionType: "Withdrawal",
  details: "approved / BTC withdrawal",
  usdEquivalent: 1243.0833,
  entries: [
    {
      account: "Assets:Current Assets:Nexo:BTC",
      currency: "BTC",
      amount: -0.1285,
    },
    {
      account: "Equity:Withdrawals:Nexo:BTC",
      currency: "USD",
      amount: 1243.0833,
    },
  ],
};

const convertedT = convertWithdrawal(originalT);

describe("The main parts of the Withdrawal transaction are correct", () => {
  test("The details property is correctly set.", () => {
    expect(convertedT).toHaveProperty("details");
    expect(convertedT.details).toEqual(desiredT.details);
  });

  test("The date___time property is converted to the date property.", () => {
    expect(convertedT).toHaveProperty("date");
    expect(convertedT).not.toHaveProperty("date___time");
    expect(convertedT.date).toEqual(desiredT.date);
  });

  test("The transaction property is converted to the transactionId property.", () => {
    expect(convertedT).toHaveProperty("transactionId");
    expect(convertedT).not.toHaveProperty("transaction");
    expect(convertedT.transactionId).toEqual(desiredT.transactionId);
  });

  test("The csvFingerprint is correctly generated from the original object.", () => {
    expect(convertedT).toHaveProperty("csvFingerprint");
    expect(convertedT.csvFingerprint).toEqual(desiredT.csvFingerprint);
  });

  test("The usd_equivalent is converted to a float.", () => {
    expect(convertedT).toHaveProperty("usdEquivalent");
    expect(convertedT).not.toHaveProperty("usd_equivalent");
    expect(convertedT.usdEquivalent).toBeCloseTo(desiredT.usdEquivalent);
  });

  test("The transactionType property is correctly set.", () => {
    expect(convertedT).toHaveProperty("transactionType");
    expect(convertedT.transactionType).toBe("Withdrawal");
  });
});

describe("The transaction entries are generated correctly.", () => {
  test("The entries property has at least two entries.", () => {
    expect(convertedT.entries.length).toBeGreaterThanOrEqual(2);
  });

  describe("The Asset entry has the correct values.", () => {
    test("The amount property of the Asset entry is correct.", () => {
      expect(convertedT.entries[0].amount).toBeCloseTo(
        desiredT.entries[0].amount
      );
    });
    test("The currency property of the Asset entry is correct.", () => {
      expect(convertedT.entries[0].currency).toBe(desiredT.entries[0].currency);
    });
    test("The account property of the Asset entry is correct.", () => {
      expect(convertedT.entries[0].account).toBe(desiredT.entries[0].account);
    });
  });

  describe("The Equity entry has the correct values.", () => {
    test("The amount property of the Equity entry is correct.", () => {
      expect(convertedT.entries[1].amount).toBeCloseTo(
        desiredT.entries[1].amount
      );
    });
    test("The currency property of the Equity entry is correct.", () => {
      expect(convertedT.entries[1].currency).toBe(desiredT.entries[1].currency);
    });
    test("The account property of the Equity entry is correct.", () => {
      expect(convertedT.entries[1].account).toBe(desiredT.entries[1].account);
    });
  });
});
