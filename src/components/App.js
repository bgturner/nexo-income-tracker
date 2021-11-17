import React, { useState } from 'react'
import CSVReader from 'react-csv-reader'

import '../styles/main.css'
function App() {

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header =>
      header
        .toLowerCase()
        .replace(/\W/g, '_')
  }

  let handleCsvUpload = (data) => {
    console.log(data);
  }

  let handleCsvUploadError = (error) => {
    console.log(error);
  }

  return (
    <div className="mt-20">
      <h1 className="text-3xl text-center">
        Nexo Income Tracker
      </h1>
      <div id="csv-file-uploader" className="p-4">
        <div className="p-4 border">
          <CSVReader
            cssClass="csv-reader-input"
            label="Upload Nexo Transactions"
            onFileLoaded={handleCsvUpload}
            onError={handleCsvUploadError}
            inputId="nexo-csv"
            inputName="nexo-csv"
            parserOptions={papaparseOptions}
          />
        </div>
      </div>
      <div id="nexo-transactions"></div>
    </div>
  )
}

export default App
