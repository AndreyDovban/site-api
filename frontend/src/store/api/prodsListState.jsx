import { atom } from 'recoil';

/** Атом состояния - масиив продуктов */
export const prodsListState = atom({
	key: 'prodsListState',
	default: {
		columns: [],
		data: [{}],
		count: 0,
	},
});
