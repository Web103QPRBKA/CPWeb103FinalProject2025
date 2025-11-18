import { useState, useEffect } from 'react';
import '../css/AnswerTable.css';

const AnswerTable = ({ solution, gridState }) => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
if (solution && solution.solution) {
  const solutionData = solution.solution;
  
  if (Array.isArray(solutionData) && solutionData.length > 0) {
const firstItem = solutionData[0];
const allKeys = Object.keys(firstItem).filter(key => key !== 'id');

const headers = allKeys.map(formatHeader);

setTableData({
  headers,
  rows: solutionData
});
  }
}
  }, [solution]);

  const formatHeader = (name) => {
return name
  .replace(/([A-Z])/g, ' $1')
  .replace(/^./, (str) => str.toUpperCase())
  .trim();
  };

  if (!tableData) {
return <div className="answer-table-container"><p>Loading answer reference...</p></div>;
  }

  return (
<div className="answer-table-container">
  <h3>Answer Reference</h3>
  <p className="table-description">
This table shows the correct solution. Use the grid to figure out the matches!
  </p>
  
  <div className="answer-table-wrapper">
<table className="answer-table">
  <thead>
<tr>
  {tableData.headers.map((header, idx) => (
<th key={idx}>{header}</th>
  ))}
</tr>
  </thead>
  <tbody>
{tableData.rows.map((row, rowIdx) => (
  <tr key={rowIdx}>
{Object.keys(row).filter(key => key !== 'id').map((key, cellIdx) => (
  <td key={cellIdx}>{row[key]}</td>
))}
  </tr>
))}
  </tbody>
</table>
  </div>
</div>
  );
};

export default AnswerTable;
