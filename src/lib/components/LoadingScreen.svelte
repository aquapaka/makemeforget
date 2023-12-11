<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div class="loading-screen">
	<div
		class="cascade"
		in:fade={{ delay: 1000, duration: 1000 }}
		out:fade={{ delay: 500, duration: 1000 }}
	>
		<div />
		<div />
		<div />
		<div />
		<div />
	</div>
</div>

<style>
	@-webkit-keyframes cascade {
		0% {
			opacity: 0;
			-webkit-transform: translateY(-250%);
			transform: translateY(-250%);
		}
		30%,
		60% {
			opacity: 1;
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
		100% {
			opacity: 0;
			-webkit-transform: translateY(250%);
			transform: translateY(250%);
		}
	}
	@keyframes cascade {
		0% {
			opacity: 0;
			-webkit-transform: translateY(-250%);
			transform: translateY(-250%);
		}
		30%,
		60% {
			opacity: 1;
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
		100% {
			opacity: 0;
			-webkit-transform: translateY(250%);
			transform: translateY(250%);
		}
	}

	.loading-screen {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: 10;
		/* background: #08a8f3; */
	}

	.cascade {
		height: 20px;
		position: relative;
		display: grid;
		grid-template-columns: repeat(5, 20px);
		grid-gap: 5px;
	}
	.cascade div {
		background: black;
	}
	.cascade div:nth-child(1) {
		-webkit-animation: cascade 1.5s 0.15s ease infinite backwards;
		animation: cascade 1.5s 0.15s ease infinite backwards;
	}
	.cascade div:nth-child(2) {
		-webkit-animation: cascade 1.5s 0.3s ease infinite backwards;
		animation: cascade 1.5s 0.3s ease infinite backwards;
	}
	.cascade div:nth-child(3) {
		-webkit-animation: cascade 1.5s 0.45s ease infinite backwards;
		animation: cascade 1.5s 0.45s ease infinite backwards;
	}
	.cascade div:nth-child(4) {
		-webkit-animation: cascade 1.5s 0.6s ease infinite backwards;
		animation: cascade 1.5s 0.6s ease infinite backwards;
	}
	.cascade div:nth-child(5) {
		-webkit-animation: cascade 1.5s 0.75s ease infinite backwards;
		animation: cascade 1.5s 0.75s ease infinite backwards;
	}
</style>
