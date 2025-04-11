<script>
	import '../app.css';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<svelte:head>
	<title>Make me forget</title>
	<meta name="description" content="You want to forget a person? This page can help you forget. Try to forget now.">
</svelte:head>

{@render children?.()}
