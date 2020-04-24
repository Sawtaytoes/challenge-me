class ZeroEvenOdd {
	constructor(number) {
		this.numberOfOutputValues = number * 2
		this.printedNumbers = 0

		this.nextExecutionState = 'zero'

		this.activeIndexes = {
			even: [],
			odd: [],
			zero: [],
		}

		this.nextIndexes = {
			even: 0,
			odd: 0,
			zero: 0,
		}

		this.nextValues = {
			even: 2,
			odd: 1,
			zero: 0,
		}
	}

	addToQueue({
		callback,
		executionInfo,
		nextExecutionState,
	}) {
		const activeIndexArray = this.activeIndexes[executionInfo.name]

		if (
			activeIndexArray[0] === executionInfo.index
			&& this.nextExecutionState === executionInfo.name
		) {
			callback()
			activeIndexArray.shift()
			this.nextExecutionState = nextExecutionState
		}
		else {
			setTimeout(() => {
				this.addToQueue({
					callback,
					executionInfo,
					nextExecutionState,
				})
			})
		}
	}

	isDoneExecuting() {
		return (
			this.printedNumbers === this.numberOfOutputValues
		)
	}

	printNumber({
		sendValue,
		value,
	}) {
		return () => {
			if (this.isDoneExecuting()) {
				return
			}

			sendValue(
				value
			)

			this.printedNumbers += 1
		}
	}

	zero(sendValue) {
		if (this.isDoneExecuting()) {
			return
		}

		this
		.activeIndexes
		.zero
		.push(
			this
			.nextIndexes
			.zero
		)

		this.addToQueue({
			callback: (
				this.printNumber({
					sendValue,
					value: this.nextValues.zero,
				})
			),
			executionInfo: {
				index: this.nextIndexes.zero,
				name: 'zero',
			},
			nextExecutionState: (
				this.nextIndexes.zero % 2 === 0
				? 'odd'
				: 'even'
			),
		})

		this.nextIndexes.zero += 1
	}

	even(sendValue) {
		if (this.isDoneExecuting()) {
			return
		}

		this
		.activeIndexes
		.even
		.push(
			this
			.nextIndexes
			.even
		)

		this.addToQueue({
			callback: (
				this.printNumber({
					sendValue,
					value: this.nextValues.even,
				})
			),
			executionInfo: {
				index: this.nextIndexes.even,
				name: 'even',
			},
			nextExecutionState: 'zero',
		})

		this.nextIndexes.even += 1
		this.nextValues.even += 2
	}

	odd(sendValue) {
		if (this.isDoneExecuting()) {
			return
		}

		this
		.activeIndexes
		.odd
		.push(
			this
			.nextIndexes
			.odd
		)

		this.addToQueue({
			callback: (
				this.printNumber({
					sendValue,
					value: this.nextValues.odd,
				})
			),
			executionInfo: {
				index: this.nextIndexes.odd,
				name: 'odd',
			},
			nextExecutionState: 'zero',
		})

		this.nextIndexes.odd += 1
		this.nextValues.odd += 2
	}
}

const zeroEvenOdd = new ZeroEvenOdd(5)

// eslint-disable-next-line no-unused-vars
let output = ''

const joinToOutput = value => {
	output += value
}

zeroEvenOdd.even(joinToOutput)
zeroEvenOdd.even(joinToOutput)
zeroEvenOdd.odd(joinToOutput)
zeroEvenOdd.odd(joinToOutput)
zeroEvenOdd.odd(joinToOutput)
zeroEvenOdd.zero(joinToOutput)
zeroEvenOdd.zero(joinToOutput)
zeroEvenOdd.zero(joinToOutput)
zeroEvenOdd.zero(joinToOutput)
zeroEvenOdd.zero(joinToOutput)
