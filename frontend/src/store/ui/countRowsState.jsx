import { atom } from 'recoil';

/** Атом состояния - коллтчество строк в ответе запроса к базе */
export const countRowsState = atom({
	key: 'countRowsState',
	default: 30,
});
