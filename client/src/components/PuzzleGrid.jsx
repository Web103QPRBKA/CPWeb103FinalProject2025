import { useState, useEffect, Fragment } from "react";
import GridCell from "./GridCell";
import { formatCategoryName } from "../utils/formatters";
import "../css/PuzzleGrid.css";

/*
	Grid layout configurations define which categories appear as rows vs columns for each puzzle game. The order of categories matters for blocking logic.
*/
const gridLayouts = [
	{
		id: 1,
		gameId: 1,
		rowCategories: ["friend", "secondScoop"],
		colCategories: ["firstScoop", "secondScoop"],
	},
	{
		id: 2,
		gameId: 2,
		rowCategories: ["visitOrder", "object", "power"],
		colCategories: ["friend", "power", "object"],
	},
];

const PuzzleGrid = ({ solution }) => {
	const [gridData, setGridData] = useState(null);
	const [cellStates, setCellStates] = useState({});

	useEffect(() => {
		if (!solution?.solution) {
			return;
		}

		const gameId = solution.gameId || solution.gameid;

		if (gameId === undefined || gameId === null) {
			return;
		}

		const solutionData = solution.solution;
		const layout = gridLayouts.find((l) => l.gameId === gameId);

		if (!layout) {
			console.error(`No grid layout found for gameId ${gameId}`);
			return;
		}

		if (Array.isArray(solutionData) && solutionData.length > 0) {
			/**
				Notes: Get items in predefined order for each category.
				Order is critical for puzzle win condition validation.
			*/
			const getOrderedItems = (key) => {
				const orderMaps = {
					visitOrder: ["first", "second", "third", "fourth"],
					object: ["cape", "coronet", "ring", "trumpet"],
					power: [
						"see faraway places",
						"invisibility",
						"predict future",
						"shift shapes",
					],
					friend: [
						"cowardly cheetah",
						"farmer",
						"good fairy",
						"lumberjack",
					],
				};

				const seenItems = new Set();
				const orderedItems = [];

				solutionData.forEach((item) => {
					const value = item[key];
					if (value && !seenItems.has(value)) {
						seenItems.add(value);
						orderedItems.push(value);
					}
				});

				if (orderMaps[key]) {
					return orderedItems.sort((a, b) => {
						const indexA = orderMaps[key].indexOf(a);
						const indexB = orderMaps[key].indexOf(b);
						return indexA - indexB;
					});
				}

				return orderedItems;
			};

			const rowCategories = layout.rowCategories.map((key) => ({
				name: formatCategoryName(key),
				key: key,
				items: getOrderedItems(key),
			}));

			const colCategories = layout.colCategories.map((key) => ({
				name: formatCategoryName(key),
				key: key,
				items: getOrderedItems(key),
			}));

			setGridData({
				rowCategories,
				colCategories,
			});
		}
	}, [solution]);

	if (!gridData) {
		return;
		<div className="puzzle-grid-container">
			<p>Loading grid...</p>
		</div>;
	}

	const totalCols = gridData.colCategories.reduce(
		(sum, cat) => sum + cat.items.length,
		0,
	);
	const totalRows = gridData.rowCategories.reduce(
		(sum, cat) => sum + cat.items.length,
		0,
	);

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
						gridTemplateColumns: `auto auto repeat(${totalCols}, 60px)`,
						gridTemplateRows: `auto auto repeat(${totalRows}, 60px)`,
					}}>
					{/* Row 1: Top-left spacers and column category headers */}
					<div
						className="grid-cell-wrapper top-left-spacer"
						style={{ gridRow: "1", gridColumn: "1" }}></div>
					<div
						className="grid-cell-wrapper top-left-spacer"
						style={{ gridRow: "1", gridColumn: "2" }}></div>
					{gridData.colCategories.map((category, catIdx) => {
						const startCol =
							3 +
							gridData.colCategories
								.slice(0, catIdx)
								.reduce(
									(sum, cat) => sum + cat.items.length,
									0,
								);
						return (
							<div
								key={`col-cat-${catIdx}`}
								className="grid-cell-wrapper"
								style={{
									gridRow: "1",
									gridColumn: `${startCol} / span ${category.items.length}`,
								}}>
								<div className="column-category-header">
									{category.name}
								</div>
							</div>
						);
					})}

					{/* Row 2: Second row spacers and column item headers */}
					<div
						className="grid-cell-wrapper"
						style={{ gridRow: "2", gridColumn: "1" }}></div>
					<div
						className="grid-cell-wrapper"
						style={{ gridRow: "2", gridColumn: "2" }}></div>
					{gridData.colCategories.map((category, catIdx) =>
						category.items.map((item, itemIdx) => {
							const colIndex =
								3 +
								gridData.colCategories
									.slice(0, catIdx)
									.reduce(
										(sum, cat) => sum + cat.items.length,
										0,
									) +
								itemIdx;
							return (
								<div
									key={`col-item-${catIdx}-${itemIdx}`}
									className="grid-cell-wrapper"
									style={{
										gridRow: "2",
										gridColumn: `${colIndex}`,
									}}>
									<div className="column-item-header">
										{item}
									</div>
								</div>
							);
						}),
					)}

					{/* Render all row categories and their items */}
					{gridData.rowCategories.map((rowCategory, rowCatIdx) => {
						// Calculate the starting row for this category
						const startRow =
							3 +
							gridData.rowCategories
								.slice(0, rowCatIdx)
								.reduce(
									(sum, cat) => sum + cat.items.length,
									0,
								);
						const rowSpan = rowCategory.items.length;

						return (
							<Fragment key={`row-cat-${rowCatIdx}`}>
								{/* Row Category Header - spans all items in this category */}
								<div
									className="grid-cell-wrapper"
									style={{
										gridRow: `${startRow} / span ${rowSpan}`,
										gridColumn: "1",
									}}>
									<div className="row-category-header">
										{rowCategory.name}
									</div>
								</div>

								{/* Row items and their cells */}
								{rowCategory.items.map(
									(rowItem, rowItemIdx) => {
										const currentRow =
											startRow + rowItemIdx;

										return (
											<Fragment
												key={`row-${rowCatIdx}-${rowItemIdx}`}>
												{/* Row Item Header */}
												<div
													className="grid-cell-wrapper"
													style={{
														gridRow: `${currentRow}`,
														gridColumn: "2",
													}}>
													<div className="row-item-header">
														{rowItem}
													</div>
												</div>

												{/* Interactive Grid Cells */}
												{gridData.colCategories.map(
													(colCategory, colCatIdx) =>
														colCategory.items.map(
															(
																colItem,
																colItemIdx,
															) => {
																const cellKey = `${rowCatIdx}-${rowItemIdx}-${colCatIdx}-${colItemIdx}`;
																const gridCol =
																	3 +
																	gridData.colCategories
																		.slice(
																			0,
																			colCatIdx,
																		)
																		.reduce(
																			(
																				sum,
																				cat,
																			) =>
																				sum +
																				cat
																					.items
																					.length,
																			0,
																		) +
																	colItemIdx;

																/**
																 * Blocking logic for duplicate category intersections:
																 * 1. Block same category intersecting itself (e.g., Object × Object)
																 * 2. For categories appearing in both dimensions, allow only first intersection
																 *    (e.g., Object × Power is playable, Power × Object is blocked)
																 */
																const rowCategoryAppearsInColumns =
																	gridData.colCategories.some(
																		(cc) =>
																			cc.key ===
																			rowCategory.key,
																	);
																const colCategoryAppearsInRows =
																	gridData.rowCategories.some(
																		(rc) =>
																			rc.key ===
																			colCategory.key,
																	);

																let isBlocked = false;

																if (
																	rowCategory.key ===
																	colCategory.key
																) {
																	isBlocked = true;
																} else if (
																	rowCategoryAppearsInColumns &&
																	colCategoryAppearsInRows
																) {
																	const rowCategoryIndex =
																		gridData.rowCategories.findIndex(
																			(
																				rc,
																			) =>
																				rc.key ===
																				rowCategory.key,
																		);
																	const colCategoryIndexInRows =
																		gridData.rowCategories.findIndex(
																			(
																				rc,
																			) =>
																				rc.key ===
																				colCategory.key,
																		);

																	if (
																		colCategoryIndexInRows !==
																			-1 &&
																		rowCategoryIndex >
																			colCategoryIndexInRows
																	) {
																		isBlocked = true;
																	}
																}

																return (
																	<div
																		key={`cell-${cellKey}`}
																		className={`grid-cell-wrapper ${isBlocked ? "blocked-cell" : ""}`}
																		style={{
																			gridRow: `${currentRow}`,
																			gridColumn: `${gridCol}`,
																		}}>
																		<div className="grid-cell-slot">
																			{isBlocked ? (
																				<div className="blocked-indicator"></div>
																			) : (
																				<GridCell
																					state={
																						cellStates[
																							cellKey
																						] ||
																						null
																					}
																					onClick={() => {
																						setCellStates(
																							(
																								prev,
																							) => {
																								const current =
																									prev[
																										cellKey
																									] ||
																									null;
																								let next =
																									null;
																								if (
																									current ===
																									null
																								)
																									next =
																										"check";
																								else if (
																									current ===
																									"check"
																								)
																									next =
																										"cross";
																								else
																									next =
																										null;
																								return {
																									...prev,
																									[cellKey]:
																										next,
																								};
																							},
																						);
																					}}
																					rowIndex={
																						currentRow -
																						3
																					}
																					colIndex={
																						gridCol -
																						3
																					}
																				/>
																			)}
																		</div>
																	</div>
																);
															},
														),
												)}
											</Fragment>
										);
									},
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
