const {
	catchError,
	concatAll,
	concatMap,
	filter,
	map,
	mapTo,
	take,
	tap,
	toArray,
} = require('rxjs/operators')
const {
	of,
	zip,
} = require('rxjs')

const {
 threadA$, threadB$, threadC$,
} = require('./zeroEvenOddThreads')

const createZeroEvenOddObservable = (
	numberOfOutputValues,
) => (
	of({
		even$: (
			threadB$
			.pipe(
				filter((value) => (
					value !== 0
					&& value % 2 === 0
				)),
			)
		),
		odd$: (
			threadC$
			.pipe(
				filter((value) => (
					value !== 0
					&& value % 2 === 1
				)),
			)
		),
		zero1$: (
			threadA$
			.pipe(
				filter((value) => (
					value !== 0
					&& value % 2 === 0
				)),
				mapTo(0),
			)
		),
		zero2$: (
			threadA$
			.pipe(
				filter((value) => (
					value !== 0
					&& value % 2 === 1
				)),
				mapTo(0),
			)
		),
	})
	.pipe(
		concatMap(({
			even$,
			odd$,
			zero1$,
			zero2$,
		}) => (
			zip(
				zero1$,
				odd$,
				zero2$,
				even$,
			)
		)),
		concatAll(),
		take(
			numberOfOutputValues * 2
		),
		toArray(),
		map((
			values,
		) => (
			values
			.join('')
		)),
		tap(console.info),
		catchError((
			error,
		) => {
			console.error(
				error
			)

			process.exit()
		})
	)
)

module.exports = createZeroEvenOddObservable
