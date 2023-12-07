import { Sound } from 'svelte-sound';

import error from './assets/error_tonal_buzz1_3.mp3';
import click from './assets/userinterface-click.mp3';
import flower from './assets/in love with a ghost   flowers feat. nori.mp3';

export const clickSound = new Sound(click, { volume: 0.3 });
export const errorSound = new Sound(error, { volume: 0.3 });
export const flowerMusic = new Sound(flower, { volume: 0.3 });
