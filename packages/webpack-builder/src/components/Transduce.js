import React from 'react'
import styled from '@emotion/styled'

import { map, pipe, reduce, transducerReduce } from './utils/transducers'

const StyledContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	font-size: 40px;
	margin-top: 20px;
	margin-bottom: 20px;
	width: 100vw;
`

const stringReducer = (
	state = '',
	value,
) => (
	value
	? (
		state
		? (
			state
			.concat('\n\n')
			.concat(value)
		)
		: value
	)
	: state
)

const arrayReducer = (
	state = [],
	value,
) => (
	value
	? (
		state
		.concat([value])
	)
	: state
)

const Transduce = () => {
	const customOperator = () => (
		pipe(
			map((
				value,
			) => (
				value
				.concat('\n')
				.concat('h!')
			)),
			map((
				value,
			) => (
				value
				.concat('\n')
				.concat('-- line 4')
			)),
		)
	)

	const transducer = (
		pipe(
			map((
				value,
			) => (
				value
				.concat(' ')
				.concat('chat!')
			)),
			map((
				value,
			) => (
				value
				.concat('\n')
				.concat('-- line 2')
			)),
			customOperator(),
		)
	)

	const transducer2 = (
		map((
			value,
		) => (
			value
			.concat(' ')
			.concat('chat!')
		))
	)

	const stringAssembly1 = (
		transducerReduce(
			transducer2(stringReducer),
			['Hello', 'something'],
		)
	)

	const stringAssembly2 = (
		transducerReduce(
			transducer(stringReducer),
			['Hello', 'something'],
		)
	)

	const arrayAssembly = (
		transducerReduce(
			transducer(arrayReducer),
			['Hello', 'something'],
		)
	)

	const finalTransducer = (
		pipe(
			reduce((
				state,
				value,
			) => (
				value
				? (
					state
					? (
						[state]
						.concat('---')
						.concat(value)
					)
					: [value]
				)
				: state
			)),
			// map((
			// 	value,
			// 	index,
			// ) => (
			// 	<pre key={index}>
			// 		{value}
			// 	</pre>
			// )),
		)
	)

	const finalAssembly = (
		transducerReduce(
			finalTransducer(arrayReducer),
			[
				stringAssembly1,
				stringAssembly2,
				// arrayAssembly,
			],
		)
	)

	return (
		<StyledContainer>
			{finalAssembly}
		</StyledContainer>
	)
}

export default Transduce
