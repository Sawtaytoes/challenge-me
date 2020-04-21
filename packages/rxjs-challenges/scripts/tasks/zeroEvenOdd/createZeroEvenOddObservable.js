const { catchError, concatAll, concatMap, filter, map, mapTo, take, tap, toArray } = require('rxjs/operators')
const { of, zip } = require('rxjs')

const { threadA$, threadB$, threadC$ } = require('./zeroEvenOddThreads')

const createZeroEvenOddObservable = (
	numberOfOutputValues,
) => (
	of({
		threadA$,
		threadB$,
		threadC$,
	})
	.pipe(
		map(({
			threadA$,
			threadB$,
			threadC$,
		}) => ({
			even$: (
				threadB$
				.pipe(
					filter(value => (
						value !== 0
						&& value % 2 === 0
					)),
				)
			),
			odd$: (
				threadC$
				.pipe(
					filter(value => (
						value !== 0
						&& value % 2 === 1
					)),
				)
			),
			zero$: (
				threadA$
				.pipe(
					mapTo(0),
				)
			),
		})),
		concatMap(({
			even$,
			odd$,
			zero$,
		}) => (
			zip(
				zero$,
				odd$,
				zero$,
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
