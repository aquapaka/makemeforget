<script lang="ts">
	import thinking from '$lib/actions/thinking';
	import forgetStrings from '$lib/data/forgetStrings';
	import { clickSound, errorSound } from '$lib/sounds/sounds';
	import { AppState, appState, isInvertTransition, whoToForget } from '$lib/stores/mainStores';
	import typewriter from '$lib/transitions/typewriter';
	import { onDestroy } from 'svelte';
	import { elasticOut, quadInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { fly, slide } from 'svelte/transition';

	export let totalToday = 0;

	let content = `Forgetting ${$whoToForget}, please wait...`;
	const progressPercentage = tweened(0, {
		duration: 300
	});
	let isError = false;

	let interval: NodeJS.Timeout;
	setTimeout(() => {
		interval = setInterval(() => {
			const errorPercent = 90 + Math.round(Math.random() * 9);

			progressPercentage.update((value) => {
				let newValue = value + Math.pow(2, Math.random() * 4) / 6;
				if (newValue > errorPercent) {
					newValue = errorPercent;
					isError = true;
					clearInterval(interval);
					errorSound.play();
				}
				return newValue;
			});
		}, 300);
	}, 7000);

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div
	class="absolute top-[40%] md:top-[30%] -translate-y-1/2 left-[50%] -translate-x-1/2 w-full max-w-[1200px] mx-auto p-3"
>
	<h1
		class="text-[1rem] md:text-[2rem]"
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
		out:fly={{
			delay: 100,
			duration: 1000,
			x: (-innerWidth / 2) * ($isInvertTransition ? -1 : 1)
		}}>{$progressPercentage}%</progress
	>
	{#if $progressPercentage >= 1}
		<p
			out:fly|global={{
				delay: 100,
				duration: 1000,
				x: (-innerWidth / 2) * ($isInvertTransition ? -1 : 1)
			}}
		>
			{Math.round($progressPercentage)}%
			{forgetStrings[Math.round($progressPercentage) - 1]}...
		</p>
	{/if}
	<p
		class="text-red-500"
		in:typewriter={{ delay: 5000, speed: 1.5 }}
		out:fly={{
			delay: 100,
			duration: 1000,
			x: (-innerWidth / 2) * ($isInvertTransition ? -1 : 1)
		}}
	>
		Note: Don't close the page while everything is processing, as doing so might make you lose your
		memory!
	</p>
</div>

{#if isError}
	<div
		in:fly|global={{
			duration: 300,
			easing: elasticOut,
			x: (-innerWidth / 30) * ($isInvertTransition ? -1 : 1)
		}}
		out:fly|global={{
			duration: 500,
			y: (innerHeight / 20) * ($isInvertTransition ? -1 : 1)
		}}
		class="absolute top-[50%] md:top-[45%] lg:top-[30%] -translate-y-1/2 left-[50%] -translate-x-1/2 w-full max-w-[700px] mx-auto p-4"
	>
		<div class="bg-red-500 p-4 pixel-btn text-white">
			<h1 class="text-[2rem]">Error 422</h1>
			<p class="mt-2">Oh no :O</p>
			<p class="mt-2">I've stopped the process because something went wrong.</p>
			<p>Don't worry, none of your memories are lost.</p>
			<p class="mt-2">You can try to forget again by clicking the button below.</p>
			<p class="mt-2">
				If the error still persists, it might be because you couldn't forget {$whoToForget}.
			</p>
			<button
				on:mousedown={() => {
					clickSound.play();
				}}
				class="pixel-btn mt-8 bg-slate-100 text-black"
				on:click={() => {
					$appState = AppState.Confirmation;
					isError = false;
					$isInvertTransition = true;
				}}>Try again</button
			>
			<button
				on:mousedown={() => {
					clickSound.play();
				}}
				class="pixel-btn mt-8 sm:ml-2 bg-slate-100 text-black"
				on:click={() => {
					$appState = AppState.WaitingForStart;
					$whoToForget = '';
					isError = false;
					$isInvertTransition = false;
				}}>Exit</button
			>
			<a href="https://aquapaka.github.io/" target="_blank">
				<button
					on:mousedown={() => {
						clickSound.play();
					}}
					class="pixel-btn mt-6 sm:ml-2 bg-slate-100 text-black md:float-right">Contact me</button
				>
			</a>
			<p class="mt-7 text-[0.75rem]">
				People have tried to forget <strong>{totalToday + 1}</strong> time{totalToday > 1
					? 's'
					: ''} today.
			</p>
		</div>
	</div>
{/if}
