import { Howl } from 'howler';
import errorSrc from '../assets/audios/error_tonal_buzz1_3.mp3';
import clickSrc from '../assets/audios/userinterface-click.mp3';
import flowerSrc from '../assets/audios/in love with a ghost   flowers feat. nori.mp3';

export const clickSound = new Howl({ src: clickSrc, volume: 0.3 });
export const errorSound = new Howl({ src: errorSrc, volume: 0.3 });

export const flowerMusic = new Howl({ src: flowerSrc, volume: 0.5, loop: true });
