import { atom } from 'recoil';

/** Атом состояния - список сохранённых клиентовв */
export const clientListState = atom({
	key: 'clientListState',
	default: {
		clients: [],
		count: 0,
	},
});
