/**
 * AnswerTable - Validation utility for checking player solutions
 * This is NOT a visible component - it validates player's grid against correct solution
 */

/**
 * Creates a normalized key for matching two items regardless of order
 * @example createMatchKey('friend', 'lisa', 'firstScoop', 'chocolate') 
 *          returns "firstScoop:chocolate|friend:lisa" (alphabetically sorted)
 */
const createMatchKey = (category1, item1, category2, item2) => {
	const pair1 = `${category1}:${item1.toLowerCase()}`;
	const pair2 = `${category2}:${item2.toLowerCase()}`;
	// Sort alphabetically so "friend:lisa|firstScoop:chocolate" === "firstScoop:chocolate|friend:lisa"
	return [pair1, pair2].sort().join('|');
};

/*
	Builds a Set of all correct matches from the solution data. Each solution row contains items that all match with each other
 */
const buildCorrectMatchesSet = (solutionData) => {
	const correctMatches = new Set();
	let totalExpectedChecks = 0;

	solutionData.forEach(row => {
		const categories = Object.keys(row).filter(k => k !== 'id');
		
		// Create all possible pairs from this row
		// e.g., if row = { friend: 'lisa', firstScoop: 'fudge ripple', secondScoop: 'cookie dough' }
		// we create: lisa×fudge ripple, lisa×cookie dough, fudge ripple×cookie dough
		for (let i = 0; i < categories.length; i++) {
			for (let j = i + 1; j < categories.length; j++) {
				const matchKey = createMatchKey(
					categories[i], row[categories[i]],
					categories[j], row[categories[j]]
				);
				correctMatches.add(matchKey);
				totalExpectedChecks++;
			}
		}
	});

	return { correctMatches, totalExpectedChecks };
};

/**
 * Gets the category and item for a specific grid cell
 */
const getCellInfo = (cellKey, gridData) => {
	const [rowCatIdx, rowItemIdx, colCatIdx, colItemIdx] = cellKey.split('-').map(Number);
	
	const rowCategory = gridData.rowCategories[rowCatIdx];
	const colCategory = gridData.colCategories[colCatIdx];
	
	if (!rowCategory || !colCategory) {
		return null;
	}

	return {
		rowCategory: rowCategory.key,
		rowItem: rowCategory.items[rowItemIdx],
		colCategory: colCategory.key,
		colItem: colCategory.items[colItemIdx]
	};
};

/**
 * Validates if the player's grid state matches the correct solution
 * @param {Object} solution - The solution object from the database
 * @param {Object} cellStates - The player's current grid state (cellKey: 'check'/'cross'/null)
 * @param {Object} gridData - The grid layout data with rowCategories and colCategories
 * @returns {Object} { isComplete: boolean, isCorrect: boolean, correctChecks, totalExpectedChecks, incorrectMarks, errors }
 */
export const validateSolution = (solution, cellStates, gridData) => {
	if (!solution?.solution || !gridData) {
		return { 
			isComplete: false, 
			isCorrect: false, 
			correctChecks: 0,
			totalExpectedChecks: 0,
			incorrectMarks: 0,
			errors: ['Invalid solution or grid data'] 
		};
	}

	const { correctMatches, totalExpectedChecks } = buildCorrectMatchesSet(solution.solution);
	const errors = [];
	let correctChecks = 0;
	let incorrectMarks = 0;

	// Validate each cell the player has marked
	Object.entries(cellStates).forEach(([cellKey, state]) => {
		const cellInfo = getCellInfo(cellKey, gridData);
		
		if (!cellInfo) return; // Skip invalid cells

		const matchKey = createMatchKey(
			cellInfo.rowCategory, cellInfo.rowItem,
			cellInfo.colCategory, cellInfo.colItem
		);
		
		const isCorrectMatch = correctMatches.has(matchKey);

		if (state === 'check') {
			if (isCorrectMatch) {
				correctChecks++;
			} else {
				incorrectMarks++;
				errors.push(`Incorrect ✓ at ${cellInfo.rowItem} × ${cellInfo.colItem}`);
			}
		} else if (state === 'cross') {
			if (isCorrectMatch) {
				incorrectMarks++;
				errors.push(`Incorrect ✗ at ${cellInfo.rowItem} × ${cellInfo.colItem} (should be ✓)`);
			}
			// Correct crosses (marking non-matches) don't count toward completion
		}
	});

	const isComplete = correctChecks === totalExpectedChecks;
	const isCorrect = incorrectMarks === 0 && isComplete;

	return {
		isComplete,
		isCorrect,
		correctChecks,
		totalExpectedChecks,
		incorrectMarks,
		errors
	};
};

/**
  	Default export for backward compatibility
	This doesn't render anything - it's purely a validation utility
 */
const AnswerTable = () => {
	return null;
};

export default AnswerTable;
