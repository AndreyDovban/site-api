import { atom } from 'recoil';

/** Атом состояния - направление сортировки */
export const sortDirectionState = atom({
	key: 'sortDirectionState',
	default: 'DESC',
});
