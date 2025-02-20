import { atom } from 'recoil';

/** Атом состояния - порядок расположения колонок */
export const directionColumnsState = atom({
	key: 'directionColumnsState',
	default: {
		created_at: 0,
		valid: 1,
		client_mail: 2,
		client_name: 3,
		client_tel: 4,
		company: 5,
		count: 6,
		file_name: 7,
		product: 8,
		hash: 9,
	},
});
