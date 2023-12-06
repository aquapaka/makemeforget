<script>
	import { AppState, appState } from '../stores/mainStores';

	$: {
		console.log($appState);
	}
</script>

<div class="relative h-screen bg-slate-100">
	{#if $appState === AppState.WaitingForStart}
		<div class="absolute top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2">
			<h1 class="font-bold text-[3rem]">MAKE ME FORGET</h1>
		</div>
		<div class="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
			<button class="pixel-btn" on:click={() => ($appState = AppState.SelectWhoToForget)}
				>Getting started</button
			>
		</div>
	{/if}
</div>
