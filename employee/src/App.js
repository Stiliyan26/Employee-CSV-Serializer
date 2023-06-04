import logo from './logo.svg';
import './App.css';
import EmployeeTable from './components/EmployeeTable';
import Papa from "papaparse";
import { useState } from 'react';
import { getAllProjectsInfo, getAllPairs, getLongestPair } from './utils/data'
 
function App() {
  const [tableRows, setTableRows] = useState([]);
  const [longestPair, setLongestPair] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const onCsvHandler = (e) =>
  {
    e.preventDefault();
    setIsLoading(true);
    
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowArray = [];
        const valueArray = [];
        
        results.data.map((d) => {
          rowArray.push(Object.keys(d));
          valueArray.push(Object.values(d));
        });

        const projects = getAllProjectsInfo(valueArray);
        const pairs = getAllPairs(projects);
        const longestPair = getLongestPair(pairs);
      }
    });
  };


  return (
    <div className="App">
      <div className="container">
        <input
          type="file"
          name="file"
          onChange={onCsvHandler}
          accept='.csv'
          className='input-file'
        />
        <EmployeeTable />
      </div>
    </div>
  );
}

export default App;
