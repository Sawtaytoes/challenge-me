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
		.reduce(
			(
				rows,
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

				return (
					rows
					.slice(
						0,
						rowIndex,
					)
					.concat(
						(
							rows[rowIndex]
							|| []
						)
						.concat(character)
					)
					.concat(
						rows
						.slice(rowIndex + 1)
					)
				)
			},
			[],
		)
		.flat()
		.join('')
	)
}

module.exports = convert
