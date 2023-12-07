<script>
	import thinking from '$lib/actions/thinking';
	import forgetStrings from '$lib/data/forgetStrings';
	import { AppState, appState, isInvertTransition, whoToForget } from '$lib/stores/mainStores';
	import typewriter from '$lib/transitions/typewriter';
	import { onDestroy } from 'svelte';
	import { quadInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { fly, slide } from 'svelte/transition';

	let content = `Forgetting ${$whoToForget}, please wait...`;
	const progressPercentage = tweened(0, {
		duration: 300
	});

	const interval = setInterval(() => {
		progressPercentage.update((value) => value + Math.pow(3, Math.round(Math.random() * 3)) / 10);
		if ($progressPercentage > 99) {
			$progressPercentage = 99;
			clearInterval(interval);
		}
		console.log($progressPercentage);
	}, 500);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div
	class="absolute top-[25%] -translate-y-1/2 left-[50%] -translate-x-1/2 w-full max-w-[1200px] mx-auto p-4"
>
	<h1
		class="text-[2rem]"
		in:typewriter={{ delay: 1000, speed: 1.5 }}
		out:fly={{
			delay: 100,
			duration: 1000,
			x: (-innerWidth / 2) * ($isInvertTransition ? -1 : 1)
		}}
		use:thinking
	>
		{content}
	</h1>
	<progress
		class="w-full"
		value={$progressPercentage}
		max="100"
		in:slide={{ delay: 2000, duration: 2000, easing: quadInOut, axis: 'x' }}
		out:slide={{ delay: 0, duration: 500, easing: quadInOut, axis: 'x' }}
		>{$progressPercentage}%</progress
	>
	{#if $progressPercentage >= 1}
		<p>
			{Math.round($progressPercentage)}%
			{forgetStrings[Math.round($progressPercentage) - 1]}...
		</p>
	{/if}
	<p class="text-red-500" in:typewriter={{ delay: 5000, speed: 1.5 }}>
		Note: Don't close the page while everything are processing, do that might make you lose your
		memory!
	</p>
</div>
