const { concatMap, filter, ignoreElements, pluck, scan, tap } = require('rxjs/operators')
const { of, pipe, zip } = require('rxjs')

const { hydrogenThread$, oxygenThread$ } = require('./threads')

const hydrogenSplitter = ({
	numberOfSplits,
	selectedIndex,
}) => (
	pipe(
		scan(
			(
				state,
				releaseHydrogen,
			) => ({
				index: (
					(state.index + 1)
					% numberOfSplits
				),
				releaseHydrogen,
			}),
			{ index: 1 },
		),
		filter(({ index }) => (
			Object.is(
				index,
				selectedIndex,
			)
		)),
		pluck('releaseHydrogen'),
	)
)

const buildH2o$ = (
	of({
		hydrogen1$: (
			hydrogenThread$
			.pipe(
				hydrogenSplitter({
					numberOfSplits: 2,
					selectedIndex: 0,
				}),
			)
		),
		hydrogen2$: (
			hydrogenThread$
			.pipe(
				hydrogenSplitter({
					numberOfSplits: 2,
					selectedIndex: 1,
				}),
			)
		),
		oxygen$: (
			oxygenThread$
		),
	})
	.pipe(
		concatMap(({
			hydrogen1$,
			hydrogen2$,
			oxygen$,
		}) => (
			zip(
				hydrogen1$,
				hydrogen2$,
				oxygen$,
			)
		)),
		tap(([
			releaseHydrogen1,
			releaseHydrogen2,
			releaseOxygen,
		]) => {
			releaseHydrogen1()
			releaseHydrogen2()
			releaseOxygen()
		}),
		ignoreElements(),
	)
)

module.exports = buildH2o$
