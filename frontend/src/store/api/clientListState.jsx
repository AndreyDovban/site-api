import { atom } from 'recoil';

/** Атом состояния - список сохранённых клиентовв */
export const clientListState = atom({
	key: 'clientListState',
	default: {
		columns: [],
		data: [{}],
		count: 0,
	},
});
