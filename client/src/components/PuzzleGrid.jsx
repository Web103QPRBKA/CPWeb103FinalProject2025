import { useState, useEffect, Fragment } from 'react';
import GridCell from './GridCell';
import { formatCategoryName } from '../utils/formatters';
import '../css/PuzzleGrid.css';

const PuzzleGrid = ({ solution }) => {
  const [gridData, setGridData] = useState(null);
  const [cellStates, setCellStates] = useState({});

  useEffect(() => {
if (solution && solution.solution) {
  const solutionData = solution.solution;
  
  if (Array.isArray(solutionData) && solutionData.length > 0) {
const firstItem = solutionData[0];
const allKeys = Object.keys(firstItem).filter(key => key !== 'id');

const friendKey = allKeys.find(key => 
  key.toLowerCase().includes('friend') || 
  key.toLowerCase().includes('name')
) || allKeys[0];

const categoryKeys = allKeys.filter(key => key !== friendKey);

const friendItems = solutionData.map(item => item[friendKey]);

// Create column categories - all categories together
const colCategories = categoryKeys.map(key => ({
  name: formatCategoryName(key),
  items: [...new Set(solutionData.map(item => item[key]))].filter(Boolean)
}));

setGridData({
  rowCategory: {
name: formatCategoryName(friendKey),
items: friendItems
  },
  colCategories
});
  }
}
  }, [solution]);

  if (!gridData) {
return <div className="puzzle-grid-container"><p>Loading grid...</p></div>;
  }

  const totalCols = gridData.colCategories.reduce((sum, cat) => sum + cat.items.length, 0);
  const totalRows = gridData.rowCategory.items.length;

  return (
<div className="puzzle-grid-container">
  <h3>Puzzle Grid</h3>
  <p className="grid-instructions">
Click cells to mark: Empty → ✓ (Yes) → ✗ (No) → Empty
  </p>
  
  <div className="grid-wrapper">
<div 
  className="logic-grid-table"
  style={{
gridTemplateColumns: `60px auto repeat(${totalCols}, 60px)`,
gridTemplateRows: `auto auto repeat(${totalRows}, 60px)`
  }}
>
  {/* Row 1: Top-left spacers and column category headers */}
  <div className="grid-cell-wrapper top-left-spacer" style={{ gridRow: '1', gridColumn: '1' }}></div>
  <div className="grid-cell-wrapper top-left-spacer" style={{ gridRow: '1', gridColumn: '2' }}></div>
  {gridData.colCategories.map((category, catIdx) => {
const startCol = 3 + gridData.colCategories.slice(0, catIdx).reduce((sum, cat) => sum + cat.items.length, 0);
return (
  <div 
key={`col-cat-${catIdx}`} 
className="grid-cell-wrapper"
style={{ 
  gridRow: '1',
  gridColumn: `${startCol} / span ${category.items.length}` 
}}
  >
<div className="column-category-header">
  {category.name}
</div>
  </div>
);
  })}

  {/* Row 2: Second row spacers and column item headers */}
  <div className="grid-cell-wrapper" style={{ gridRow: '2', gridColumn: '1' }}></div>
  <div className="grid-cell-wrapper" style={{ gridRow: '2', gridColumn: '2' }}></div>
  {gridData.colCategories.map((category, catIdx) => 
category.items.map((item, itemIdx) => {
  const colIndex = 3 + gridData.colCategories.slice(0, catIdx).reduce((sum, cat) => sum + cat.items.length, 0) + itemIdx;
  return (
<div 
  key={`col-item-${catIdx}-${itemIdx}`} 
  className="grid-cell-wrapper"
  style={{ gridRow: '2', gridColumn: `${colIndex}` }}
>
  <div className="column-item-header">
{item}
  </div>
</div>
  );
})
  )}

  {/* Row Category Header - spans all data rows */}
  <div 
className="grid-cell-wrapper"
style={{ 
  gridRow: `3 / span ${totalRows}`,
  gridColumn: '1'
}}
  >
<div className="row-category-header">
  {gridData.rowCategory.name}
</div>
  </div>

  {/* Grid Rows - each row item and its cells */}
  {gridData.rowCategory.items.map((rowItem, rowIdx) => {
const currentRow = 3 + rowIdx;
return (
  <Fragment key={`row-${rowIdx}`}>
{/* Row Item Header */}
<div 
  className="grid-cell-wrapper"
  style={{ 
gridRow: `${currentRow}`,
gridColumn: '2'
  }}
>
  <div className="row-item-header">
{rowItem}
  </div>
</div>

{/* Interactive Grid Cells */}
{gridData.colCategories.map((category, catIdx) =>
  category.items.map((colItem, colIdx) => {
const cellKey = `${rowIdx}-${catIdx}-${colIdx}`;
const gridCol = 3 + gridData.colCategories.slice(0, catIdx).reduce((sum, cat) => sum + cat.items.length, 0) + colIdx;
return (
  <div 
key={`cell-${cellKey}`} 
className="grid-cell-wrapper"
style={{ 
  gridRow: `${currentRow}`,
  gridColumn: `${gridCol}`
}}
  >
<div className="grid-cell-slot">
  <GridCell
state={cellStates[cellKey] || null}
onClick={() => {
  setCellStates(prev => {
const current = prev[cellKey] || null;
let next = null;
if (current === null) next = 'check';
else if (current === 'check') next = 'cross';
else next = null;
return { ...prev, [cellKey]: next };
  });
}}
rowIndex={rowIdx}
colIndex={colIdx}
  />
</div>
  </div>
);
  })
)}
  </Fragment>
);
  })}
</div>
  </div>

  <div className="grid-legend">
<div className="legend-item">
  <span className="legend-symbol empty">□</span>
  <span>Empty - No guess yet</span>
</div>
<div className="legend-item">
  <span className="legend-symbol check">✓</span>
  <span>Yes - This matches</span>
</div>
<div className="legend-item">
  <span className="legend-symbol cross">✗</span>
  <span>No - This doesn't match</span>
</div>
  </div>
</div>
  );
};

export default PuzzleGrid;
