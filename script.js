// @ts-check

/**
 * @typedef {Object} OutputData
 * @property {string} name
 * @property {HTMLSpanElement | null} element
 * @property {number} value
 */

/**
 * @param {OutputData[]} outputData
 */
function updateOutput(outputData) {
	for (const out of outputData) {
		const $span = out.element;
		if ($span == null) continue;
		$span.textContent = out.value.toString();
	}
}

/**
 * @param {string} text
 */
function calculateLength(text) {
	return {
		length: text.length,
		lines: text.split("\n").length,
		words: text.split(/\s+/).filter(Boolean).length,
	};
}

function main() {
	const $input = document.querySelector("#input");
	if (!($input instanceof HTMLTextAreaElement)) return;

	/** @type {OutputData[]} */
	const outputData = [
		{ name: "length", element: null, value: 0 },
		{ name: "lines", element: null, value: 1 },
		{ name: "words", element: null, value: 0 },
	];

	for (const out of outputData) {
		const $span = document.querySelector(`#${out.name}`);
		if (!($span instanceof HTMLSpanElement)) {
			throw new Error(`Missing span element for ${out.name}`);
		}

		out.element = $span;
	}

	$input.addEventListener("input", () => {
		const outputValues = calculateLength($input.value);

		for (const out of outputData) {
			out.value = outputValues[out.name];
		}

		updateOutput(outputData);
	});
}

main();
