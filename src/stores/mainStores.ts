import { writable } from 'svelte/store';

export enum AppState {
	WaitingForStart,
	SelectWhoToForget
}

export const appState = writable<AppState>(AppState.WaitingForStart);
