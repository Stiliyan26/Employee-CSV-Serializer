import logo from './logo.svg';
import './App.css';
import EmployeeTable from './components/EmployeeTable';
import Papa from "papaparse";
import { useState } from 'react';
import { getAllProjectsInfo, getAllPairs, getLongestPair } from './utils/data'
import { parseCsv } from './utils/parseCsv'
 
function App() {
  const [longestPair, setLongestPair] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onCsvHandler = async (e) =>
  {
    e.preventDefault();

    setIsLoading(true);
    setLongestPair(null);
    setError("");

    try {
      const file = e.target.files[0];
      const valueArray = await parseCsv(file);

      const projects = getAllProjectsInfo(valueArray);
      const pairs = getAllPairs(projects);
      const longestPairOfEmp = getLongestPair(pairs);

      setLongestPair(longestPairOfEmp);
      setIsLoading(false);
    }
    catch {
      setError(error.message);
    }
  };  

  return (
    <div className="App">
      <div className="container">
        <label htmlFor='file' className="file-label">
          <input
            type="file"
            name="file"
            id="file"
            onChange={onCsvHandler}
            accept='.csv'
            className='input-file'
          />
          { isLoading ? "Loading..." : "Upload CSV file"}
        </label>

        { error && <p class="error">{error}</p>}

        { longestPair && <EmployeeTable longestPair={ longestPair }/>}
      </div>
    </div>
  );
}

export default App;
