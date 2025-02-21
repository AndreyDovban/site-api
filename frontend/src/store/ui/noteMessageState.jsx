import { atom } from 'recoil';

/** Атом состояния - текст уведомления */
export const noteMessageState = atom({
	key: 'noteMessageState',
	default: '',
});
