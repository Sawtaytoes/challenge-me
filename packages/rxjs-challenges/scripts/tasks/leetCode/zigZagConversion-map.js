// https://leetcode.com/problems/zigzag-conversion/
const convert = (
	string,
	numberOfRows,
) => {
	const numberOfCharactersInZigZag = (
		Math.max(
			numberOfRows + numberOfRows - 2,
			1,
		)
	)

	return (
		Array
		.from(string)
		.map((
			character,
			index,
		) => {
			const relativeZigZagIndex = (
				index % numberOfCharactersInZigZag
			)

			const isZag = (
				relativeZigZagIndex + 1
				> numberOfRows
			)

			const rowIndex = (
				isZag
				? (
					numberOfRows
					- (relativeZigZagIndex + 1 - numberOfRows)
					- 1
				)
				: relativeZigZagIndex
			)

			return {
				character,
				rowIndex,
			}
		})
		.sort((
			{ rowIndex: rowIndexA },
			{ rowIndex: rowIndexB },
		) => (
			rowIndexA - rowIndexB
		))
		.map(({
			character,
		}) => (
			character
		))
		.join('')
	)
}
