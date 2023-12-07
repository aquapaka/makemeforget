import { Sound } from 'svelte-sound';

import click from './assets/userinterface-click.mp3';
import error from './assets/error_tonal_buzz1_3.mp3';

export const clickSound = new Sound(click, { volume: 0.3 });
export const errorSound = new Sound(error, { volume: 0.3 });
