import React, { useState } from "react";
import CSVReader from "react-csv-reader";

import "../styles/main.css";
function App() {
  let [transactions, setTransactions] = useState([
    {
      transaction: "",
      date___time: "",
      amount: "",
      currency: "",
      details: "",
      outstanding_loan: "",
      type: "",
      usd_equivalent: "",
    },
  ]);

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  let handleCsvUpload = (data) => {
    setTransactions(data);
    console.log(data);
  };

  let handleCsvUploadError = (error) => {
    console.log(error);
  };

  return (
    <div className="mt-20">
      <h1 className="text-3xl text-center">Nexo Income Tracker</h1>
      <div id="csv-file-uploader" className="p-4">
        <div className="p-4 border">
          <CSVReader
            cssClass="csv-reader-input flex space-x-4 items-align items-center"
            label="Upload Nexo Transactions"
            onFileLoaded={handleCsvUpload}
            onError={handleCsvUploadError}
            inputId="nexo-csv"
            inputName="nexo-csv"
            parserOptions={papaparseOptions}
          />
        </div>
      </div>
      <table id="nexo-transactions" className="p-4">
        <tbody>
          {transactions.map((t) => (
            <tr key={t.transaction}>
              <td>{t.transaction}</td>
              <td>{t.date___time}</td>
              <td>{t.amount}</td>
              <td>{t.currency}</td>
              <td>{t.details}</td>
              <td>{t.outstanding_loan}</td>
              <td>{t.type}</td>
              <td>{t.usd_equivalent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
