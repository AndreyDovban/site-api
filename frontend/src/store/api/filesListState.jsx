import { atom } from 'recoil';

/** Атом состояния - масиив файлов */
export const filesListState = atom({
	key: 'filesListState',
	default: {
		columns: [],
		data: [{}],
		count: 0,
	},
});
