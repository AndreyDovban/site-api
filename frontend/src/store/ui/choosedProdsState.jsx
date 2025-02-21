import { atom } from 'recoil';

/** Атом состояния - выбранные продукты */
export const choosedProdsState = atom({
	key: 'choosedProdsState',
	default: [],
});
