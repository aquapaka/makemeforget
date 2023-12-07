export default function typewriter(node: Node, { delay = 0, speed = 1 }) {
	const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

	if (!valid) {
		throw new Error(`This transition only works on elements with a single text node child`);
	}

	const text = node.textContent;
	// @ts-ignore
	const duration = text.length / (speed * 0.01);

	return {
		delay,
		duration,
		tick: (t) => {
			// @ts-ignore
			const i = Math.trunc(text.length * t);
			// @ts-ignore
			node.textContent = text.slice(0, i);
		}
	};
}
