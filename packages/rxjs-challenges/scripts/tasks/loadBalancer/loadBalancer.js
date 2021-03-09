const nodeChildProcess = require('child_process')
const os = require('os')
const {
	filter,
	ignoreElements,
	map,
	mergeAll,
	takeUntil,
	tap,
} = require('rxjs/operators')
const {
	from,
	fromEvent,
	Observable,
	Subject,
} = require('rxjs')
const { v4: uuidv4 } = require('uuid')

// const threadEmitter = require('./threadEmitter')

/*
Goals

- Create new threads up to the number of processor threads (minus 1).
- Processes new thread using callback function.
- Dispatch an event to trigger thread processing.
- Each task will be assigned a UUID.
- Each thread will notify with its UUID when it's completed.
*/

const loadBalancer = () => {
	const numberOfCpuThreads = (
		os
		.cpus()
		.length
	)

	const childProcesses = (
		Array(numberOfCpuThreads - 1)
		.fill()
		.map((
			value,
			index,
		) => (
			nodeChildProcess
			.fork(
				require
				.resolve(
					'./childProcess.js'
				),
				[
					index,
				],
			)
		))
	)

	const taskCompleted$ = new Subject()

	childProcesses
	.map((
		childProcess,
	) => {
		fromEvent(
			childProcess,
			'message',
		)
		.pipe(
			tap(() => {
				setChildProcessAvailable(
					childProcess
				)
			}),
		)
		.subscribe(taskCompleted$)
	})

	const availableChildProcesses = (
		childProcesses
		.slice()
	)

	const setChildProcessUnavailable = (
		childProcess,
	) => {
		availableChildProcesses
		.splice(
			(
				availableChildProcesses
				.indexOf(childProcess)
			),
			1,
		)
	}

	const setChildProcessAvailable = (
		childProcess,
	) => {
		availableChildProcesses
		.push(childProcess)
	}

	// fromEvent(
	// 	threadEmitter,
	// 	'executeTask',
	// )
	return (
		from(
			Array(24)
			.fill()
			.map((
				value,
				index,
			) => (
				`Task: ${index + 1}`
			))
		)
		.pipe(
			map((
				task,
			) => {
				const taskId = uuidv4()

				return (
					Observable
					.create((
						observer,
					) => {
						const [
							childProcess,
						] = (
							availableChildProcesses
						)

						setChildProcessUnavailable(
							childProcess
						)

						observer
						.next(childProcess)
					})
					.pipe(
						takeUntil(
							taskCompleted$
							.pipe(
								map(([
									message,
								]) => (
									message
								)),
								filter(({
									id,
								}) => (
									id === taskId
								)),
								tap((
									message,
								) => (
									// TODO: call `callback` function.
									console.info({
										taskCompleted: message.task,
									})
								)),
							)
						),
						tap((
							childProcess,
						) => {
							childProcess
							.send({
								id: taskId,
								task,
							})
						}),
						ignoreElements(),
					)
				)
			}),
			mergeAll(numberOfCpuThreads - 1),
			// mergeAll(),
		)
	)
}

module.exports = loadBalancer
