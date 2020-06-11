// https://leetcode.com/problems/median-of-two-sorted-arrays
const div = (
	numerator,
	denominator,
) => (
	numerator / denominator
)

const sum = (
	value,
	additive,
) => (
	value + additive
)

const getArrayMedianData = (
	array,
) => {
	const middleIndex = Math.ceil(array.length / 2) - 1

	return (
		array.length % 2
		? array[middleIndex]
		: (
			div(
				sum(
					array[middleIndex],
					array[middleIndex + 1],
				),
				2,
			)
		)
	)
}

const findMedianSortedArrays = (
	nums1,
	nums2,
) => (
	getArrayMedianData(
		[
			getArrayMedianData(nums1),
			getArrayMedianData(nums2),
		]
		.filter((
			value
		) => (
			!Object.is(
				value,
				NaN,
			)
		))
	)
)
