import React, { useState } from 'react'

import '../styles/main.css'
function App() {

  let [csvFile, setCsvFile] = useState({
    name: '',
    path: '',
    mtime: '',
    size: '',
  });

  let handleChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    setCsvFile({
      name: file.name,
      path: file.path,
      mtime: file.lastModified,
      size: file.size,
    })
  }

  let save = (e) => {
    e.preventDefault();
    console.log(csvFile)
  }

  return (
    <div className="mt-20">
      <h1 className="text-3xl text-center">
        Nexo Income Tracker
      </h1>
      <form className="upload-csv p-4" onSubmit={save}>
        <label htmlFor="nexo-csv-file" className="block p-2 mb-4 border">
          <div>Upload CSV File</div>
          <div>{csvFile.name}</div>
          <input id="nexo-csv-file" name="nexo-csv-file" type="file" className="hidden" onChange={handleChange}
          />
        </label>
        <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type="submit">Process CSV</button>
      </form>
    </div>
  )
}

export default App
