const { concatMap, map, mapTo, tap } = require('rxjs/operators')
const { of, zip } = require('rxjs')

const { threadA$, threadB$, threadC$ } = require('./threads')

const printInOrder$ = (
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
			first$: (
				threadA$
				.pipe(
					mapTo('first'),
				)
			),
			second$: (
				threadB$
				.pipe(
					mapTo('second'),
				)
			),
			third$: (
				threadC$
				.pipe(
					mapTo('third'),
				)
			),
		})),
		concatMap(({
			first$,
			second$,
			third$,
		}) => (
			zip(
				first$,
				second$,
				third$,
			)
		)),
		map((
			values,
		) => (
			values
			.join('')
		)),
		tap(console.info),
	)
)

module.exports = printInOrder$
