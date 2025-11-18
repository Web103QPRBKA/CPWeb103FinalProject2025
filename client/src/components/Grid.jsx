    import { useState, useEffect } from 'react';
    import GridCell from './GridCell';
    import '../css/Grid.css';

    const Grid = ({ rows = 3, cols = 3 }) => {
    const [gridState, setGridState] = useState(
        Array(rows).fill(null).map(() => Array(cols).fill(null))
    );

    useEffect(() => {
        setGridState(Array(rows).fill(null).map(() => Array(cols).fill(null)));
    }, [rows, cols]);

    const handleCellClick = (rowIndex, colIndex) => {
        setGridState(prevState => {
        const newState = prevState.map(row => [...row]);
        
        if (newState[rowIndex][colIndex] === null) {
            newState[rowIndex][colIndex] = 'check';
        } else if (newState[rowIndex][colIndex] === 'check') {
            newState[rowIndex][colIndex] = 'cross';
        } else {
            newState[rowIndex][colIndex] = null;
        }
        
        return newState;
        });
    };

    const resetGrid = () => {
        setGridState(Array(rows).fill(null).map(() => Array(cols).fill(null)));
    };    return (
            <div className="grid-container">
                <div className="grid" style={{
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                    gridTemplateColumns: `repeat(${cols}, 1fr)`
                }}>
                    {gridState.map((row, rowIndex) => (
                    row.map((cellState, colIndex) => (
                        <GridCell
                        key={`${rowIndex}-${colIndex}`}
                        state={cellState}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        />
                    ))
                    ))}
                </div>
                <button className="reset-button" onClick={resetGrid}>
                    Reset Grid
                </button>
            </div>
        );
    };

    export default Grid;
