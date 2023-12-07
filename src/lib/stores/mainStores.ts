import { writable } from 'svelte/store';

export enum AppState {
	WaitingForStart,
	SelectWhoToForget,
	Confirmation,
	Forgetting
}

export const appState = writable<AppState>(AppState.WaitingForStart);

export const isInvertTransition = writable<boolean>(false);
export const whoToForget = writable<string>('');
