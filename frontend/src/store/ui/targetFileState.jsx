import { atom } from 'recoil';

/** Атом состояния - объект изменяемый файл */
export const targetFileState = atom({
	key: 'targetFileState',
	default: { prodUid: '' },
});
