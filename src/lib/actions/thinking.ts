const MAX_DOT = 3;

/** @type {import('svelte/action').Action}  */
export default function thinking(node: HTMLElement) {
	let dotCount = 0;

	const interval = setInterval(() => {
		if (dotCount >= MAX_DOT) {
			node.textContent = node.textContent!.substring(0, node.textContent!.length - MAX_DOT);
			dotCount = 0;
		}
		node.append('.');
		dotCount++;
	}, 500);

	return {
		destroy() {
			clearInterval(interval);
		}
	};
}
