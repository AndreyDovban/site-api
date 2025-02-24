import { atom } from 'recoil';

/** Атом состояния - объект уведомление */
export const noteState = atom({
	key: 'noteState',
	default: { text: '', isOpen: false, isSuccessful: undefined },
});
