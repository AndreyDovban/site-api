import { atom } from 'recoil';

/** Атом состояния - номер текущей страницы */
export const numberPageState = atom({
	key: 'numberPageState',
	default: 0,
});
