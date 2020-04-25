// Transducer
// Takes a reducer and returns a reducer

export const pipe = (
	...transducers
) => (
	finalReducer
) => (
	transducers
	.reduceRight(
		(
			reducer,
			transducer,
			index,
		) => (
			transducer(
				reducer,
				{
					finalReducer,
					nextTransducers: (
						(
							transducers
							.slice(index + 1)
						)
					),
				},
			)
		),
		finalReducer,
	)
)

export const transducerReduce = (
	reducer,
	array,
) => (
	array
	.reduce(
		reducer,
		undefined,
	)
)

const createTransducerCreator = (
	transduce
) => (
	callback
) => (
	nextPipelineReducer,
	options = {},
) => (
	context,
	value,
	index,
	array,
) => (
	transduce({
		array,
		callback,
		context,
		finalReducer: options.finalReducer,
		index,
		nextPipelineReducer,
		nextTransducers: options.nextTransducers,
		value,
	})
)

export const filter = (
	createTransducerCreator(({
		array,
		callback: condition,
		context,
		index,
		nextPipelineReducer,
		value,
	}) => (
		condition(
			value,
			index,
			array,
		)
		? (
			nextPipelineReducer(
				context,
				value,
				index,
				array,
			)
		)
		: context
	))
)

export const map = (
	createTransducerCreator(({
		array,
		callback: transform,
		context,
		index,
		nextPipelineReducer,
		value,
	}) => (
		nextPipelineReducer(
			context,
			transform(
				value,
				index,
				array,
			),
			index,
			array,
		)
	))
)

export const reduce = (
	createTransducerCreator(({
		array,
		callback: reducer,
		context,
		finalReducer,
		index,
		nextTransducers = [],
		value,
	}) => {
		console.log({context})

		const nextTransducer = (
			reducer(
				context,
				value,
				index,
				array,
			)
		)

		console.log({nextTransducer})
		console.log(index === array.length - 1)

		return (
			index === array.length - 1
			? reducer
			: (
				transducerReduce(
					pipe(
						...nextTransducers
					)(
						finalReducer
					),
					nextTransducer,
				)
			)
		)
	})
)
