<script>
	import { AppState, appState, whoToForget } from '$lib/stores/mainStores';
</script>

<div>
	<input
		class="bg-transparent text-center text-[3rem] outline-none {$appState ===
		AppState.SelectWhoToForget
			? 'focus:underline'
			: ''} underline-offset-[12px] decoration-4 decoration-dashed decoration-clone"
		type="text"
		name=""
		id=""
		bind:value={$whoToForget}
		placeholder="enter name"
		disabled={$appState !== AppState.SelectWhoToForget}
	/>
</div>
