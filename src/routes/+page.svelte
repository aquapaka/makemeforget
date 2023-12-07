<script lang="ts">
	import { fly } from 'svelte/transition';
	import { AppState, appState, whoToForget, isInvertTransition } from '$lib/stores/mainStores';
	import typewriter from '$lib/transitions/typewriter';
	import RetroInput from '$lib/components/RetroInput.svelte';
	import ForgettingScene from '$lib/components/scenes/ForgettingScene.svelte';

	let innerWidth = 0;
	let innerHeight = 0;

	$: {
		console.log(innerWidth);
		console.log($whoToForget);
		console.log(AppState[$appState]);
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<div class="relative h-screen bg-slate-100 overflow-hidden">
	<!-- Waiting for start -->
	{#if $appState === AppState.WaitingForStart}
		<div
			class="absolute top-[25%] -translate-y-1/2 text-center w-full"
			in:fly={{
				delay: 1000,
				duration: 2000,
				y: (-innerHeight / 6) * ($isInvertTransition ? -1 : 1)
			}}
			out:fly={{
				delay: 200,
				duration: 1600,
				y: (-innerHeight / 6) * ($isInvertTransition ? -1 : 1)
			}}
		>
			<h1 class="font-bold text-[3rem]">MAKE ME FORGET</h1>
		</div>
		<div
			class="absolute top-[50%] -translate-y-1/2 w-full text-center"
			in:fly={{
				delay: 1000,
				duration: 1000,
				y: (innerHeight / 6) * ($isInvertTransition ? -1 : 1)
			}}
			out:fly={{
				delay: 100,
				duration: 1000,
				y: (innerHeight / 6) * ($isInvertTransition ? -1 : 1)
			}}
		>
			<button
				class="pixel-btn"
				on:click={() => {
					$appState = AppState.SelectWhoToForget;
					$isInvertTransition = false;
				}}>Getting started</button
			>
		</div>
	{/if}

	<!-- Select who to forget -->
	{#if $appState === AppState.SelectWhoToForget}
		<div class="absolute top-[25%] -translate-y-1/2 text-center w-full">
			<h1
				class="text-[2rem]"
				in:typewriter={{ delay: 1800, speed: 1.5 }}
				out:fly={{
					delay: 100,
					duration: 1000,
					x: (-innerWidth / 2) * ($isInvertTransition ? -1 : 1)
				}}
			>
				Who do you want to forget?
			</h1>
		</div>
	{/if}
	{#if $appState === AppState.SelectWhoToForget || $appState === AppState.Confirmation}
		<div
			class="absolute top-[35%] -translate-y-1/2 text-center w-full"
			in:fly={{
				delay: 4500,
				duration: 1000,
				y: (innerHeight / 30) * ($isInvertTransition ? -1 : 1)
			}}
		>
			<RetroInput />
		</div>
	{/if}
	{#if $appState === AppState.SelectWhoToForget}
		<div
			class="absolute top-[50%] -translate-y-1/2 text-center w-full"
			in:fly={{ delay: 500, duration: 1000, x: (innerWidth / 2) * ($isInvertTransition ? -1 : 1) }}
			out:fly={{
				delay: 100,
				duration: 1000,
				x: (-innerWidth / 2) * ($isInvertTransition ? -1 : 1)
			}}
		>
			<button
				disabled={$whoToForget.trim().length < 3}
				class="pixel-btn"
				on:click={() => {
					$appState = AppState.Confirmation;
					$isInvertTransition = false;
				}}>Confirm</button
			>
		</div>
	{/if}

	<!-- Confirmation -->
	{#if $appState === AppState.Confirmation}
		<div class="absolute top-[25%] -translate-y-1/2 text-center w-full">
			<h1
				class="text-[2rem]"
				in:typewriter={{ delay: 1000, speed: 1.5 }}
				out:fly={{
					delay: 100,
					duration: 1000,
					x: (-innerWidth / 2) * ($isInvertTransition ? -1 : 1)
				}}
			>
				Are you sure that you want to
			</h1>
			<h1
				class="text-[2rem] text-red-500 font-bold"
				in:typewriter={{ delay: 3000, speed: 1.5 }}
				out:fly={{
					delay: 100,
					duration: 1000,
					x: (-innerWidth / 2) * ($isInvertTransition ? -1 : 1)
				}}
			>
				forget
			</h1>
			<h1
				class="text-[2rem]"
				in:typewriter={{ delay: 3500, speed: 1.5 }}
				out:fly={{
					delay: 100,
					duration: 1000,
					x: (-innerWidth / 2) * ($isInvertTransition ? -1 : 1)
				}}
			>
				this person?
			</h1>
		</div>
		<div
			class="absolute top-[50%] -translate-y-1/2 text-center w-full"
			in:fly={{ delay: 5000, duration: 1000, y: innerHeight / 30 }}
			out:fly={{
				delay: 100,
				duration: 1000,
				x: (-innerWidth / 2) * ($isInvertTransition ? -1 : 1)
			}}
		>
			<button
				class="pixel-btn"
				on:click={() => {
					$appState = AppState.SelectWhoToForget;
					$isInvertTransition = true;
				}}>Nah :&#40;</button
			>
			<button
				class="pixel-btn bg-red-500 text-slate-100 ml-2"
				on:click={() => {
					$appState = AppState.Forgetting;
					$isInvertTransition = false;
				}}>Sure</button
			>
		</div>
	{/if}

	<!-- Forgetting -->
	{#if $appState === AppState.Forgetting}<ForgettingScene />{/if}
</div>
