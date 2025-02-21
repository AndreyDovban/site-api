import { atom } from 'recoil';

/** Атом состояния - сохранённые ссылки */
export const linksListState = atom({
	key: 'linksListState',
	default: {
		links: [],
		count: 0,
	},
});
