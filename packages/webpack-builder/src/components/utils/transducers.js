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
		) => {
			const nextReducer = (
				transducer
				&& (
					transducer(
						reducer,
						{
							finalReducer,
							transducerIndex: index,
							transducers,
						},
					)
				)
			)

			return (
				nextReducer
				|| null
			)
		},
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
		transducerIndex: options.transducerIndex,
		transducers: options.transducers,
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
		transducers = [],
		value,
	}) => {
		const prevTransducers = (
			transducers
			.slice(0, index)
		)

		const nextTransducers = (
			transducers
			.slice(index + 1)
		)

		console.log({context})

		const nextValue = (
			reducer(
				context,
				value,
				index,
				array,
			)
		)

		const collection = (
			transducerReduce(
				pipe(
					...prevTransducers
				)(
					reducer
				),
				nextValue,
			)
		)

		console.log({nextValue})
		console.log(index === array.length - 1)

		return (
			index === array.length - 1
			? collection
			: (
				transducerReduce(
					pipe(
						...nextTransducers
					)(
						finalReducer
					),
					collection,
				)
			)
		)
	})
)
