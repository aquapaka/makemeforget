<script lang="ts">
	import { AppState, appState, whoToForget } from '$lib/stores/mainStores';

	function initFocus(el: HTMLInputElement) {
		el.focus();
	}
</script>

<div>
	<input
		class="bg-transparent text-center text-[2rem] md:text-[3rem] text-black disabled:text-black outline-none {$appState ===
		AppState.SelectWhoToForget
			? 'focus:underline'
			: ''} underline-offset-[12px] decoration-4 decoration-dashed decoration-clone w-full"
		type="text"
		name=""
		id=""
		bind:value={$whoToForget}
		placeholder="enter name"
		disabled={$appState !== AppState.SelectWhoToForget}
		use:initFocus
	/>
</div>
