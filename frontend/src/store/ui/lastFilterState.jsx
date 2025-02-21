import { atom } from 'recoil';

/** Атом состояния - название поледнего изменяемый фильтр в колонке */
export const lastFilterState = atom({
	key: 'lastFilterState',
	default: '',
});
