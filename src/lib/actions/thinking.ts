const MAX_DOT = 3;

/** @type {import('svelte/action').Action}  */
export default function thinking(node: HTMLElement) {
	let dotCount = 0;

	const interval = setInterval(() => {
		dotCount++;
		if (dotCount > MAX_DOT) {
			node.textContent = node.textContent!.substring(0, node.textContent!.length - 3);
			dotCount = 1;
		}
		node.append('.');
	}, 500);

	return {
		destroy() {
			clearInterval(interval);
		}
	};
}
