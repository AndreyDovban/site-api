import { atom } from 'recoil';

/** Атом состояния - контент */
export const contentState = atom({
	key: 'contentState',
	default: 'check',
});
