import { atom } from 'recoil';

/** Атом состояния - объект изменяемый продукт */
export const targetProdState = atom({
	key: 'targetProdState',
	default: {},
});
