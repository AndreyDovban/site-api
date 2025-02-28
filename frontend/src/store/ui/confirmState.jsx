import { atom } from 'recoil';

/** Атом состояния - объект подтверждения */
export const confirmState = atom({
	key: 'confirmState',
	default: { text: '', isOpen: false, func: null },
});
