import { atom } from 'recoil';

/** Атом состояния - обект с данными ответа запроса к базе */
export const dataState = atom({
	key: 'dataState',
	default: [[]],
});
