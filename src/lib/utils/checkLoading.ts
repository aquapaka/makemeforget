// This function must be put inside onMount svelte function to work
export default function checkLoading(onLoaded: () => void) {
	// Check if the page has already loaded
	if (document.readyState === 'complete') {
		onLoaded();
		window.removeEventListener('load', onLoaded);
	} else {
		window.addEventListener('load', onLoaded);
	}
}
