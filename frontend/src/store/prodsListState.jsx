import { atom } from 'recoil';

/** Атом состояния - масиив продуктов */
export const prodsListState = atom({
	key: 'prodsListState',
	default: [],
});
