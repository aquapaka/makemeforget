<script>
	import { whoToForget, appState, AppState } from '$lib/stores/mainStores';

	let isFocusing = false;
</script>

<div
	tabindex="0"
	on:focus={() => {
		if ($appState === AppState.SelectWhoToForget) {
			isFocusing = true;
		}
	}}
	on:blur={() => {
		isFocusing = false;
	}}
>
	<span class="text-[3rem]">{$whoToForget}</span>
	<span class="input-cursor {!isFocusing ? 'hidden' : ''}" />
</div>
