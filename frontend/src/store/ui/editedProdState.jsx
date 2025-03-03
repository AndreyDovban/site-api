import { atom } from 'recoil';

/** Атом состояния - объект изменяемый продукт */
export const editedProdState = atom({
	key: 'editedProdState',
	default: {},
});
