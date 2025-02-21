import { atom } from 'recoil';

/** Атом состояния - название колонки по которой идёт сортировка */
export const sortNameState = atom({
	key: 'sortNameState',
	default: 'created_at',
});
