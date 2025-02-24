import { atom } from 'recoil';

/** Атом состояния - сохранённые ссылки */
export const linksListState = atom({
	key: 'linksListState',
	default: {
		columns: [],
		data: [{}],
		count: 0,
	},
});
