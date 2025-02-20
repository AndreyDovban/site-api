import { atom } from 'recoil';

/** Атом состояния - обект с фильтрами */
export const filtersState = atom({
	key: 'filtersState',
	default: {},
});
