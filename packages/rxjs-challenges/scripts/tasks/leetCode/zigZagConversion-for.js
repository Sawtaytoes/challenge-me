// https://leetcode.com/problems/zigzag-conversion/
const convert = (
	string,
	numberOfRows,
) => {
	const numberOfCharacters = string.length

	const numberOfCharactersInGroup = (
		Math.max(
			numberOfRows + numberOfRows - 2,
			1,
		)
	)

	const charactersPerGroup = (
		numberOfCharacters / numberOfCharactersInGroup
	)

	const numberOfGroups = (
		Math.ceil(
			charactersPerGroup
		)
	)

	const lastCharacterRelativeIndex = (
		Math.round(
			(1 - (numberOfGroups - charactersPerGroup))
			* numberOfCharactersInGroup
		)
	)

	const previousRowLengths = [0]

	for (
		let rowIndex = 0
		; rowIndex < numberOfRows
		; rowIndex++
	) {
		const isMiddleRow = (
			rowIndex !== 0
			&& rowIndex !== (numberOfRows - 1)
		)

		const relativeZigIndex = (
			rowIndex
		)

		const relativeZagIndex = (
			Math.round(
				(1 - (rowIndex / numberOfCharactersInGroup))
				* numberOfCharactersInGroup
			)
		)

		const numberInLastGroupRow = (
			(
				lastCharacterRelativeIndex
				> relativeZigIndex
				? 1
				: 0
			)
			+ (
				isMiddleRow
				&& (
					lastCharacterRelativeIndex
					> relativeZagIndex
				)
				? 1
				: 0
			)
		)

		const rowLength = (
			(
				isMiddleRow
				? (numberOfGroups - 1) * 2
				: (numberOfGroups - 1)
			)
			+ numberInLastGroupRow
		)

		previousRowLengths
		.push(
			rowLength
			+ previousRowLengths[rowIndex]
		)
	}

	const characterArray = []

	for (
		let index = 0
		; index < numberOfCharacters
		; index++
	) {
		const character = string[index]

		const relativeGroupIndex = (
			index % numberOfCharactersInGroup
		)

		const isZag = (
			relativeGroupIndex + 1
			> numberOfRows
		)

		const rowIndex = (
			isZag
			? (
				numberOfRows
				- (relativeGroupIndex + 1 - numberOfRows)
				- 1
			)
			: relativeGroupIndex
		)

		const groupIndex = (
			Math.floor(
				index / numberOfCharactersInGroup
			)
		)

		const isMiddleRow = (
			rowIndex !== 0
			&& rowIndex !== (numberOfRows - 1)
		)

		const numberOfPriorCharactersInRow = (
			groupIndex
			* (
				isMiddleRow
				? 2
				: 1
			)
			+ (
				isZag
				? 1
				: 0
			)
		)

		const finalIndex = (
			previousRowLengths[rowIndex]
			+ numberOfPriorCharactersInRow
		)

		characterArray[finalIndex] = character
	}

	return (
		characterArray
		.join('')
	)
}
