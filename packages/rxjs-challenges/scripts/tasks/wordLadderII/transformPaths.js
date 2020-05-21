const { from, merge, of, Subject } = require('rxjs')
const { delay, filter, ignoreElements, map, mapTo, mergeMap, reduce, scan, tap, toArray } = require('rxjs/operators')

const transformPaths = ({
	beginWord,
	endWord,
	wordList,
}) => {
	const followWordPaths$ = new Subject()
	const numberOfActivePaths$ = new Subject()

	const wordLength = endWord.length

	numberOfActivePaths$
	.pipe(
		scan(
			(
				numberOfActivePaths,
				command,
			) => (
				command === 'addActivePath'
				? numberOfActivePaths + 1
				: numberOfActivePaths - 1
			),
			0,
		),
		filter((
			value,
		) => (
			value === 0
		)),
	)
	.subscribe(() => {
		followWordPaths$
		.complete()

		numberOfActivePaths$
		.complete()
	})

	return (
		from([
			beginWord,
			...wordList,
		])
		.pipe(
			mergeMap((
				word,
			) => (
				from(word)
				.pipe(
					filter((
						wordLetter,
						wordLetterIndex,
					) => (
						Object.is(
							wordLetter,
							endWord[wordLetterIndex],
						)
					)),
					toArray(),
					map((
						matchingLetters,
					) => ({
						distanceToEndWord: (
							wordLength
							- matchingLetters.length
						),
						word,
					})),
				)
			)),
			toArray(),
			mergeMap(([
				currentPath,
				...availablePaths
			]) => (
				merge(
					followWordPaths$,
					of({
						availablePaths,
						currentPath,
						transformations: [beginWord],
					}),
				)
			)),
			tap(() => {
				numberOfActivePaths$
				.next('addActivePath')
			}),
			mergeMap(({
				availablePaths,
				currentPath,
				transformations,
			}) => (
				currentPath.word === endWord
				? (
					of(transformations)
					.pipe(
						tap(() => {
							numberOfActivePaths$
							.next('removeActivePath')
						}),
					)
				)
				: (
					from(availablePaths)
					.pipe(
						mergeMap((
							availablePath,
						) => (
							from(
								availablePath
								.word
							)
							.pipe(
								filter((
									wordLetter,
									wordLetterIndex,
								) => (
									Object.is(
										wordLetter,
										(
											currentPath
											.word
											[wordLetterIndex]
										),
									)
								)),
								toArray(),
								filter((
									matchingLetters,
								) => (
									Object.is(
										matchingLetters.length,
										wordLength - 1
									)
								)),
								mapTo(availablePath),
							)
						)),
						toArray(),
						mergeMap((
							matchingPaths,
						) => (
							from(matchingPaths)
							.pipe(
								reduce(
									(
										closestDistanceToEndWord,
										matchingPath,
									) => (
										Math.min(
											matchingPath.distanceToEndWord,
											closestDistanceToEndWord,
										)
									),
									wordLength,
								),
								map((
									closestDistanceToEndWord
								) => ({
									closestDistanceToEndWord,
									matchingPaths,
								}))
							)
						)),
						mergeMap(({
							closestDistanceToEndWord,
							matchingPaths,
						}) => (
							from(availablePaths)
							.pipe(
								filter((
									availablePath
								) => (
									availablePath.distanceToEndWord
									<= closestDistanceToEndWord
								)),
								filter((
									availablePath
								) => (
									!matchingPaths
									.includes(availablePath)
								)),
								toArray(),
								map((
									closestRemainingPaths
								) => ({
									closestRemainingPaths,
									matchingPaths,
								})),
							)
						)),
						mergeMap(({
							closestRemainingPaths,
							matchingPaths,
						}) => (
							from(matchingPaths)
							.pipe(
								map((
									matchingPath,
								) => ({
									availablePaths: closestRemainingPaths,
									currentPath: matchingPath,
									transformations: (
										transformations
										.concat(matchingPath.word)
									),
								})),
								delay(0),
								tap((
									nextState
								) => {
									followWordPaths$
									.next(nextState)
								}),
								toArray(),
								tap(() => {
									numberOfActivePaths$
									.next('removeActivePath')
								}),
							)
						)),
						ignoreElements(),
					)
				)
			)),
			reduce(
				(
					finalTransformations,
					transformations,
				) => (
					finalTransformations
					.concat([transformations])
				),
				[],
			),
			tap(console.info),
		)
	)
}


module.exports = transformPaths
