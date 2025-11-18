import '../css/Grid.css';

const GridCell = ({ state, onClick, rowIndex, colIndex }) => {
    const getCellContent = () => {
        if (state === 'check') return '✓';
        if (state === 'cross') return '✗';
        return '';
    };

    const getCellClass = () => {
        let className = 'grid-cell';
        if (state === 'check') className += ' check';
        if (state === 'cross') className += ' cross';
        return className;
    };
    return (
        <div
            className={getCellClass()}
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label={`Cell ${rowIndex + 1}, ${colIndex + 1}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { onClick(); }
            }}
        >
            <span className="cell-content">{getCellContent()}</span>
        </div>
    );
};

export default GridCell;
