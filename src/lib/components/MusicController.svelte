<script>
	import sound0 from '$lib/assets/images/speaker_0.png';
	import sound2 from '$lib/assets/images/speaker_2.png';
	import { AppState, appState } from '$lib/stores/mainStores';
	import { fly } from 'svelte/transition';

	let isShowVolumeControl = false;
</script>

{#if $appState !== AppState.WaitingForStart}
	<div
		in:fly={{
			delay: 2000,
			duration: 500,
			y: '50px'
		}}
		class="absolute bottom-4 right-4 p-2"
	>
		<button class="p-2 animate-pulse">
			<img class="pixel-art w-[33px]" src={sound2} alt="speaker0" />
		</button>
		<input
			hidden={!isShowVolumeControl}
			on:change={(e) => {
				// @ts-ignore
				const newVolume = e.target.value;
			}}
			min="0"
			max="1"
			step="0.1"
			type="range"
			name="musicVolume"
			id="musicVolumeSlider"
		/>
	</div>
{/if}
