import { writable } from 'svelte/store';

export enum AppState {
	Loading,
	WaitingForStart,
	SelectWhoToForget,
	Confirmation,
	Forgetting
}

export const appState = writable<AppState>(AppState.Loading);

export const isInvertTransition = writable<boolean>(false);
export const whoToForget = writable<string>('');
