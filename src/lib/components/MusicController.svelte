<script>
	import { run } from 'svelte/legacy';

	import sound0 from '$lib/assets/images/speaker_0.png';
	import sound1 from '$lib/assets/images/speaker_1.png';
	import sound2 from '$lib/assets/images/speaker_2.png';
	import { AppState, appState } from '$lib/stores/mainStores';
	import { cubicInOut } from 'svelte/easing';
	import { fly, slide } from 'svelte/transition';

	let isShowVolumeControl = $state(false);
	let mainVolume = $state(0.5);
	let speakerIcon = $state(sound2);

	run(() => {
		Howler.volume(mainVolume);

		if (mainVolume >= 0.5) {
			speakerIcon = sound2;
		} else if (mainVolume > 0) {
			speakerIcon = sound1;
		} else {
			speakerIcon = sound0;
		}
	});
</script>

{#if $appState !== AppState.WaitingForStart && $appState !== AppState.Loading}
	<div
		in:fly={{
			delay: 2000,
			duration: 500,
			y: '50px'
		}}
		class="absolute bottom-4 right-4 p-2 flex items-center"
	>
		<button
			class="p-2 animate-pulse duration-300"
			onclick={() => {
				isShowVolumeControl = !isShowVolumeControl;
			}}
			onblur={(e) => {
				if (
					e.relatedTarget &&
					e.relatedTarget instanceof HTMLInputElement &&
					e.relatedTarget.classList.contains('slider')
				) {
					return;
				}

				isShowVolumeControl = false;
			}}
		>
			<img class="pixel-art min-w-[33px]" src={speakerIcon} alt="speaker0" />
		</button>
		{#if isShowVolumeControl}
			<input
				class="slider"
				transition:slide={{
					duration: 300,
					easing: cubicInOut,
					axis: 'x'
				}}
				bind:value={mainVolume}
				min="0"
				max="1"
				step="0.1"
				type="range"
				name="musicVolume"
				id="musicVolumeSlider"
				onblur={(e) => {
					if (e.relatedTarget && e.relatedTarget instanceof HTMLButtonElement) {
						return;
					}
					isShowVolumeControl = false;
				}}
			/>
		{/if}
	</div>
{/if}

<style>
	.slider {
		-webkit-appearance: none;
		width: 100%;
		height: 3px;
		background: gray;
		outline: none;
		opacity: 0.8;
		-webkit-transition: 0.2s;
		transition: opacity 0.2s;
	}

	.slider:hover {
		opacity: 1;
	}
	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 21px;
		height: 21px;
		background: black;
		cursor: pointer;
	}

	.slider::-moz-range-thumb {
		width: 21px;
		height: 21x;
		background: black;
		cursor: pointer;
	}
</style>
